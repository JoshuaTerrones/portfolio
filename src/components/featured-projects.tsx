import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
const PROJECTS = [
  {
    num: "01",
    title: "Proyecto 01",
    description: "Descripción breve placeholder.",
    tags: ["tech-1", "tech-2"],
  },
  {
    num: "02",
    title: "Proyecto 02",
    description: "Descripción breve placeholder.",
    tags: ["tech-1"],
  },
  {
    num: "03",
    title: "Proyecto 03",
    description: "Descripción breve placeholder.",
    tags: ["tech-1"],
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-6">
      <SectionLabel>Proyectos destacados</SectionLabel>
      {PROJECTS.map((p) => (
        <Link
          key={p.num}
          href={`/proyectos/${p.num}`}
          className="grid grid-cols-[50px_1fr] items-baseline gap-4 border-b border-border py-5 transition-all hover:pl-3 md:grid-cols-[110px_1fr_auto] md:gap-6"
        >
          <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
            {p.num}
          </div>
          <div>
            <h3 className="font-heading text-[20px] leading-tight tracking-tight transition-colors md:text-[26px]">
              {p.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
          </div>
          <div className="hidden flex-wrap justify-end gap-1.5 md:flex">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Link>
      ))}

      <div className="pt-5">
        <Link
          href="/proyectos"
          className="inline-block rounded-md border border-primary px-5 py-2.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background"
        >
          Ver todos los proyectos →
        </Link>
      </div>
    </section>
  );
}
