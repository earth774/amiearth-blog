---
title: "Slow queries I have known and loved (and eventually fixed)"
excerpt: "A tour through EXPLAIN ANALYZE and the joy of watching a 4s query become 12ms."
date: "Sep 22, 2025"
readTime: "10 min read"
tags: ["SQL", "Performance"]
year: 2025
---

Every database has them: queries that worked fine in development, acceptable in staging, and then one day in production they cross a threshold and everything slows to a crawl. This is the story of one such query and how we fixed it.

The query joined four tables, filtered on a date range, and aggregated. Simple enough. In production, with real data volumes, it took four seconds. Users noticed.

```sql
EXPLAIN ANALYZE
SELECT o.id, o.total, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.created_at > '2025-01-01'
GROUP BY o.id, o.total, c.name;
```

The plan showed a sequential scan on orders. We added an index on `(created_at, customer_id)`. The planner switched to an index scan. Execution time: 12ms.

## What we learned

Indexes matter. So does measuring. We could have guessed—and we would have been wrong about which index to add. EXPLAIN ANALYZE gave us the answer. The fix was a one-line migration and a deploy. Sometimes the slow queries we have known become the fast ones we love.
