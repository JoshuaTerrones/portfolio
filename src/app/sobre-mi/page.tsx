import type { Metadata } from "next";
import { ContribGrid } from "@/components/contrib-grid";
import { getGitHubContributions, getGitHubStats } from "@/lib/github";
import { TerminalLine } from "@/components/terminal-line";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Sobre mí — Joshua Terrones",
  description: "Historia, stack técnico, formación y experiencia de Joshua Terrones.",
};

export const revalidate = 86400;

const AREAS = [
  {
    title: "Backend",
    desc: "APIs REST con Django y Django REST Framework. Modelado de bases de datos relacionales.",
  },
  {
    title: "Full-Stack",
    desc: "Aplicaciones web completas con Next.js + Django. Conexión de frontend y backend.",
  },
  {
    title: "Infraestructura",
    desc: "Docker, automatización de despliegues con GitHub Actions, deploy en Vercel y configuraciones cloud.",
  },
  {
    title: "Integraciones",
    desc: "Consumo y construcción de APIs externas. Integración de servicios de terceros y automatización de flujos.",
  },
];

const EXPERIENCE = [
  {
    company: "Freelance",
    year: "2024",
    title: "Criterio Arquitectónico — Portafolio Web",
    stack: "HTML · CSS · JavaScript · Vercel",
    desc: "Diseñé y desarrollé la identidad digital de un arquitecto independiente. Usé JavaScript vanilla en lugar de frameworks para garantizar velocidad de carga con contenido visual pesado.",
  },
  {
    company: "Freelance",
    year: "2023",
    title: "Mister Hood's — Sitio web empresarial",
    stack: "HTML · CSS · Hostinger",
    desc: "Gestioné el proyecto desde los requerimientos iniciales hasta el diseño, desarrollo y despliegue en Hostinger.",
  },
];

const EDUCATION = [
  {
    company: "UTP",
    year: "2021 — 2026",
    title: "Ingeniería de Sistemas e Informática (Egresado)",
    desc: "",
  },
  {
    company: "Británico",
    year: "2026",
    title: "Inglés — Advanced Phase",
    desc: "Certificado por la Asociación Cultural Peruano Británica.",
  },
];

const STACK = [
  {
    cat: "Lenguajes",
    items: [
      { name: "Python", icon: "python/3776AB" },
      { name: "TypeScript", icon: "typescript/3178C6" },
      { name: "JavaScript", icon: "javascript/F7DF1E" },
      { name: "Java", icon: "openjdk/FFFFFF" },
    ],
  },
  {
    cat: "Backend",
    items: [
      { name: "Django", icon: "django/092E20" },
      { name: "Node.js", icon: "nodedotjs/5FA04E" },
      { name: "Django REST" },
      { name: "APIs REST" },
    ],
  },
  {
    cat: "Frontend",
    items: [
      { name: "Next.js", icon: "nextdotjs/000000" },
      { name: "React", icon: "react/61DAFB" },
      { name: "Tailwind", icon: "tailwindcss/06B6D4" },
      { name: "HTML/CSS" },
    ],
  },
  {
    cat: "Bases de datos",
    items: [
      { name: "PostgreSQL", icon: "postgresql/4169E1" },
      { name: "MySQL", icon: "mysql/4479A1" },
      { name: "SQLite", icon: "sqlite/003B57" },
    ],
  },
  {
    cat: "Infra",
    items: [
      { name: "Docker", icon: "docker/2496ED" },
      { name: "Vercel", icon: "vercel/000000" },
      { name: "GitHub Actions", icon: "githubactions/2088FF" },
      { name: "Linux", icon: "linux/FCC624" },
    ],
  },
  {
    cat: "Herramientas",
    items: [
      { name: "Git", icon: "git/F05032" },
      { name: "Postman", icon: "postman/FF6C37" },
      { name: "WebStorm" },
    ],
  },
  { cat: "Diseño", items: [{ name: "Sketch", icon: "sketch/F7B500" }] },
  { cat: "Idiomas", items: [{ name: "Español (nativo)" }, { name: "Inglés (avanzado)" }] },
];

