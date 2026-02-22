import type { Project } from "@/app/types";

interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
}

export function ProjectCard({ project, isLast = false }: ProjectCardProps) {
  return (
    <article
      className={`flex flex-col gap-8 py-9 sm:flex-row sm:items-start sm:justify-between sm:gap-12 ${
        isLast ? "" : "border-b border-[#E2DDD7]"
      }`}
      data-testid="project-card"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-semibold text-[#1A1714]">
          {project.name}
        </h2>
        <p className="font-[family-name:var(--font-literata)] text-[15px] leading-[1.7] text-[#6B6560]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#E8F0E1] px-2.5 py-1.5 font-[family-name:var(--font-jetbrains)] text-[11px] text-[#2D5016]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2.5 sm:gap-2">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-literata)] text-[13px] text-[#2D5016] transition-colors hover:underline"
          >
            GitHub ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-literata)] text-[13px] text-[#6B6560] transition-colors hover:text-[#1A1714] hover:underline"
          >
            Live site ↗
          </a>
        )}
        {project.stars !== undefined && (
          <span className="font-[family-name:var(--font-literata)] text-[12px] text-[#A09A94]">
            ★ {project.stars}
          </span>
        )}
      </div>
    </article>
  );
}
