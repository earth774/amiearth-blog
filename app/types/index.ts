export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  year: number;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
}
