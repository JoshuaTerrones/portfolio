export type Chapter = {
  id: string;
  label: string;
  title: string;
  description: string;
  screenshot?: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "01-punto-de-partida",
    label: "01 — Punto de partida",
    title: "01 — Punto de partida",
    description:
      "Antes de escribir código, definí qué quería. 21 fases, 207 issues en un Project de GitHub.",
    screenshot: "[captura del Project board]",
  },
  {
    id: "02-referencias-visuales",
    label: "02 — Referencias visuales",
    title: "02 — Referencias visuales",
    description:
      "Busqué 8 portafolios que me gustaran. Documenté colores, tipografía, layouts.",
    screenshot: "[captura de referencias]",
  },
  {
    id: "03-paleta-tipografia",
    label: "03 — Paleta y tipografía",
    title: "03 — Paleta y tipografía",
    description:
      "Acento naranja quemado sobre fondo crema. Fraunces + Geist + Geist Mono.",
    screenshot: "[muestra]",
  },
  {
    id: "04-wireframes",
    label: "04 — Wireframes",
    title: "04 — Wireframes",
    description: "Bocetos de cada página antes de maquetar.",
    screenshot: "[wireframes]",
  },
  {
    id: "05-stack-final",
    label: "05 — Stack final",
    title: "05 — Stack final",
    description:
      "Next.js 16, TypeScript, Tailwind 4, shadcn/ui con Base UI, Sanity, Resend, Vercel.",
  },
  {
    id: "06-errores-aprendizajes",
    label: "06 — Errores y aprendizajes",
    title: "06 — Errores y aprendizajes",
    description:
      "Bug de Babel vs Vitest. LayoutProps en CI. Fuentes duplicadas por shadcn.",
  },
];
