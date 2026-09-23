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

export const PROJECTS: Project[] = [
  {
    num: "01",
    slug: "proyecto-01",
    title: "Proyecto 01",
    subtitle: "Subtítulo breve del proyecto placeholder.",
    tags: ["tech-1", "tech-2"],
    demoUrl: "#",
    repoUrl: "#",
    year: "2026",
    role: "Full-Stack",
    duration: "2 meses",
    type: "Personal",
    context:
      "Párrafo placeholder sobre el contexto. Qué problema existía, quién lo necesitaba, por qué valía la pena construirlo.",
    solution:
      "Stack principal y decisiones técnicas clave. Párrafo placeholder describiendo cómo se resolvió.",
    features: [
      "Característica placeholder 1",
      "Característica placeholder 2",
      "Característica placeholder 3",
      "Característica placeholder 4",
    ],
    challenges: ["Reto placeholder 1", "Reto placeholder 2", "Reto placeholder 3"],
  },
  {
    num: "02",
    slug: "proyecto-02",
    title: "Proyecto 02",
    subtitle: "Subtítulo breve del proyecto placeholder.",
    tags: ["tech-1"],
    demoUrl: "#",
    repoUrl: "#",
    year: "2026",
    role: "Full-Stack",
    duration: "1 mes",
    type: "Personal",
    context: "Párrafo placeholder sobre el contexto.",
    solution: "Párrafo placeholder sobre la solución.",
    features: ["Característica placeholder 1", "Característica placeholder 2"],
    challenges: ["Reto placeholder 1", "Reto placeholder 2"],
  },
  {
    num: "03",
    slug: "proyecto-03",
    title: "Proyecto 03",
    subtitle: "Subtítulo breve del proyecto placeholder.",
    tags: ["tech-1"],
    demoUrl: "#",
    repoUrl: "#",
    year: "2026",
    role: "Full-Stack",
    duration: "1 mes",
    type: "Personal",
    context: "Párrafo placeholder sobre el contexto.",
    solution: "Párrafo placeholder sobre la solución.",
    features: ["Característica placeholder 1", "Característica placeholder 2"],
    challenges: ["Reto placeholder 1", "Reto placeholder 2"],
  },
  {
    num: "04",
    slug: "proyecto-04",
    title: "Proyecto 04",
    subtitle: "Subtítulo breve del proyecto placeholder.",
    tags: ["tech-1"],
    demoUrl: "#",
    repoUrl: "#",
    year: "2026",
    role: "Full-Stack",
    duration: "1 mes",
    type: "Personal",
    context: "Párrafo placeholder sobre el contexto.",
    solution: "Párrafo placeholder sobre la solución.",
    features: ["Característica placeholder 1", "Característica placeholder 2"],
    challenges: ["Reto placeholder 1", "Reto placeholder 2"],
  },
  {
    num: "05",
    slug: "proyecto-05",
    title: "Proyecto 05",
    subtitle: "Subtítulo breve del proyecto placeholder.",
    tags: ["tech-1"],
    demoUrl: "#",
    repoUrl: "#",
    year: "2026",
    role: "Full-Stack",
    duration: "1 mes",
    type: "Personal",
    context: "Párrafo placeholder sobre el contexto.",
    solution: "Párrafo placeholder sobre la solución.",
    features: ["Característica placeholder 1", "Característica placeholder 2"],
    challenges: ["Reto placeholder 1", "Reto placeholder 2"],
  },
];

export function getProjectByNum(num: string): Project | undefined {
  return PROJECTS.find((p) => p.num === num);
}

export function getAdjacentProjects(num: string) {
  const idx = PROJECTS.findIndex((p) => p.num === num);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? PROJECTS[idx - 1] : PROJECTS[PROJECTS.length - 1];
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : PROJECTS[0];
  return { prev, next };
}
