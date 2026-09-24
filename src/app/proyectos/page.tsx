import type { Metadata } from "next";
import { TerminalLine } from "@/components/terminal-line";
import { ProjectListItem } from "@/components/project-list-item";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos — Joshua Terrones",
  description: "Todos los proyectos de Joshua Terrones, ordenados por relevancia.",
};

export const revalidate = 86400;

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-2 md:pt-8 md:pb-3">
        <TerminalLine cmd="ls proyectos/" />

        <h1 className="mb-5 font-heading text-[32px] leading-none tracking-[-0.03em] md:text-[80px] md:leading-[0.95]">
          Pro<em className="italic text-primary">yectos</em>
        </h1>
        <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">
          {projects.length} proyectos reales desde GitHub, ordenados por relevancia.
        </p>
      </div>

      <section className="pt-0 pb-6 md:pb-8">
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No hay proyectos públicos.</p>
        ) : (
          projects.map((p) => (
            <ProjectListItem
              key={p.num}
              num={p.num}
              title={p.title}
              description={p.subtitle}
              tags={p.tags}
            />
          ))
        )}
      </section>
    </div>
  );
}
