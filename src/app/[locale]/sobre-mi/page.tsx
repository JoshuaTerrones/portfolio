import type { Metadata } from "next";
import { tx } from "gt-next/server";
import { ContribGrid } from "@/components/contrib-grid";
import { getGitHubContributions } from "@/lib/github";
import { getHackatimeStats } from "@/lib/hackatime";
import { TerminalLine } from "@/components/terminal-line";
import { SectionLabel } from "@/components/section-label";

export async function generateMetadata(): Promise<Metadata> {
  const [title, desc] = await Promise.all([
    tx("Sobre mí — Joshua Terrones"),
    tx("Historia, stack técnico, formación y experiencia de Joshua Terrones."),
  ]);
  return { title, description: desc };
}

export const revalidate = 86400;

export default async function SobreMiPage() {
  const [contributions, hackatime] = await Promise.all([
    getGitHubContributions(),
    getHackatimeStats(),
  ]);

  // UI labels
  const cmd = await tx("cat sobre-mi.md");
  const [sobre, mi, heroP, heroStrong, heroTail,
    actividad, horas, contribuciones,
    enQue, backendT, backendD, fullstackT, fullstackD,
    infraT, infraD, integT, integD,
    exp, form, stackT, cv] = await Promise.all([
    tx("Sobre"), tx("mí"), tx("Hola, soy Joshua. Construyo software de principio a fin, desde el modelo de datos hasta el deploy."),
    tx("Elijo la tecnología según el problema"), tx(", no al revés."),
    tx("Actividad reciente"), tx("Horas codificadas este año"), tx("Contribuciones últimos 12 meses"),
    tx("En qué trabajo"),
    tx("Backend"), tx("APIs REST con Django y Django REST Framework. Modelado de bases de datos relacionales."),
    tx("Full-Stack"), tx("Aplicaciones web completas con Next.js + Django. Conexión de frontend y backend end-to-end."),
    tx("Infraestructura"), tx("Docker, CI/CD con GitHub Actions, deploy en Vercel y configuraciones cloud."),
    tx("Integraciones"), tx("Consumo y construcción de APIs externas. Formación complementaria en redes y seguridad."),
    tx("Experiencia"), tx("Formación"), tx("Stack técnico"), tx("Descargar CV (PDF) →"),
  ]);

  // Traducir arrays de datos
  const AREAS = [
    { title: backendT, desc: backendD },
    { title: fullstackT, desc: fullstackD },
    { title: infraT, desc: infraD },
    { title: integT, desc: integD },
  ];

  const [exp1T, exp1D, exp2T, exp2D] = await Promise.all([
    tx("Criterio Arquitectónico — Portafolio Web"),
    tx("Diseñé y desarrollé la identidad digital de un arquitecto independiente. Decisión técnica: JS vanilla para velocidad de carga con contenido visual pesado."),
    tx("Mister Hood's — Sitio web empresarial"),
    tx("Proyecto end-to-end: requerimientos, diseño, desarrollo, deploy y entrega. Único responsable técnico."),
  ]);
  const EXPERIENCE = [
    { company: "Freelance", year: "2024", title: exp1T, stack: "HTML · CSS · JavaScript · Vercel", desc: exp1D },
    { company: "Freelance", year: "2023", title: exp2T, stack: "HTML · CSS · Hostinger", desc: exp2D },
  ];

  const [edu1T, edu1D, edu2T, edu2D] = await Promise.all([
    tx("Ingeniería de Sistemas e Informática"),
    tx("Formación complementaria en redes, seguridad informática, gestión de data centers, sistemas distribuidos e integración cloud (GCP)."),
    tx("Inglés — Advanced Phase"),
    tx("Certificado por la Asociación Cultural Peruano Británica."),
  ]);
  const EDUCATION = [
    { company: "UTP", year: "2021 — 2026", title: edu1T, desc: edu1D },
    { company: "Británico", year: "2026", title: edu2T, desc: edu2D },
  ];

  const [len, back, front, db, infra, tools, design, langs,
    py, ts, js, java, dj, node, djrest, apis,
    njs, react, tw, htmlcss,
    pg, mysql, sq, docker, vercel, gha, linux,
    git, postman, ws, sketch,
    esN, enA] = await Promise.all([
    tx("Lenguajes"), tx("Backend"), tx("Frontend"), tx("Bases de datos"), tx("Infra"), tx("Herramientas"), tx("Diseño"), tx("Idiomas"),
    tx("Python"), tx("TypeScript"), tx("JavaScript"), tx("Java"),
    tx("Django"), tx("Node.js"), tx("Django REST"), tx("APIs REST"),
    tx("Next.js"), tx("React"), tx("Tailwind"), tx("HTML/CSS"),
    tx("PostgreSQL"), tx("MySQL"), tx("SQLite"),
    tx("Docker"), tx("Vercel"), tx("GitHub Actions"), tx("Linux"),
    tx("Git"), tx("Postman"), tx("WebStorm"), tx("Sketch"),
    tx("Español (nativo)"), tx("Inglés (avanzado)"),
  ]);

  const STACK = [
    { cat: len, items: [{ name: py, icon: "python/3776AB" }, { name: ts, icon: "typescript/3178C6" }, { name: js, icon: "javascript/F7DF1E" }, { name: java, icon: "openjdk/FFFFFF" }] },
    { cat: back, items: [{ name: dj, icon: "django/092E20" }, { name: node, icon: "nodedotjs/5FA04E" }, { name: djrest }, { name: apis }] },
    { cat: front, items: [{ name: njs, icon: "nextdotjs/000000" }, { name: react, icon: "react/61DAFB" }, { name: tw, icon: "tailwindcss/06B6D4" }, { name: htmlcss }] },
    { cat: db, items: [{ name: pg, icon: "postgresql/4169E1" }, { name: mysql, icon: "mysql/4479A1" }, { name: sq, icon: "sqlite/003B57" }] },
    { cat: infra, items: [{ name: docker, icon: "docker/2496ED" }, { name: vercel, icon: "vercel/000000" }, { name: gha, icon: "githubactions/2088FF" }, { name: linux, icon: "linux/FCC624" }] },
    { cat: tools, items: [{ name: git, icon: "git/F05032" }, { name: postman, icon: "postman/FF6C37" }, { name: ws }] },
    { cat: design, items: [{ name: sketch, icon: "sketch/F7B500" }] },
    { cat: langs, items: [{ name: esN }, { name: enA }] },
  ];

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-4 md:pt-8 md:pb-4">
        <TerminalLine cmd={cmd} />
        <h1 className="mb-5 font-heading text-[36px] leading-[0.95] tracking-[-0.03em] md:text-[68px]">
          {sobre} <em className="italic text-primary">{mi}</em>.
        </h1>
        <p className="max-w-[760px] font-heading text-[17px] font-light leading-[1.5] md:text-[20px]">
          {heroP}{" "}<strong className="font-normal text-foreground">{heroStrong}</strong>{heroTail}
        </p>
      </div>

      <section className="py-5 md:py-6">
        <SectionLabel>{actividad}</SectionLabel>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-[22px]">
            <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.1em] text-primary">Hackatime</div>
            <div className="mb-1.5 font-heading text-[36px] leading-none">{hackatime ? `${hackatime.totalHours}h` : "—"}</div>
            <div className="text-[13px] text-muted-foreground">{horas}</div>
            <div className="mt-4">
              {(hackatime?.languages ?? []).slice(0, 3).map((l) => (
                <div key={l.name} className="mb-2 grid grid-cols-[90px_1fr_50px] items-center gap-2.5 font-[family-name:var(--font-geist-mono)] text-[11px]">
                  <span className="truncate">{l.name}</span>
                  <div className="h-[5px] overflow-hidden rounded-[3px] bg-border"><div className="h-full rounded-[3px] bg-primary" style={{ width: `${l.percent}%` }} /></div>
                  <span className="text-right text-muted-foreground">{Math.round(l.percent)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-[22px]">
            <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.1em] text-primary">GitHub</div>
            <div className="mb-1.5 font-heading text-[36px] leading-none">{contributions?.total ?? 0}</div>
            <div className="text-[13px] text-muted-foreground">{contribuciones}</div>
            <ContribGrid contributions={contributions} />
          </div>
        </div>
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">{enQue}</h2>
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
        <h2 className="mb-4 font-heading text-[26px]">{exp}</h2>
        {EXPERIENCE.map((e) => (
          <div key={e.title} className="grid grid-cols-1 gap-1.5 py-4 md:grid-cols-[180px_1fr] md:gap-8">
            <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground"><span className="mb-1 block text-primary">{e.company}</span>{e.year}</div>
            <div>
              <h3 className="mb-1.5 font-heading text-[20px]">{e.title}</h3>
              <div className="mb-2 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">{e.stack}</div>
              <p className="text-sm leading-[1.6] text-muted-foreground">{e.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">{form}</h2>
        {EDUCATION.map((e) => (
          <div key={e.title} className="grid grid-cols-1 gap-1.5 py-4 md:grid-cols-[180px_1fr] md:gap-8">
            <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground"><span className="mb-1 block text-primary">{e.company}</span>{e.year}</div>
            <div>
              <h3 className="mb-1.5 font-heading text-[20px]">{e.title}</h3>
              <p className="text-sm leading-[1.6] text-muted-foreground">{e.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="py-5 md:py-6">
        <h2 className="mb-4 font-heading text-[26px]">{stackT}</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {STACK.map((s, i) => (
            <div key={`${s.cat}-${i}`}>
              <div className="mb-2.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-primary">{s.cat}</div>
              <ul className="space-y-1">
                {s.items.map((i) => (
                  <li key={i.name} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    {i.icon && (<img src={`https://cdn.simpleicons.org/${i.icon}`} alt="" width={16} height={16} className="opacity-70 dark:opacity-60 dark:invert" />)}
                    {i.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center py-6 md:justify-start">
        <button type="button" className="rounded-md border border-primary px-6 py-3 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background">{cv}</button>
      </div>
    </div>
  );
}
