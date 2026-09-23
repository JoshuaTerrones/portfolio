import Link from "next/link";

export function MiniContact() {
  return (
    <section className="flex flex-col items-start justify-between gap-5 py-6 md:flex-row md:items-center">
      <p className="max-w-[500px] font-heading text-[18px] leading-tight md:text-[22px]">
        ¿Tienes un proyecto en mente? <em className="italic text-primary">Hablemos.</em>
      </p>
      <Link
        href="/contacto"
        className="whitespace-nowrap rounded-md border border-primary px-5 py-2.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background"
      >
        Escríbeme →
      </Link>
    </section>
  );
}
