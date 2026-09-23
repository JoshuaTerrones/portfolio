import Link from "next/link";
import { TerminalLine } from "@/components/terminal-line";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="flex min-h-[55vh] flex-col items-center justify-center py-10 text-center">
        <TerminalLine cmd="cat 404.md" error />

        <div className="mb-4 font-heading text-[80px] italic leading-[0.9] text-primary md:text-[160px]">
          404
        </div>

        <h2 className="mb-3 font-heading text-[22px] md:text-[28px]">Esta página no existe.</h2>

        <p className="mb-6 max-w-[480px] text-muted-foreground">
          Quizás el enlace está mal, o la página ya no está.
          <br />— o nunca existió, quién sabe.
        </p>

        <Link
          href="/"
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
