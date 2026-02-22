"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { PostCard } from "@/app/components/PostCard";
import { getBlogPosts, getYears } from "@/app/lib/blog-posts";

const years = getYears();
const allPosts = getBlogPosts();

export default function BlogPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = selectedYear ? getBlogPosts(selectedYear) : allPosts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [selectedYear, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Nav />

      <main className="flex flex-1 flex-col py-16">
        <div className="mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-12">
          {/* Blog Header */}
          <header className="mb-8 flex flex-col gap-2">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1714] sm:text-4xl md:text-[42px]">
              Writing
            </h1>
            <p className="font-[family-name:var(--font-literata)] text-base text-[#6B6560] sm:text-[16px]">
              Occasional thoughts on software, systems, and the quiet craft of
              building things.
            </p>
          </header>

          {/* Filter Row */}
          <div className="flex flex-col gap-4 py-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-7 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedYear(null)}
                className="flex flex-col items-center gap-0.5 shrink-0"
              >
                <span
                  className={`font-[family-name:var(--font-literata)] text-sm font-semibold ${
                    selectedYear === null ? "text-[#1A1714]" : "text-[#A09A94]"
                  }`}
                >
                  All
                </span>
                {selectedYear === null && (
                  <span className="h-px w-5 bg-[#2D5016]" />
                )}
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className="flex flex-col items-center gap-0.5 shrink-0"
                >
                  <span
                    className={`font-[family-name:var(--font-literata)] text-sm transition-colors ${
                      selectedYear === year ? "font-semibold text-[#1A1714]" : "text-[#A09A94] hover:text-[#1A1714]"
                    }`}
                  >
                    {year}
                  </span>
                  {selectedYear === year && (
                    <span className="h-px w-5 bg-[#2D5016]" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 border-b border-[#E2DDD7] py-1.5">
              <Search
                size={15}
                className="shrink-0 text-[#A09A94]"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-w-0 bg-transparent font-[family-name:var(--font-literata)] text-sm text-[#1A1714] placeholder:text-[#A09A94] focus:outline-none"
                aria-label="Search posts"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#E2DDD7]" />

          {/* Post List */}
          <div className="flex flex-col">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={index + 1}
                />
              ))
            ) : (
              <p className="py-12 font-[family-name:var(--font-literata)] text-[15px] text-[#6B6560]">
                No posts found.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
