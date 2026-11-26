import Link from "next/link";

export function MiniContact() {
  return (
    <section className="border-t border-border py-8 md:py-10">
      <h2 className="mb-3 font-heading text-[24px] md:text-[28px]">
        ¿Buscas un desarrollador para tu equipo?
      </h2>
      <p className="mb-5 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
        Escríbeme y hablemos sobre cómo puedo aportar a tu equipo.
      </p>
      <Link
        href="/contacto"
        className="inline-block rounded-md bg-primary px-6 py-3 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary-foreground transition-opacity hover:opacity-90"
      >
        Hablemos →
      </Link>
    </section>
  );
}
