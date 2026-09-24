const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "JoshuaTerrones";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type GitHubContributions = {
  total: number;
  weeks: Array<{
    days: Array<{
      date: string;
      count: number;
      level: 0 | 1 | 2 | 3 | 4;
    }>;
  }>;
};

export type GitHubProfile = {
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
  avatarUrl: string;
  bio: string | null;
};

async function graphqlFetch<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN no está configurado en .env.local");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`GraphQL errors: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return json.data as T;
}

const PINNED_QUERY = `
  query GetPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            databaseId
            name
            nameWithOwner
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            updatedAt
            pushedAt
            isFork
            isArchived
            primaryLanguage { name }
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  }
`;

type PinnedNode = {
  databaseId: number;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  pushedAt: string;
  isFork: boolean;
  isArchived: boolean;
  primaryLanguage: { name: string } | null;
  repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
};

export async function getGitHubPinnedRepos(): Promise<GitHubRepo[]> {
  const data = await graphqlFetch<{ user: { pinnedItems: { nodes: PinnedNode[] } } }>(
    PINNED_QUERY,
    { username: GITHUB_USERNAME }
  );

  return (data.user?.pinnedItems?.nodes ?? []).map((n) => ({
    id: n.databaseId,
    name: n.name,
    full_name: n.nameWithOwner,
    description: n.description,
    html_url: n.url,
    homepage: n.homepageUrl,
    language: n.primaryLanguage?.name ?? null,
    topics: n.repositoryTopics.nodes.map((t) => t.topic.name),
    stargazers_count: n.stargazerCount,
    forks_count: n.forkCount,
    updated_at: n.updatedAt,
    pushed_at: n.pushedAt,
    fork: n.isFork,
    archived: n.isArchived,
  }));
}

const CONTRIBUTIONS_QUERY = `
  query GetContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

const LEVEL_MAP: Record<ContributionLevel, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function getGitHubContributions(): Promise<GitHubContributions | null> {
  try {
    const data = await graphqlFetch<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: Array<{
              contributionDays: Array<{
                date: string;
                contributionCount: number;
                contributionLevel: ContributionLevel;
              }>;
            }>;
          };
        };
      };
    }>(CONTRIBUTIONS_QUERY, { username: GITHUB_USERNAME });

    const calendar = data.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((w) => ({
        days: w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel],
        })),
      })),
    };
  } catch {
    return null;
  }
}

const PROFILE_QUERY = `
  query GetProfile($username: String!) {
    user(login: $username) {
      followers { totalCount }
      following { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      createdAt
      avatarUrl
      bio
    }
  }
`;

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const data = await graphqlFetch<{
      user: {
        followers: { totalCount: number };
        following: { totalCount: number };
        repositories: { totalCount: number };
        createdAt: string;
        avatarUrl: string;
        bio: string | null;
      };
    }>(PROFILE_QUERY, { username: GITHUB_USERNAME });

    return {
      followers: data.user.followers.totalCount,
      following: data.user.following.totalCount,
      publicRepos: data.user.repositories.totalCount,
      createdAt: data.user.createdAt,
      avatarUrl: data.user.avatarUrl,
      bio: data.user.bio,
    };
  } catch {
    return null;
  }
}

/* ================================
   TODOS los repos públicos (REST)
   ================================ */
export async function getGitHubAllRepos(): Promise<GitHubRepo[]> {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN no está configurado en .env.local");
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub REST: ${res.status} ${res.statusText}`);
  }

  const repos: GitHubRepo[] = await res.json();

  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });
}
