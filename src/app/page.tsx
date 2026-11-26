import type { Metadata } from "next";
import { TerminalLine } from "@/components/terminal-line";
import { MiniAbout } from "@/components/mini-about";
import { FeaturedProjects } from "@/components/featured-projects";
import { MiniContact } from "@/components/mini-contact";
import { getPinnedProjects } from "@/lib/projects";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Joshua Terrones — Desarrollador de Software",
  description:
    "Portafolio de Joshua Terrones, desarrollador backend y full-stack. Python, Django, TypeScript, Next.js, Docker y PostgreSQL.",
};

export default async function Home() {
  const projects = await getPinnedProjects();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8 md:px-8 md:py-12">
      <TerminalLine cmd="whoami" />
      <h1 className="mb-5 font-heading text-[32px] leading-none tracking-[-0.03em] md:text-[80px] md:leading-[0.95]">
        Desarrollador de <em className="italic text-primary">software</em>
        <br />
      </h1>
      <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">
        Enfocado en{" "}
        <strong className="font-medium text-foreground">backend &amp; full-stack</strong>. Python,
        Django, TypeScript, Next.js.
      </p>
      <div className="mt-5 flex flex-col gap-2 font-[family-name:var(--font-geist-mono)] text-xs tracking-wide text-muted-foreground md:mt-6 md:flex-row md:gap-7">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          Abierto a oportunidades
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          Lima, Perú
        </span>
      </div>
      <MiniAbout />
      <FeaturedProjects projects={projects} />
      <MiniContact />
    </div>
  );
}
