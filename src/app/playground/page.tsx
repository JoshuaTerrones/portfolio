import type { CSSProperties } from "react";
import { MobileMenu } from "@/components/mobile-menu";
import type { Accent } from "@/components/mobile-menu";

const COLORS: { id: Accent; l: string; d: string }[] = [
  { id: "orange", l: "#C2410C", d: "#F97316" },
  { id: "wine", l: "#8B2F2F", d: "#E85D5D" },
  { id: "blue", l: "#1E3A8A", d: "#60A5FA" },
  { id: "emerald", l: "#047857", d: "#34D399" },
  { id: "violet", l: "#6D28D9", d: "#A78BFA" },
  { id: "rose", l: "#BE185D", d: "#F472B6" },
];

function Wrapper({ color, draggable }: { color: typeof COLORS[0]; draggable: boolean }) {
  return (
    <div
      style={{
        "--accent-l": color.l,
        "--accent-d": color.d,
        "--primary": color.l,
        "--accent": color.l,
        "--ring": color.l,
      } as CSSProperties}
    >
      <MobileMenu previewMode accentOverride={color.id} draggable={draggable} />
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8 md:px-8">
      <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
        Playground local — 2 versiones: handle no funcional vs handle arrastrable.
      </div>

      <h1 className="mb-3 font-heading text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
        Mobile menu<em className="italic text-primary">.</em>
      </h1>
      <p className="mb-10 max-w-[640px] text-muted-foreground">
        Limpieza aplicada: sin logo repetido, sin footer interno, solo X arriba. Dos variantes del handle.
      </p>

      <section className="mb-16">
        <div className="mb-6 flex items-baseline gap-4">
          <h2 className="font-heading text-[28px]">A — Handle NO funcional</h2>
          <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-widest text-muted-foreground">
            Solo decorativo. Cierras con X o tap fuera.
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {COLORS.map((c) => (
            <div key={c.id}>
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c.l }} />
                <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-wider text-muted-foreground">{c.id}</span>
              </div>
              <Wrapper color={c} draggable={false} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-baseline gap-4">
          <h2 className="font-heading text-[28px]">B — Handle SÍ funcional</h2>
          <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-widest text-muted-foreground">
            Arrastra hacia abajo. Si pasa 100px, se cierra.
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {COLORS.map((c) => (
            <div key={c.id}>
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c.l }} />
                <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-wider text-muted-foreground">{c.id}</span>
              </div>
              <Wrapper color={c} draggable={true} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
