import Link from "next/link";

const PROJECTS = [
  {
    num: "01",
    title: "Bookify",
    description: "Sistema de gestión de biblioteca full-stack.",
    tags: ["Django", "Next.js"],
  },
  {
    num: "02",
    title: "Criterio Arquitectónico",
    description: "Portafolio web para despacho de arquitectura.",
    tags: ["HTML"],
  },
  {
    num: "03",
    title: "Mister Hood's",
    description: "Sitio web para empresa de limpieza.",
    tags: ["HTML"],
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-6">
      <div className="mb-4 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
        <span className="text-primary">— </span>Proyectos destacados
      </div>

      {PROJECTS.map((p) => (
        <Link
          key={p.num}
          href={`/proyectos/${p.num}`}
          className="grid grid-cols-[50px_1fr] items-baseline gap-4 border-b border-border py-5 transition-all hover:pl-3 md:grid-cols-[110px_1fr_auto] md:gap-6"
        >
          <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
            {p.num}
          </div>
          <div>
            <h3 className="font-heading text-[20px] leading-tight tracking-tight transition-colors md:text-[26px]">
              {p.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
          </div>
          <div className="hidden flex-wrap justify-end gap-1.5 md:flex">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Link>
      ))}

      <div className="pt-5">
        <Link
          href="/proyectos"
          className="inline-block rounded-md border border-primary px-5 py-2.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-primary transition-colors hover:bg-primary hover:text-background"
        >
          Ver todos los proyectos →
        </Link>
      </div>
    </section>
  );
}