export default async function SobreMiPage() {
  // Ahora traemos las contribuciones y las estadísticas de GitHub
  const [contributions, stats] = await Promise.all([getGitHubContributions(), getGitHubStats()]);

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-4 md:pt-8 md:pb-4">
        <TerminalLine cmd="cat sobre-mi.md" />
        <h1 className="mb-5 font-heading text-[36px] leading-[0.95] tracking-[-0.03em] md:text-[68px]">
          Sobre <em className="italic text-primary">mí</em>.
        </h1>
        <p className="max-w-[760px] font-heading text-[17px] font-light leading-[1.5] md:text-[20px]">
          Ingeniero de Sistemas egresado de la UTP. Construyo aplicaciones web completas, desde el
          modelado de bases de datos y las APIs con Django, hasta las interfaces con Next.js. Me
          enfoco en código mantenible y despliegues automatizados.
        </p>
      </div>

      <section className="py-5 md:py-6">
        <SectionLabel>Actividad reciente</SectionLabel>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* TARJETA NUEVA: GITHUB STATS (Reemplaza a Hackatime) */}
          <div className="rounded-xl border border-border bg-card p-[22px]">
            <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.1em] text-primary">
              GitHub Stats
            </div>

            {/* Dato principal */}
            <div className="mb-1.5 font-heading text-[36px] leading-none">
              {stats ? stats.commits : 0}
            </div>
            <div className="text-[13px] text-muted-foreground mb-5">Commits este año</div>

            {/* Datos secundarios en una grilla de 3 columnas que ocupa todo el ancho */}
            <div className="grid grid-cols-3 gap-2 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground border-t border-border/50 pt-4">
              <div>
                <span className="block text-foreground text-[16px] mb-1">
                  {stats?.pullRequests || 0}
                </span>
                Pull Requests
              </div>
              <div>
                <span className="block text-foreground text-[16px] mb-1">{stats?.issues || 0}</span>
                Issues
              </div>
              <div>
                <span className="block text-foreground text-[16px] mb-1">
                  {stats?.codeReviews || 0}
                </span>
                Code Reviews
              </div>
            </div>
          </div>

          {/* TARJETA EXISTENTE: CONTRIBUCIONES */}
          <div className="rounded-xl border border-border bg-card p-[22px]">
            <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.1em] text-primary">
              GitHub
            </div>
            <div className="mb-1.5 font-heading text-[36px] leading-none">
              {contributions?.total ?? 0}
            </div>
            <div className="text-[13px] text-muted-foreground">Contribuciones últimos 12 meses</div>
            <ContribGrid contributions={contributions} />
          </div>
        </div>
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">En qué trabajo</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {AREAS.map((a) => (
            <div key={a.title} className="border-l-2 border-primary pl-4">
              <div className="mb-1.5 font-heading text-[18px]">{a.title}</div>
              <div className="text-sm leading-[1.55] text-muted-foreground">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">Experiencia</h2>
        {EXPERIENCE.map((e) => (
          <div
            key={e.title}
            className="grid grid-cols-1 gap-1.5 py-4 md:grid-cols-[180px_1fr] md:gap-8"
          >
            <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
              <span className="mb-1 block text-primary">{e.company}</span>
              {e.year}
            </div>
            <div>
              <h3 className="mb-1.5 font-heading text-[20px]">{e.title}</h3>
              <div className="mb-2 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">
                {e.stack}
              </div>
              <p className="text-sm leading-[1.6] text-muted-foreground">{e.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">Formación</h2>
        {EDUCATION.map((e) => (
          <div
            key={e.title}
            className="grid grid-cols-1 gap-1.5 py-4 md:grid-cols-[180px_1fr] md:gap-8"
          >
            <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
              <span className="mb-1 block text-primary">{e.company}</span>
              {e.year}
            </div>
            <div>
              <h3 className="mb-1.5 font-heading text-[20px]">{e.title}</h3>
              {e.desc && <p className="text-sm leading-[1.6] text-muted-foreground">{e.desc}</p>}
            </div>
          </div>
        ))}
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">Stack técnico</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {STACK.map((s, i) => (
            <div key={`${s.cat}-${i}`}>
              <div className="mb-2.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-primary">
                {s.cat}
              </div>
              <ul className="space-y-1">
                {s.items.map((it) => (
                  <li
                    key={it.name}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    {it.icon && (
                      <img
                        src={`https://cdn.simpleicons.org/${it.icon}`}
                        alt=""
                        width={16}
                        height={16}
                        className="opacity-70 dark:opacity-60 dark:invert"
                      />
                    )}
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center py-6 md:justify-start">
        <a
          href="/Joshua%20Terrones%20CV.pdf"
          download="Joshua%20Terrones%20CV.pdf"
          className="rounded-md border border-primary px-6 py-3 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background"
        >
          Descargar CV (PDF) →
        </a>
      </div>
    </div>
  );
}
