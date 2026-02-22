import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

const techStack = [
  "TypeScript",
  "Go",
  "React",
  "PostgreSQL",
  "Docker",
];

const footerLinks = [
  { href: "/rss", label: "RSS" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://github.com", label: "GitHub" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0]">
      {/* Nav */}
      <nav className="flex h-16 flex-col justify-center border-b border-[#E2DDD7] px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-playfair)] text-[22px] font-bold italic text-[#1A1714]"
        >
          Earth
          <span className="relative flex h-9 w-9 overflow-hidden rounded bg-transparent">
            <Image
              src="/images/image-1.png"
              alt="Earth logo"
              width={38}
              height={38}
              className="object-cover"
            />
          </span>
        </Link>
        <div className="mt-2 flex gap-6 sm:mt-0 sm:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-literata)] text-[15px] text-[#6B6560] transition-colors hover:text-[#1A1714]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

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

      {/* Footer */}
      <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#E2DDD7] px-4 py-4 sm:flex-row sm:px-6 sm:py-0 sm:h-16 md:px-12">
        <p className="text-center font-[family-name:var(--font-literata)] text-[13px] text-[#A09A94] sm:text-left">
          © 2026 Earth. Made with care in Chiang Rai.
        </p>
        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="font-[family-name:var(--font-literata)] text-[13px] text-[#A09A94] transition-colors hover:text-[#6B6560]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
