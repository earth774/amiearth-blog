---
title: "Graceful shutdown in Go: why your service keeps dropping requests"
excerpt: "SIGTERM is not a suggestion. A short checklist for draining connections before the orchestrator gives up."
date: "Jan 18, 2026"
readTime: "7 min read"
tags: ["Go", "Systems"]
year: 2026
---

Deploys should be boring. You push a new image, Kubernetes rolls the pod, traffic moves to the next replica, and nobody notices. Except when they do — because the old pod exited mid-request and the client saw a 502.

The problem is rarely the load balancer. It's usually us: we handle `SIGTERM`, call `os.Exit(0)`, and hope for the best. Hope is not a shutdown strategy.

```go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: routes()}

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Printf("shutdown: %v", err)
    }
}
```

`Shutdown` stops accepting new connections and waits for in-flight requests to finish — up to the timeout. That last part matters. If your handler can run for two minutes, thirty seconds is not enough.

## What we actually check before shipping

First, health checks should fail as soon as shutdown starts. We flip a flag, return 503 from `/health`, and let the load balancer stop sending traffic. Only then do we call `Shutdown`.

Second, background work needs the same treatment. Kafka consumers, cron loops, and goroutine pools should receive the same context cancellation. We wait on a `sync.WaitGroup` after the HTTP server drains.

Third, we test it. A deploy in staging with artificial slow requests beats discovering the gap in production at peak hour.

Graceful shutdown is not ceremony. It's the difference between a deploy nobody notices and one that shows up in your error budget.
