import Link from "next/link";
import { tx } from "gt-next/server";

export async function MiniContact() {
  const [a, b, c] = await Promise.all([
    tx("¿Tienes un proyecto en mente?"), tx("Hablemos."), tx("Escríbeme →"),
  ]);
  return (
    <section className="flex flex-col items-center justify-between gap-3 py-3 text-center md:flex-row md:items-center md:gap-5 md:text-left">
      <p className="max-w-[500px] font-heading text-[18px] leading-tight md:text-[22px]">
        {a} <em className="italic text-primary">{b}</em>
      </p>
      <Link href="/contacto" className="whitespace-nowrap rounded-md border border-primary px-5 py-2.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background">{c}</Link>
    </section>
  );
}
