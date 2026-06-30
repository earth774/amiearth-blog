---
title: "Structured logging that helps at 3am"
excerpt: "Free-text logs are fine until you need to find one request among ten million. A field guide to logs you can query."
date: "Jun 24, 2026"
readTime: "6 min read"
tags: ["Go", "Observability"]
year: 2026
---

At 3am, nobody wants to grep through `"payment failed for user"`. They want to filter by `request_id`, see the trace, and know whether the failure was ours or the bank's.

Structured logging is not about JSON for its own sake. It's about making questions cheap.

```go
slog.Info("payment routed",
    slog.String("request_id", reqID),
    slog.String("merchant_id", merchantID),
    slog.String("route", selectedRoute),
    slog.Int("latency_ms", elapsed),
)
```

Compare that to `log.Printf("payment routed %s %s %dms", ...)`. The second version is readable in a terminal. The first is readable in Grafana, Loki, or CloudWatch — without regex archaeology.

## Fields we always include

- `request_id` propagated from the edge
- `service` and `environment` (staging mistakes happen)
- `duration_ms` on anything that touches the network or database
- `error` as a separate field, not embedded in a sentence

## Fields we stopped including

- Full request bodies (PII and noise)
- Stack traces on expected errors (alert fatigue)
- Timestamps in the message string (the logger already has one)

## Log levels with discipline

`Info` is for things you'd want in a weekly review: deploys, config changes, successful payments above a threshold. `Warn` is for recoverable oddities. `Error` means someone should look — not every failed validation, only things that indicate a bug or dependency failure.

The goal is not more logs. It's fewer logs that answer sharper questions. When the pager goes off, you should be one query away from the answer — not one grep away from giving up and reading the code again.
