import Link from "next/link";
import { tx } from "gt-next/server";
import type { Project } from "@/lib/projects";
import { getAdjacentProjects } from "@/lib/projects";

type ProjectDetailProps = { project: Project };

export async function ProjectDetail({ project }: ProjectDetailProps) {
  const { prev, next } = await getAdjacentProjects(project.num);

  const [volver, verDemo, repo, anio, rol, duracion, tipo,
    ctx, ctxTitle, ctxEm, ctxTail,
    sol, solTitle, solEm, solTail,
    carac, caracTitle, caracEm, caracTail,
    retos, retosTitle, retosEm, retosTail,
    ant, sig] = await Promise.all([
    tx("← Volver a Proyectos"), tx("Ver demo →"), tx("Repositorio →"),
    tx("Año"), tx("Rol"), tx("Duración"), tx("Tipo"),
    tx("01 / Contexto"), tx("El"), tx("problema"), tx("a resolver."),
    tx("02 / Solución"), tx("Cómo lo"), tx("resolví"), tx("."),
    tx("03 / Características"), tx("Lo que"), tx("hace"), tx("."),
    tx("04 / Retos"), tx("Qué fue"), tx("difícil"), tx("."),
    tx("← Anterior"), tx("Siguiente →"),
  ]);

  const meta = [
    { label: anio, value: project.year },
    { label: rol, value: project.role },
    { label: duracion, value: project.duration },
    { label: tipo, value: project.type },
  ];

  return (
    <div className="pb-10 pt-6 md:pt-8">
      <Link href="/proyectos" className="mb-6 inline-block font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground transition-colors hover:text-primary md:mb-8">{volver}</Link>
      <div className="mb-8 grid grid-cols-1 items-start gap-6 md:mb-10 md:grid-cols-2 md:gap-12">
        <div>
          <h1 className="mb-4 font-heading text-[32px] leading-[1.05] tracking-[-0.03em] md:text-[56px]">{project.title}</h1>
          <p className="mb-5 font-heading text-[16px] font-light leading-[1.5] text-muted-foreground md:text-[18px]">{project.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-1.5 md:justify-start">
            {project.tags.map((t) => (<span key={t} className="rounded border border-border px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">{t}</span>))}
          </div>
        </div>
        <div className="flex aspect-[4/3] items-center justify-center rounded-[10px] border border-border bg-card font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">[captura principal]</div>
      </div>
      <div className="mb-8 flex flex-col items-stretch gap-2.5 md:mb-10 md:flex-row md:items-center md:justify-between md:gap-4">
        {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-6 py-3 text-center font-[family-name:var(--font-geist-mono)] text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90">{verDemo}</a>)}
        {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border px-6 py-3 text-center font-[family-name:var(--font-geist-mono)] text-[13px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary">{repo}</a>)}
      </div>
      <div className="mb-8 grid grid-cols-2 gap-4 border-y border-border py-5 md:mb-10 md:grid-cols-4 md:gap-6 md:py-6">
        {meta.map((m, i) => (
          <div key={m.label} className={i % 2 === 1 ? "text-right md:text-left" : ""}>
            <div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">{m.label}</div>
            <div className="font-heading text-[17px]">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">{ctx}</div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">{ctxTitle} <em className="italic text-primary">{ctxEm}</em> {ctxTail}</h3>
          <p className="font-heading text-[16px] font-light leading-[1.7]">{project.context}</p>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
        <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">{sol}</div>
        <div>
          <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">{solTitle} <em className="italic text-primary">{solEm}</em>{solTail}</h3>
          <p className="font-heading text-[16px] font-light leading-[1.7]">{project.solution}</p>
        </div>
      </div>
      {project.features.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
          <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">{carac}</div>
          <div>
            <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">{caracTitle} <em className="italic text-primary">{caracEm}</em>{caracTail}</h3>
            <ul className="space-y-1.5">
              {project.features.map((f) => (<li key={f} className="relative pl-5 font-heading text-[16px] font-light leading-[1.7]"><span className="absolute left-1.5 font-bold text-primary">·</span>{f}</li>))}
            </ul>
          </div>
        </div>
      )}
      {project.challenges.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-2 md:mb-10 md:grid-cols-[100px_1fr] md:gap-8">
          <div className="pt-1 font-[family-name:var(--font-geist-mono)] text-xs text-primary">{retos}</div>
          <div>
            <h3 className="mb-4 font-heading text-[22px] leading-[1.15] md:text-[26px]">{retosTitle} <em className="italic text-primary">{retosEm}</em>{retosTail}</h3>
            <ul className="space-y-1.5">
              {project.challenges.map((c) => (<li key={c} className="relative pl-5 font-heading text-[16px] font-light leading-[1.7]"><span className="absolute left-1.5 font-bold text-primary">·</span>{c}</li>))}
            </ul>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 md:grid-cols-2">
        {prev && (<Link href={`/proyectos/${prev.num}`} className="rounded-lg border border-border p-5 transition-colors hover:border-primary"><div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">{ant}</div><div className="font-heading text-[20px]">{prev.title}</div></Link>)}
        {next && (<Link href={`/proyectos/${next.num}`} className="rounded-lg border border-border p-5 text-left transition-colors hover:border-primary md:text-right"><div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">{sig}</div><div className="font-heading text-[20px]">{next.title}</div></Link>)}
      </div>
    </div>
  );
}
