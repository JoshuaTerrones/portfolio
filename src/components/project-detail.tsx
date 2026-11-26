import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectDetailProps = { project: Project };

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="pb-12 pt-6 md:pb-16 md:pt-8">
      <Link
        href="/proyectos"
        className="mb-6 inline-block font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        ← Volver a Proyectos
      </Link>
      <div className="mb-5 flex flex-wrap items-center gap-3 font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
        <span className="uppercase text-primary">{project.type}</span>
        <span>·</span>
        <span>{project.year}</span>
        <span>·</span>
        <span>{project.role}</span>
      </div>
      <h1 className="mb-4 font-heading text-[32px] leading-[1.05] tracking-[-0.03em] md:text-[56px]">
        {project.title}
      </h1>
      <p className="mb-6 max-w-[720px] text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
        {project.subtitle}
      </p>
      <div className="mb-8 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border px-3 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      {(project.demoUrl || project.repoUrl) && (
        <div className="mb-10 flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-5 py-2.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver demo →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-primary px-5 py-2.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background"
            >
              Ver código →
            </a>
          )}
        </div>
      )}
      <section className="mb-8">
        <h2 className="mb-3 font-heading text-[22px] md:text-[26px]">Contexto</h2>
        <p className="max-w-[720px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
          {project.context}
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-3 font-heading text-[22px] md:text-[26px]">Solución</h2>
        <p className="max-w-[720px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
          {project.solution}
        </p>
      </section>
      {project.features.length > 0 && (
        <section>
          <h2 className="mb-3 font-heading text-[22px] md:text-[26px]">Características</h2>
          <ul className="space-y-1.5">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-[15px] text-muted-foreground"
              >
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
