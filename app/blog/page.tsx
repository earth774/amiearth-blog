import { getBlogPosts, getYears } from "@/app/lib/blog-posts";
import { BlogPageClient } from "./BlogPageClient";

export default function BlogPage() {
  const years = getYears();
  const allPosts = getBlogPosts();

  return <BlogPageClient years={years} initialPosts={allPosts} />;
}
