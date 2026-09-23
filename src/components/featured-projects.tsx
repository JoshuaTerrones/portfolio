import Link from "next/link";
import { ProjectListItem } from "@/components/project-list-item";
import { SectionLabel } from "@/components/section-label";
import { PROJECTS } from "@/lib/projects";

export function FeaturedProjects() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="py-6">
      <SectionLabel>Proyectos destacados</SectionLabel>

      {featured.map((p) => (
        <ProjectListItem
          key={p.num}
          num={p.num}
          title={p.title}
          description={p.subtitle}
          tags={p.tags}
        />
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
