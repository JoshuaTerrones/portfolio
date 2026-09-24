import type { Metadata } from "next";
import { TerminalLine } from "@/components/terminal-line";
import { ProcesoSidebar } from "@/components/proceso-sidebar";
import { CHAPTERS } from "@/lib/proceso";

export const metadata: Metadata = {
  title: "Proceso — Joshua Terrones",
  description: "El proceso detrás del portafolio: decisiones, errores y wireframes.",
};

export default function ProcesoPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-4 md:pt-8 md:pb-4">
        <TerminalLine cmd="git log --oneline" />

        <h1 className="mb-4 font-heading text-[32px] leading-[0.95] tracking-[-0.03em] md:text-[68px]">
          Cómo se <em className="italic text-primary">hizo</em> esto.
        </h1>
        <p className="max-w-[720px] font-heading text-[17px] font-light leading-[1.5] md:text-[20px]">
          El proceso detrás del portafolio. Decisiones, errores, wireframes, todo documentado.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 py-5 md:grid-cols-[180px_1fr] md:gap-12 md:py-6">
        <ProcesoSidebar chapters={CHAPTERS} />

        <div>
          {CHAPTERS.map((c) => (
            <div key={c.id} id={c.id} className="mb-8 scroll-mt-24 md:mb-9">
              <h3 className="mb-3 font-heading text-[22px] md:text-[28px]">
                {c.title}
              </h3>
              <p className="mb-3 font-heading text-[16px] font-light leading-[1.65]">
                {c.description}
              </p>
              {c.screenshot && (
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-card font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">
                  <span className="relative z-10">{c.screenshot}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
