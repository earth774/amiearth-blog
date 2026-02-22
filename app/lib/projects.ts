import type { Project } from "@/app/types";

export const projects: Project[] = [
  {
    name: "gocache",
    description:
      "A zero-dependency, in-process LRU cache for Go with TTL support, shard locking, and built-in pprof metrics. Battle-tested in production at 40k req/s.",
    tags: ["Go", "Library"],
    githubUrl: "https://github.com",
    stars: 412,
  },
  {
    name: "queryzen",
    description:
      "A minimal PostgreSQL query builder for Go that stays out of your way. No reflection, no magic — just composable, type-safe SQL construction.",
    tags: ["Go", "PostgreSQL"],
    githubUrl: "https://github.com",
    stars: 88,
  },
  {
    name: "amiearth.dev",
    description:
      "This site. A personal blog and portfolio built with Next.js, deployed to Fly.io. Source available if you want to see how the sausage is made.",
    tags: ["Next.js", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://amiearth.dev",
  },
  {
    name: "dotfiles",
    description:
      "My personal development environment configuration — Neovim, tmux, zsh, and everything else. Documented for my future self and anyone curious.",
    tags: ["Neovim", "Shell"],
    githubUrl: "https://github.com",
  },
];
