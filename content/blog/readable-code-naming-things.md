---
title: "On readable code: naming things as an act of care"
excerpt: "Variable names are the first thing a reader encounters. Make them worth finding."
date: "Oct 15, 2025"
readTime: "5 min read"
tags: ["Code Quality"]
year: 2025
---

Variable names are the first thing a reader encounters. They set the tone for understanding. A well-named variable explains itself; a poorly named one forces the reader to trace through logic, holding mental state, hoping they don't lose the thread.

Consider the difference between `d` and `daysSinceLastPayment`. One requires context. The other carries it. The extra keystrokes pay dividends every time someone—including future you—reads the code.

```typescript
// Before: What is this?
const d = (Date.now() - lastPay) / 86400000;

// After: Immediately clear
const daysSinceLastPayment = (Date.now() - lastPaymentDate) / MS_PER_DAY;
```

Naming is not vanity. It's an act of care for the next person who will read this code. Choose names that reveal intent, not obscure it.

## The two hardest problems

There's an old joke: the two hardest problems in computer science are cache invalidation and naming things. We can't solve the first in a blog post. For the second: take your time. Rename as you go. Your readers will thank you.
