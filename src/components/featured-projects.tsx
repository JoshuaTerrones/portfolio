import Link from "next/link";
import { ProjectListItem } from "@/components/project-list-item";
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
        <ProjectListItem key={p.num} {...p} />
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
