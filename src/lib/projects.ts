import { getGitHubPinnedRepos, getGitHubAllRepos, type GitHubRepo } from "@/lib/github";

export type Project = {
  num: string;
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  year: string;
  role: string;
  duration: string;
  type: string;
  context: string;
  solution: string;
  features: string[];
  challenges: string[];
};

function repoToProject(repo: GitHubRepo, index: number): Project {
  const year = repo.pushed_at
    ? new Date(repo.pushed_at).getFullYear().toString()
    : new Date(repo.updated_at).getFullYear().toString();

  const tags = [
    ...(repo.language ? [repo.language] : []),
    ...(repo.topics || []).slice(0, 3),
  ];

  return {
    num: String(index + 1).padStart(2, "0"),
    slug: repo.name.toLowerCase(),
    title: repo.name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    subtitle: repo.description || "Sin descripción.",
    tags,
    demoUrl: repo.homepage || undefined,
    repoUrl: repo.html_url,
    year,
    role: "Full-Stack",
    duration: "—",
    type: repo.stargazers_count > 0 ? "Destacado" : "Personal",
    context: repo.description || "Proyecto personal.",
    solution: "Desarrollado con " + (repo.language || "múltiples tecnologías") + ".",
    features: repo.topics?.slice(0, 5) || [],
    challenges: [],
  };
}

export async function getProjects(): Promise<Project[]> {
  const repos = await getGitHubAllRepos();
  return repos.map(repoToProject);
}

export async function getPinnedProjects(): Promise<Project[]> {
  const repos = await getGitHubPinnedRepos();
  return repos.map(repoToProject);
}

export async function getProjectByNum(num: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.num === num);
}

export async function getAdjacentProjects(num: string) {
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.num === num);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
}
