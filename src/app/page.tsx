import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-12 md:px-8 md:py-16">
      <div className="mb-6 flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[15px] text-muted-foreground">
        <span className="font-medium text-primary">$</span>
        <span className="text-foreground">whoami</span>
        <span className="inline-block h-4 w-[9px] bg-primary animate-[blink_1.2s_step-end_infinite]" />
      </div>
      <h1 className="mb-5 font-heading text-[44px] leading-[0.95] tracking-[-0.03em] md:text-[80px]">
        Construyo <em className="italic text-primary">cosas</em> que
        <br />
        funcionan.
      </h1>
      <p className="max-w-[620px] text-[17px] leading-snug text-muted-foreground">
        Desarrollador{" "}
        <strong className="font-medium text-foreground">backend &amp; full-stack</strong>. Python,
        Django, TypeScript, Next.js. De Lima, Perú.
      </p>
      <div className="mt-6 flex flex-wrap gap-7 font-[family-name:var(--font-geist-mono)] text-xs tracking-wide text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          Abierto a oportunidades
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          Lima, Perú
        </span>
      </div>
    </div>
  );
}