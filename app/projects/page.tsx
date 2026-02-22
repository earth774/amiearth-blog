import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ProjectCard } from "@/app/components/ProjectCard";
import { projects } from "@/app/lib/projects";

export const metadata = {
  title: "Projects | Earth",
  description:
    "Things I've built, open-sourced, and occasionally maintain.",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Nav />

      <main className="flex flex-1 flex-col py-16">
        <div className="mx-auto w-full max-w-[960px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          {/* Projects Header */}
          <header className="mb-12 flex flex-col gap-2 pb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1714] sm:text-4xl md:text-[42px]">
              Projects
            </h1>
            <p className="font-[family-name:var(--font-literata)] text-base leading-[1.6] text-[#6B6560] sm:text-[16px]">
              Things I&apos;ve built, open-sourced, and occasionally maintain.
            </p>
          </header>

          {/* Divider */}
          <div className="h-px w-full bg-[#E2DDD7]" />

          {/* Project List */}
          <div className="flex flex-col">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                isLast={index === projects.length - 1}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
