import Link from "next/link";
import { tx } from "gt-next/server";
import { TerminalLine } from "@/components/terminal-line";

export default async function NotFound() {
  const [h, p1, p2, p3, btn] = await Promise.all([
    tx("Esta página no existe."),
    tx("Quizás el enlace está mal, o la página ya no está."),
    tx("— o nunca existió, quién sabe."),
    tx("Volver al inicio"),
    tx("← Volver al inicio"),
  ]);
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="flex min-h-[55vh] flex-col items-center justify-center py-10 text-center">
        <TerminalLine cmd="cat 404.md" error />
        <div className="mb-4 font-heading text-[80px] italic leading-[0.9] text-primary md:text-[160px]">404</div>
        <h2 className="mb-3 font-heading text-[22px] md:text-[28px]">{h}</h2>
        <p className="mb-6 max-w-[480px] text-muted-foreground">{p1}<br />{p2}</p>
        <Link href="/" className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">{btn}</Link>
      </div>
    </div>
  );
}
