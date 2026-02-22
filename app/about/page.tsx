import type { Metadata } from "next";
import Image from "next/image";
import { Github, Mail, Twitter } from "lucide-react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "About | Earth",
  description:
    "Software developer from Chiang Rai. Go, TypeScript, backend systems. Readable code, thoughtful APIs.",
};

const experience = [
  {
    period: "2022 – now",
    title: "Senior Software Engineer",
    company: "Agoda · Bangkok (remote)",
    description:
      "Backend infrastructure team. Go microservices, PostgreSQL, Kafka. Worked on payment routing and rate limiting systems.",
  },
  {
    period: "2019 – 2022",
    title: "Software Engineer",
    company: "Omise · Chiang Mai",
    description:
      "Full-stack engineer on the merchant dashboard. React frontend, Ruby on Rails API, helped migrate to TypeScript.",
  },
  {
    period: "2017 – 2019",
    title: "Junior Developer",
    company: "Freelance · Chiang Rai",
    description:
      "WordPress sites, small PHP applications, and my first real taste of what it means to maintain software someone else depends on.",
  },
];

const skills = [
  {
    label: "Languages",
    values: "Go · TypeScript · SQL · Bash · Python (scripting)",
  },
  {
    label: "Backend",
    values: "Go · PostgreSQL · Redis · Kafka · Docker · Kubernetes",
  },
  {
    label: "Frontend",
    values: "React · Next.js · TypeScript · CSS",
  },
  {
    label: "Tooling",
    values: "Neovim · tmux · Git · Fly.io · Grafana · pprof",
  },
];

const connectLinks = [
  {
    href: "mailto:sutthiphongnuanma@gmail.com",
    label: "sutthiphongnuanma@gmail.com",
    accent: true,
    icon: Mail,
  },
  { href: "https://github.com", label: "GitHub ↗", icon: Github },
  { href: "https://twitter.com", label: "Twitter ↗", icon: Twitter },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Nav />

      <main className="flex flex-1 flex-col">
        {/* Hero photo */}
        <div className="relative h-48 w-full overflow-hidden sm:h-64 md:h-80 lg:h-[340px]">
          <Image
            src="https://images.unsplash.com/photo-1706801484143-9cc962a0e033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE3MjgzNTl8&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Chiang Rai landscape"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-[720px] px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:max-w-[900px] lg:px-16 lg:py-24">
          <p className="font-[family-name:var(--font-literata)] text-[13px] italic text-[#A09A94]">
            Chiang Rai, 2025
          </p>

          <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1714] sm:text-4xl md:text-[42px]">
            About
          </h1>

          <div className="mt-6 flex flex-col gap-5 font-[family-name:var(--font-literata)] text-[15px] leading-[1.8] text-[#1A1714] sm:text-[17px]">
            <p>
              I&apos;m Earth — a software developer from Chiang Rai, a small
              city in the mountains of northern Thailand. I&apos;ve been writing
              code professionally for six years, mostly in Go and TypeScript,
              mostly for backend systems that need to be fast and boring.
            </p>
            <p>
              I care about the craft of programming: readable code, thoughtful
              APIs, and systems that are easy to reason about. I tend to reach
              for the simplest solution that could possibly work, then profile
              before optimising.
            </p>
            <p>
              Outside of code, I drink too much coffee, read a lot of books, and
              occasionally hike in Doi Inthanon National Park. This blog is
              where I think out loud.
            </p>
          </div>

          {/* Experience */}
          <h2 className="mt-9 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1A1714] sm:text-[26px]">
            Experience
          </h2>

          <div className="mt-6 flex flex-col">
            {experience.map((job, i) => (
              <div
                key={job.title}
                className={`flex flex-col gap-4 border-b border-[#E2DDD7] py-6 sm:flex-row sm:gap-8 ${
                  i === 0 ? "pt-0" : ""
                }`}
              >
                <span className="shrink-0 font-[family-name:var(--font-jetbrains)] text-xs text-[#A09A94] sm:w-24">
                  {job.period}
                </span>
                <div className="flex flex-col gap-1 sm:flex-1">
                  <h3 className="font-[family-name:var(--font-literata)] text-base font-semibold text-[#1A1714]">
                    {job.title}
                  </h3>
                  <p className="font-[family-name:var(--font-literata)] text-sm text-[#6B6560]">
                    {job.company}
                  </p>
                  <p className="font-[family-name:var(--font-literata)] text-sm leading-[1.6] text-[#6B6560]">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <h2 className="mt-9 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1A1714] sm:text-[26px]">
            Skills
          </h2>

          <div className="mt-6 flex flex-col gap-4 py-7 sm:gap-3.5">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="shrink-0 font-[family-name:var(--font-jetbrains)] text-xs text-[#A09A94] sm:w-[120px]">
                  {skill.label}
                </span>
                <p className="font-[family-name:var(--font-literata)] text-[15px] text-[#1A1714]">
                  {skill.values}
                </p>
              </div>
            ))}
          </div>

          {/* Get in touch */}
          <hr className="my-9 border-[#E2DDD7]" />
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1A1714] sm:text-[26px]">
            Get in touch
          </h2>

          <p className="mt-3 font-[family-name:var(--font-literata)] text-base leading-[1.7] text-[#6B6560]">
            The best way to reach me is by email. I try to respond to everyone,
            though it may take a few days.
          </p>

          <div className="mt-5 flex flex-col gap-6 pb-14 sm:flex-row sm:gap-7 md:pb-16">
            {connectLinks.map((link) => {
              const Icon = link.icon;
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-2 font-[family-name:var(--font-literata)] text-[15px] transition-colors hover:underline ${
                    link.accent
                      ? "text-[#2D5016] hover:text-[#234012]"
                      : "text-[#6B6560] hover:text-[#1A1714]"
                  }`}
                >
                  <Icon size={18} aria-hidden />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
