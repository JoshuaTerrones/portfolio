import type { Metadata } from "next";
import { TerminalLine } from "@/components/terminal-line";
import { ProjectListItem } from "@/components/project-list-item";

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
  {
    num: "04",
    title: "Proyecto 04",
    description: "Descripción breve placeholder.",
    tags: ["tech-1"],
  },
  {
    num: "05",
    title: "Proyecto 05",
    description: "Descripción breve placeholder.",
    tags: ["tech-1"],
  },
];

export const metadata: Metadata = {
  title: "Proyectos — Joshua Terrones",
  description: "Todos los proyectos de Joshua Terrones, ordenados por relevancia.",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-2 md:pt-8 md:pb-3">
        <TerminalLine cmd="ls proyectos/" />

        <h1 className="mb-5 font-heading text-[32px] leading-none tracking-[-0.03em] md:text-[80px] md:leading-[0.95]">
          Pro<em className="italic text-primary">yectos</em>
        </h1>
        <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">
          Todos los proyectos, ordenados por relevancia.
        </p>
      </div>

      <section className="pt-0 pb-6 md:pb-8">
        {PROJECTS.map((p) => (
          <ProjectListItem key={p.num} {...p} />
        ))}
      </section>
    </div>
  );
}
