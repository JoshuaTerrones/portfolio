import Link from "next/link";

export function MiniAbout() {
  return (
    <section className="py-4 md:py-6">
      <p className="max-w-[620px] text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
        Llevo años construyendo productos donde el backend y el frontend se
        encuentran. Me importa el código que se entiende, los deploys que no
        duelen y las decisiones técnicas que aguantan el tiempo.{" "}
        <Link href="/sobre-mi" className="text-primary hover:underline">
          Conoce más sobre mí →
        </Link>
      </p>
    </section>
  );
}
