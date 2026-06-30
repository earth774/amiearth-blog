---
title: "Kafka consumer lag: a checklist that actually helps"
excerpt: "When lag climbs, the answer is rarely 'add more partitions.' Here is the order we debug in."
date: "Mar 9, 2026"
readTime: "9 min read"
tags: ["Go", "Backend"]
year: 2026
---

Consumer lag is a mood. When the graph is flat near zero, life is calm. When it climbs and stays there, someone pings you in Slack with a screenshot and the word "investigate."

The instinct is to scale consumers. Sometimes that works. Often it does not — because lag is a symptom, not a diagnosis.

## Step 1: Is the consumer alive?

Obvious, but worth confirming. Restarts, OOM kills, and stuck rebalance loops all show up as lag before they show up in logs. Check pod restarts, consumer group state, and whether partitions are actually assigned.

```bash
kafka-consumer-groups.sh \
  --bootstrap-server $BROKERS \
  --group payment-events \
  --describe
```

Look at `CURRENT-OFFSET` vs `LOG-END-OFFSET` per partition. If one partition is far ahead of the others, you have a hot key — not a capacity problem.

## Step 2: Measure handler time, not just throughput

We log p50 and p99 handler duration per message type. A handler that averaged 40ms last week and now averages 400ms will create lag even with the same message volume. Database contention, a new N+1 query, or an external API slowdown all land here first.

## Step 3: Commit strategy

We use at-least-once delivery with idempotent handlers. Committing after every message is safe but slow. Committing in batches is faster but increases duplicate work on crash. There is no free lunch — only a trade-off you should choose deliberately.

## Step 4: Then scale

If handlers are healthy, partitions are balanced, and lag still grows, add consumers — up to one per partition. Beyond that, you need more partitions and a rebalancing plan, which is a migration, not a knob turn.

Lag graphs are good at telling you something is wrong. This checklist helps you find out what.
