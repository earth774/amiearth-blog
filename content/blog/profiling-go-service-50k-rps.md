---
title: "Profiling a Go service that handles 50k requests per second"
excerpt: "A walk through the tooling, the surprising bottlenecks, and what we changed."
date: "Dec 14, 2025"
readTime: "8 min read"
tags: ["Go", "Performance"]
year: 2025
---

When our API started showing p99 latencies north of 800ms under sustained load, we knew something was wrong. The service was a relatively simple Go HTTP server—a few middleware layers, a PostgreSQL database, some Redis caching. It shouldn't be struggling. This post is the story of how we found the culprit, fixed it, and what we learned along the way.

The first step was establishing a baseline. We use pprof in all our Go services — it's cheap to run continuously and invaluable when you need it. A quick curl to the /debug/pprof/profile endpoint gave us a 30-second CPU profile.

```bash
$ go tool pprof -http=:8080 \
    http://localhost:6060/debug/pprof/profile
# Opens flame graph in browser
```

The flame graph told us immediately: 34% of CPU time was spent inside encoding/json.Marshal. We were serialising the same configuration object on every single request — an object that hadn't changed since the service started.

## The fix was embarrassingly simple

We pre-serialised the config at startup and cached the bytes. Response times dropped immediately. p99 fell from 800ms to under 60ms. Sometimes the fix really is that obvious — you just have to look.
