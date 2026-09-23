import Link from "next/link";

export function MiniAbout() {
  return (
    <section className="mt-6 md:mt-8">
      <h2 className="max-w-[900px] font-heading text-[20px] leading-tight tracking-tight md:text-[28px]">
        Hola, soy Joshua. Construyo <em className="italic text-primary">software</em> de principio a
        fin, desde el modelo de datos hasta el deploy.
      </h2>
      <p className="mt-2 max-w-[780px] text-[14px] text-muted-foreground md:mt-3 md:text-[15px]">
        Elijo la tecnología según el problema, no al revés. Trabajo con Python, Django, TypeScript y
        Next.js.
      </p>
      <Link
        href="/sobre-mi"
        className="mt-2.5 inline-flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] text-xs text-primary transition-all hover:gap-2.5 md:mt-3"
      >
        Conoce más sobre mí →
      </Link>
    </section>
  );
}
