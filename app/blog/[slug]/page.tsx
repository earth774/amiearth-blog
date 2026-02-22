import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { MarkdownBody } from "@/app/components/MarkdownBody";
import {
  getBlogPostBySlug,
  getAdjacentPosts,
  getAllSlugs,
} from "@/app/lib/blog-posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Earth`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Nav />

      <main className="flex flex-1 flex-col py-14 sm:py-16">
        <article className="mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 flex items-center gap-1.5 font-[family-name:var(--font-literata)] text-[13px] text-[#A09A94] transition-colors hover:text-[#6B6560]"
          >
            <span>←</span>
            <span>All Posts</span>
          </Link>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-tight text-[#1A1714] sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-5 font-[family-name:var(--font-literata)] text-[13px] text-[#A09A94]">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#E8F0E1] px-2.5 py-1 font-[family-name:var(--font-jetbrains)] text-[11px] text-[#2D5016]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mt-4 h-px w-full bg-[#E2DDD7]" />

          {/* Body spacer */}
          <div className="h-8" />

          {/* Content */}
          <MarkdownBody content={post.content} />

          {/* Bottom divider */}
          <div className="mt-8 h-px w-full bg-[#E2DDD7]" />

          {/* Post nav */}
          <nav
            className="flex flex-col gap-6 py-8 sm:flex-row sm:justify-between sm:py-12"
            aria-label="Post navigation"
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex max-w-[280px] flex-col gap-1"
              >
                <span className="font-[family-name:var(--font-literata)] text-[12px] text-[#A09A94] group-hover:text-[#6B6560]">
                  ← Previous
                </span>
                <span className="font-[family-name:var(--font-literata)] text-[14px] text-[#1A1714] transition-colors group-hover:text-[#2D5016]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex max-w-[280px] flex-col gap-1 sm:items-end sm:text-right"
              >
                <span className="font-[family-name:var(--font-literata)] text-[12px] text-[#A09A94] group-hover:text-[#6B6560]">
                  Next →
                </span>
                <span className="font-[family-name:var(--font-literata)] text-[14px] text-[#1A1714] transition-colors group-hover:text-[#2D5016]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  );
}
