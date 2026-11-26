import Link from "next/link";

export function MiniAbout() {
  return (
    <section className="py-4 md:py-6">
      <p className="max-w-[620px] text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
        Ingeniero de Sistemas egresado de la UTP. Construyo aplicaciones web completas donde el
        backend y el frontend se conectan. Me importa el código claro, los despliegues automatizados
        con Docker y que las decisiones técnicas resuelvan el problema real.{" "}
        <Link href="/sobre-mi" className="text-primary hover:underline">
          Conoce más sobre mí →
        </Link>
      </p>
    </section>
  );
}
