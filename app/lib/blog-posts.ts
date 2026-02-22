import type { BlogPost } from "@/app/types";

const blogPosts: BlogPost[] = [
  {
    slug: "profiling-go-service-50k-rps",
    title: "Profiling a Go service that handles 50k requests per second",
    excerpt:
      "A walk through the tooling, the surprising bottlenecks, and what we changed.",
    date: "Dec 14, 2025",
    readTime: "8 min read",
    tags: ["Go", "Performance"],
    year: 2025,
  },
  {
    slug: "type-safe-api-clients-without-codegen",
    title: "Type-safe API clients without code generation",
    excerpt:
      "Using TypeScript's type system to build airtight contracts between frontend and backend.",
    date: "Nov 3, 2025",
    readTime: "6 min read",
    tags: ["TypeScript"],
    year: 2025,
  },
  {
    slug: "readable-code-naming-things",
    title: "On readable code: naming things as an act of care",
    excerpt:
      "Variable names are the first thing a reader encounters. Make them worth finding.",
    date: "Oct 15, 2025",
    readTime: "5 min read",
    tags: ["Code Quality"],
    year: 2025,
  },
  {
    slug: "slow-queries-i-have-known",
    title: "Slow queries I have known and loved (and eventually fixed)",
    excerpt:
      "A tour through EXPLAIN ANALYZE and the joy of watching a 4s query become 12ms.",
    date: "Sep 22, 2025",
    readTime: "10 min read",
    tags: ["SQL", "Performance"],
    year: 2025,
  },
];

export function getBlogPosts(year?: number): BlogPost[] {
  if (year === undefined) {
    return blogPosts;
  }
  return blogPosts.filter((post) => post.year === year);
}

export function getYears(): number[] {
  const fromPosts = [...new Set(blogPosts.map((post) => post.year))];
  const currentYear = new Date().getFullYear();
  const designYears = [currentYear, currentYear - 1, currentYear - 2];
  const combined = [...new Set([...fromPosts, ...designYears])];
  return combined.sort((a, b) => b - a);
}
