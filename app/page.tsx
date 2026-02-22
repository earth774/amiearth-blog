import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";

const techStack = [
  "TypeScript",
  "Go",
  "React",
  "PostgreSQL",
  "Docker",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Nav />

      {/* Hero */}
      <main className="flex flex-1 items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="flex w-full max-w-[680px] flex-col items-center px-4 sm:px-6">
          {/* Photo */}
          <div className="flex h-22 w-22 items-center justify-center overflow-hidden rounded-full border-2 border-[#E2DDD7] bg-[#EDEAE3]">
            <Image
              src="/images/avatar.jpg"
              alt="Earth"
              width={84}
              height={84}
              className="h-[84px] w-[84px] rounded-full object-cover"
            />
          </div>
          <div className="h-7 w-px" />

          {/* Name */}
          <h1 className="text-center font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1714] sm:text-5xl md:text-[56px]">
            Earth
          </h1>

          {/* Subtitle */}
          <p className="mt-1 text-center font-[family-name:var(--font-literata)] text-[15px] text-[#A09A94]">
            Software Developer · Chiang Rai, Thailand
          </p>
          <div className="h-5 w-px" />

          {/* Bio */}
          <p className="max-w-[575px] text-center font-[family-name:var(--font-literata)] text-base leading-[1.8] text-[#6B6560] sm:text-[17px]">
            I build thoughtful software and write about the craft of
            programming. Currently exploring distributed systems and frontend
            performance.
          </p>
          <div className="h-7 w-px" />

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-[#E8F0E1] px-3 py-1.5 font-[family-name:var(--font-jetbrains)] text-xs text-[#2D5016]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="h-8 w-px" />

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="rounded bg-[#2D5016] px-6 py-2.5 font-[family-name:var(--font-literata)] text-sm font-semibold text-white transition-colors hover:bg-[#234012]"
            >
              Read Blog
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-[#E2DDD7] px-6 py-2.5 font-[family-name:var(--font-literata)] text-sm text-[#1A1714] transition-colors hover:border-[#6B6560] hover:bg-[#EDEAE3]"
            >
              <Github size={18} />
              GitHub ↗
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
