export interface MediaUrl {
  title: string;
  url: string;
  type?: string;
}

export interface DemoUrl {
  title: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  language: string;
  download_url?: string;
  repo_url?: string;
  demo_url?: DemoUrl;
  media_url?: MediaUrl;
  media_urls?: MediaUrl[];
  updated_at: string;
}

export interface ProjectsConfig {
  github_username?: string;
  projects: Project[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  updated_at: string;
  fork: boolean;
}
