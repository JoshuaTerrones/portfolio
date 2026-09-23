import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { PROJECTS, getProjectByNum } from "@/lib/projects";

type PageProps = {
  params: Promise<{ num: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ num: p.num }));
}

export default async function ProyectoDetallePage({ params }: PageProps) {
  const { num } = await params;
  const project = getProjectByNum(num);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <ProjectDetail project={project} />
    </div>
  );
}
