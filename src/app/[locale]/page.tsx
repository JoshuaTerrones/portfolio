import type { Metadata } from "next";
import { tx } from "gt-next/server";
import { TerminalLine } from "@/components/terminal-line";
import { MiniAbout } from "@/components/mini-about";
import { FeaturedProjects } from "@/components/featured-projects";
import { MiniContact } from "@/components/mini-contact";
import { getPinnedProjects } from "@/lib/projects";

export const revalidate = 86400;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const [title, description] = await Promise.all([
    tx("Joshua Terrones — Desarrollador de Software"),
    tx("Portafolio de Joshua Terrones, desarrollador backend y full-stack. Python, Django, TypeScript, Next.js, Docker y PostgreSQL."),
  ]);
  return { title, description };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const projects = await getPinnedProjects(locale as "es" | "en");

  const [construyo, cosas, que, funcionan, desarrollador, backend, resto, abierto, lima] =
    await Promise.all([
      tx("Construyo"), tx("cosas"), tx("que"), tx("funcionan."),
      tx("Desarrollador"), tx("backend & full-stack"),
      tx(". Python, Django, TypeScript, Next.js. De Lima, Perú."),
      tx("Abierto a oportunidades"), tx("Lima, Perú"),
    ]);

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8 md:px-8 md:py-12">
      <TerminalLine cmd="whoami" />
      <h1 className="mb-5 font-heading text-[32px] leading-none tracking-[-0.03em] md:text-[80px] md:leading-[0.95]">
        {construyo} <em className="italic text-primary">{cosas}</em> {que}
        <br />{funcionan}
      </h1>
      <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">
        {desarrollador} <strong className="font-medium text-foreground">{backend}</strong>{resto}
      </p>
      <div className="mt-5 flex flex-col gap-2 font-[family-name:var(--font-geist-mono)] text-xs tracking-wide text-muted-foreground md:mt-6 md:flex-row md:gap-7">
        <span className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />{abierto}</span>
        <span className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />{lima}</span>
      </div>
      <MiniAbout />
      <FeaturedProjects projects={projects} />
      <MiniContact />
    </div>
  );
}
