import Link from "next/link";
import type { BlogPost } from "@/app/types";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const indexStr = String(index).padStart(2, "0");

  return (
    <article
      className="flex flex-col gap-2 border-b border-[#E2DDD7] py-7"
      data-testid="post-card"
    >
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#A09A94]">
          {indexStr}
        </span>
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
        <span className="font-[family-name:var(--font-literata)] text-[12px] text-[#A09A94]">
          {post.date}
        </span>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1714] transition-colors hover:text-[#2D5016] sm:text-[24px]"
      >
        {post.title}
      </Link>
      <p className="font-[family-name:var(--font-literata)] text-[15px] leading-[1.6] text-[#6B6560]">
        {post.excerpt}
      </p>
      <span className="font-[family-name:var(--font-literata)] text-[12px] text-[#A09A94]">
        {post.readTime}
      </span>
    </article>
  );
}
