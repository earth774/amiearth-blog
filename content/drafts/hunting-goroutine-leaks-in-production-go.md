---
title: "Hunting goroutine leaks without guessing"
excerpt: "Go 1.26 added a profile that tells you which goroutines are stuck forever, instead of which ones are merely stuck right now."
date: "Aug 4, 2026"
readTime: "7 min read"
tags: ["Go", "Performance"]
year: 2026
---

The graph was a staircase. Every deploy reset resident memory to a comfortable 180MB, and over the following days it climbed — never a spike, never a cliff, just a patient upward walk until the pod hit its limit and got recycled. The CPU profile was clean. The heap profile pointed at a dozen allocation sites that all looked reasonable. Restarting fixed it, which is the most demoralising kind of fix there is.

Goroutine count told the real story. It went up and never came back down.

## The profile we had told us the wrong thing

The `/debug/pprof/goroutine` endpoint has been around forever, and it does exactly what it promises: it dumps every live goroutine and where it's blocked. We pulled it during a busy afternoon and got a few thousand stacks, most of them parked on channel receives.

```bash
$ curl -s 'localhost:6060/debug/pprof/goroutine?debug=1' | head -1
goroutine profile: total 4193
```

Four thousand goroutines. Some number of those were healthy workers waiting for their next job. Some number of them were never going to wake up again. The profile does not distinguish between the two, because "blocked on a channel" is the normal state of a working Go program. We spent an afternoon reading stacks and arguing about which ones looked suspicious. That is guessing with extra steps.

## What Go 1.26 changed

Go 1.26 shipped an experimental profile called `goroutineleak`, and it answers the question we actually had. Its definition of a leak is narrow and precise: a goroutine blocked on a concurrency primitive — a channel, a `sync.Mutex`, a `sync.Cond` — where that primitive is unreachable from any runnable goroutine, or from any goroutine those could go on to unblock. If nothing that can still run is able to touch the channel you're parked on, nobody is ever going to send on it. You're not waiting. You're stranded.

The runtime works this out by piggybacking on the garbage collector, which already walks the reachability graph. That makes the result trustworthy in a way heuristics aren't: everything it reports is genuinely stuck. It also means there's no cost until you ask — the detection pass only runs when you pull the profile.

It's behind a build flag for now:

```bash
$ GOEXPERIMENT=goroutineleakprofile go build -o api ./cmd/api
$ go tool pprof 'http://localhost:6060/debug/pprof/goroutineleak'
```

If you already import `net/http/pprof`, the endpoint registers itself. There was no code to write.

## The bug was a fan-out we'd written a hundred times

The offending function collected results from a batch of parallel workers, and bailed out on the first error.

```go
func processWorkItems(ws []workItem) ([]workResult, error) {
	ch := make(chan result)
	for _, w := range ws {
		go func() {
			ch <- process(w) // blocks forever if nobody is reading
		}()
	}

	var results []workResult
	for range len(ws) {
		r := <-ch
		if r.err != nil {
			return nil, r.err // every remaining sender is now stranded
		}
		results = append(results, r.res)
	}
	return results, nil
}
```

The channel is unbuffered, so every send needs a matching receive. On the happy path there are exactly as many receives as sends and everything drains. On the error path we return early, the receiver disappears, and every worker still holding a result blocks on a send that will never be matched. One failed batch of fifty items leaks up to forty-nine goroutines, each pinning its own stack and whatever the result was holding onto.

It had been in production for months. It only mattered because error rates on that path had crept up.

The fix is a single character of foresight — give the channel enough room that senders never need a receiver:

```go
ch := make(chan result, len(ws))
```

Now the early return abandons the channel, the workers finish their sends regardless, and the whole thing becomes garbage together. Where the work is genuinely cancellable, plumb a `context` through and `select` on `ctx.Done()` instead, so the workers stop doing the work rather than just being allowed to finish it.

## Where it doesn't help

The detection is built on reachability, so anything still reachable looks alive by definition. A channel hanging off a package-level variable, or one held in the locals of a goroutine that's still runnable, will not be reported no matter how permanently wedged it is. Globals hide leaks. That's a reason to avoid them that I hadn't thought of before.

It's also still an experiment — the implementation is described as production-ready, and the flag exists to collect feedback on the API rather than the machinery, with the profile expected to be on by default in Go 1.27. We run it in staging and pull it by hand. That's been enough.

## What we took away

The old profile told us the truth and it still wasn't useful, because the truth it told — *here is where every goroutine is parked* — wasn't the question. The new one narrows the question until the answer is actionable: *here is who is never coming back*. Most of the debugging tools I reach for work like that. They don't make the program faster or more correct. They make the shape of the problem small enough to hold in your head.

The staircase graph is flat now. It's been flat for three weeks, which is the longest that service has gone without needing a nudge.
