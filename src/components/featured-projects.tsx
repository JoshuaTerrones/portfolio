import Link from "next/link";
import { ProjectListItem } from "@/components/project-list-item";
import { SectionLabel } from "@/components/section-label";
import type { Project } from "@/lib/projects";

type FeaturedProjectsProps = {
  projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="py-4 md:py-6">
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

      <div className="pt-3 md:pt-5">
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
