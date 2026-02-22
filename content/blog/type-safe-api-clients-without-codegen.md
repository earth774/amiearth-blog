---
title: "Type-safe API clients without code generation"
excerpt: "Using TypeScript's type system to build airtight contracts between frontend and backend."
date: "Nov 3, 2025"
readTime: "6 min read"
tags: ["TypeScript"]
year: 2025
---

Type safety between frontend and backend has traditionally meant either hand-rolling types on both sides or relying on code generation from OpenAPI specs. There's a third way: using TypeScript's type system to derive everything from a single source of truth.

The key insight is that your API response types can be inferred from your fetch calls, and your request bodies can be validated at compile time. No codegen, no runtime schema validation libraries—just types.

```typescript
type ApiResponse<T> = { data: T } | { error: string };

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

By defining the return type explicitly, you get autocomplete, refactoring safety, and compile-time errors when the backend changes. The frontend and backend teams can share a single type definition file, and TypeScript does the rest.

## When to reach for this approach

This works best when your API surface is moderate in size and you control both ends. For large, rapidly changing APIs, codegen might still be the better choice. But for internal tools and product APIs, type-only contracts are often enough.
