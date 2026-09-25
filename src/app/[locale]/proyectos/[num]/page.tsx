import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { getProjectByNum } from "@/lib/projects";

type PageProps = {
  params: Promise<{ num: string; locale: string }>;
};

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { num, locale } = await params;
  const project = await getProjectByNum(num, locale as "es" | "en");
  if (!project) return {};
  return {
    title: `${project.title} — Joshua Terrones`,
    description: project.subtitle,
  };
}

export default async function ProyectoDetallePage({ params }: PageProps) {
  const { num, locale } = await params;
  const project = await getProjectByNum(num, locale as "es" | "en");

  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <ProjectDetail project={project} />
    </div>
  );
}
