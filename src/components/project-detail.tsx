import Link from "next/link";
import type { Project } from "@/lib/projects";
import { getAdjacentProjects } from "@/lib/projects";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { prev, next } = getAdjacentProjects(project.num);

  const meta = [
    { label: "Año", value: project.year },
    { label: "Rol", value: project.role },
    { label: "Duración", value: project.duration },
    { label: "Tipo", value: project.type },
  ];

  return (
    <div className="pb-10 pt-6 md:pt-8">
      <Link
        href="/proyectos"
        className="mb-6 inline-block font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground transition-colors hover:text-primary md:mb-8"
      >
        ← Volver a Proyectos
      </Link>

      {/* Hero */}
      <div className="mb-8 grid grid-cols-1 items-start gap-6 md:mb-10 md:grid-cols-2 md:gap-12">
        <div>
          <h1 className="mb-4 font-heading text-[32px] leading-[1.05] tracking-[-0.03em] md:text-[56px]">
            {project.title}
          </h1>
          <p className="mb-5 font-heading text-[16px] font-light leading-[1.5] text-muted-foreground md:text-[18px]">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 md:justify-start">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex aspect-[4/3] items-center justify-center rounded-[10px] border border-border bg-card font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
          [captura principal]
        </div>
      </div>

      {/* Actions */}
      <div className="mb-8 flex flex-col items-stretch gap-2.5 md:mb-10 md:flex-row md:items-center md:justify-between md:gap-4">
        <a
          href={project.demoUrl || "#"}
          target={project.demoUrl && project.demoUrl !== "#" ? "_blank" : undefined}
          rel={project.demoUrl && project.demoUrl !== "#" ? "noopener noreferrer" : undefined}
          className="rounded-md bg-primary px-6 py-3 text-center font-[family-name:var(--font-geist-mono)] text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Ver demo →
        </a>
        <a
          href={project.repoUrl || "#"}
          target={project.repoUrl && project.repoUrl !== "#" ? "_blank" : undefined}
          rel={project.repoUrl && project.repoUrl !== "#" ? "noopener noreferrer" : undefined}
          className="rounded-md border border-border px-6 py-3 text-center font-[family-name:var(--font-geist-mono)] text-[13px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Repositorio →
        </a>
      </div>

      {/* Meta strip */}
      <div className="mb-8 grid grid-cols-2 gap-4 border-y border-border py-5 md:mb-10 md:grid-cols-4 md:gap-6 md:py-6">
        {meta.map((m, i) => (
          <div key={m.label} className={i % 2 === 1 ? "text-right md:text-left" : ""}>
            <div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">
              {m.label}
            </div>
            <div className="font-heading text-[17px]">{m.value}</div>
          </div>
        ))}
      </div>

      {/* 01 Contexto */}
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
          01 / Contexto
        </div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">
            El <em className="italic text-primary">problema</em> a resolver.
          </h3>
          <p className="font-heading text-[16px] font-light leading-[1.7]">{project.context}</p>
        </div>
      </div>

      {/* 02 Solución */}
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
          02 / Solución
        </div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">
            Cómo lo <em className="italic text-primary">resolví</em>.
          </h3>
          <p className="font-heading text-[16px] font-light leading-[1.7]">{project.solution}</p>
        </div>
      </div>

      {/* 03 Características */}
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
          03 / Características
        </div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">
            Lo que <em className="italic text-primary">hace</em>.
          </h3>
          <ul className="space-y-1.5">
            {project.features.map((f) => (
              <li
                key={f}
                className="relative pl-5 font-heading text-[16px] font-light leading-[1.7]"
              >
                <span className="absolute left-1.5 font-bold text-primary">·</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 04 Capturas */}
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
          04 / Capturas
        </div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">
            Vistas del <em className="italic text-primary">proyecto</em>.
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {["[captura 1]", "[captura 2]", "[captura 3]"].map((label) => (
              <div
                key={label}
                className="flex aspect-[4/3] items-center justify-center rounded-lg border border-border bg-card font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 05 Retos */}
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
          05 / Retos
        </div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">
            Qué fue <em className="italic text-primary">difícil</em>.
          </h3>
          <ul className="space-y-1.5">
            {project.challenges.map((c) => (
              <li
                key={c}
                className="relative pl-5 font-heading text-[16px] font-light leading-[1.7]"
              >
                <span className="absolute left-1.5 font-bold text-primary">·</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nav prev/next */}
      <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 md:grid-cols-2">
        {prev && (
          <Link
            href={`/proyectos/${prev.num}`}
            className="rounded-lg border border-border p-5 transition-colors hover:border-primary"
          >
            <div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">
              ← Anterior
            </div>
            <div className="font-heading text-[20px]">{prev.title}</div>
          </Link>
        )}
        {next && (
          <Link
            href={`/proyectos/${next.num}`}
            className="rounded-lg border border-border p-5 text-left transition-colors hover:border-primary md:text-right"
          >
            <div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">
              Siguiente →
            </div>
            <div className="font-heading text-[20px]">{next.title}</div>
          </Link>
        )}
      </div>
    </div>
  );
}
