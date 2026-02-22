import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/app/types";

const CONTENT_DIR = join(process.cwd(), "content", "blog");

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function loadPostBySlug(slug: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const fullPath = join(CONTENT_DIR, `${slug}.md`);
    const fileContents = readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch {
    return null;
  }
}

function loadAllPosts(): Array<{ slug: string; data: Record<string, unknown>; content: string }> {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts: Array<{ slug: string; data: Record<string, unknown>; content: string }> = [];

  for (const file of files) {
    const slug = getSlugFromFilename(file);
    const loaded = loadPostBySlug(slug);
    if (loaded) {
      posts.push({ slug, ...loaded });
    }
  }

  return posts.sort((a, b) => {
    const dateA = (a.data.date as string) ?? "";
    const dateB = (b.data.date as string) ?? "";
    return dateB.localeCompare(dateA);
  });
}

function toBlogPost(
  slug: string,
  data: Record<string, unknown>
): BlogPost {
  return {
    slug,
    title: (data.title as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    date: (data.date as string) ?? "",
    readTime: (data.readTime as string) ?? "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    year: typeof data.year === "number" ? data.year : new Date().getFullYear(),
  };
}

export function getBlogPosts(year?: number): BlogPost[] {
  const posts = loadAllPosts().map((p) => toBlogPost(p.slug, p.data));
  if (year === undefined) {
    return posts;
  }
  return posts.filter((post) => post.year === year);
}

export function getYears(): number[] {
  const posts = getBlogPosts();
  const fromPosts = [...new Set(posts.map((post) => post.year))];
  const currentYear = new Date().getFullYear();
  const designYears = [currentYear, currentYear - 1, currentYear - 2];
  const combined = [...new Set([...fromPosts, ...designYears])];
  return combined.sort((a, b) => b - a);
}

export function getBlogPostBySlug(slug: string): (BlogPost & { content: string }) | null {
  const loaded = loadPostBySlug(slug);
  if (!loaded) return null;
  const post = toBlogPost(slug, loaded.data);
  return { ...post, content: loaded.content };
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const all = loadAllPosts().map((p) => toBlogPost(p.slug, p.data));
  const index = all.findIndex((p) => p.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] ?? null : null,
    next: index < all.length - 1 ? all[index + 1] ?? null : null,
  };
}

export function getAllSlugs(): string[] {
  return loadAllPosts().map((p) => p.slug);
}
