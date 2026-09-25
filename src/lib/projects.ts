import { tx } from "gt-next/server";
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

  const tags = [...(repo.language ? [repo.language] : []), ...(repo.topics || []).slice(0, 3)];

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

async function translateProject(project: Project, locale: "es" | "en"): Promise<Project> {
  if (locale === "es") return project;
  return {
    ...project,
    subtitle: await tx(project.subtitle),
    context: await tx(project.context),
    solution: await tx(project.solution),
    type: await tx(project.type),
    role: await tx(project.role),
    features: await Promise.all(project.features.map((f) => tx(f))),
  };
}

export async function getProjects(locale: "es" | "en" = "es"): Promise<Project[]> {
  const repos = await getGitHubAllRepos();
  return Promise.all(repos.map((repo, i) => translateProject(repoToProject(repo, i), locale)));
}

export async function getPinnedProjects(locale: "es" | "en" = "es"): Promise<Project[]> {
  const repos = await getGitHubPinnedRepos();
  return Promise.all(repos.map((repo, i) => translateProject(repoToProject(repo, i), locale)));
}

export async function getProjectByNum(
  num: string,
  locale: "es" | "en" = "es"
): Promise<Project | undefined> {
  const projects = await getProjects(locale);
  return projects.find((p) => p.num === num);
}

export async function getAdjacentProjects(num: string, locale: "es" | "en" = "es") {
  const projects = await getProjects(locale);
  const idx = projects.findIndex((p) => p.num === num);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
}
