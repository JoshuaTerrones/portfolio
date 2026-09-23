export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readingTime: string;
  content: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "semana-1-como-empece",
    category: "Devlog",
    date: "15 Oct 2026",
    title: "Semana 1 — cómo empecé a construirlo",
    excerpt: "Contexto, decisiones, primeros pasos.",
    readingTime: "5 min",
    content: [
      {
        type: "p",
        text: "Esta semana arranqué el proyecto. Primero definí qué quería que tuviera el portafolio: las páginas, el tipo de contenido, las tecnologías.",
      },
      {
        type: "p",
        text: "El primer obstáculo apareció rápido: conflicto entre @vitejs/plugin-react y Babel 7 de shadcn.",
      },
      { type: "h2", text: "La solución" },
      {
        type: "p",
        text: "Usar @vitejs/plugin-react-swc en lugar del plugin normal. Resolvió el conflicto y de paso hizo todo más rápido.",
      },
      {
        type: "quote",
        text: "Lección: cuando hay conflicto de Babel, prueba SWC primero.",
      },
      {
        type: "p",
        text: "La próxima semana: configurar CI/CD con GitHub Actions.",
      },
    ],
  },
  {
    slug: "semana-2-bug-babel-vitest",
    category: "Devlog",
    date: "8 Oct 2026",
    title: "Semana 2 — el bug de Babel y Vitest",
    excerpt: "Cómo lo encontré y cómo lo resolví.",
    readingTime: "4 min",
    content: [
      {
        type: "p",
        text: "Párrafo placeholder sobre el bug de la semana 2.",
      },
    ],
  },
  {
    slug: "semana-3-ci-cd",
    category: "Devlog",
    date: "1 Oct 2026",
    title: "Semana 3 — configuración de CI/CD",
    excerpt: "GitHub Actions, checks, branch protection.",
    readingTime: "6 min",
    content: [
      {
        type: "p",
        text: "Párrafo placeholder sobre la configuración de CI/CD.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const idx = POSTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? POSTS[idx - 1] : POSTS[POSTS.length - 1];
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : POSTS[0];
  return { prev, next };
}
