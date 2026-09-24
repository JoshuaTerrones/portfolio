"use client";

import { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: "01", title: "Punto de partida" },
  { id: "02", title: "Referencias visuales" },
  { id: "03", title: "Paleta y tipografía" },
  { id: "04", title: "Wireframes" },
  { id: "05", title: "Stack final" },
  { id: "06", title: "Errores y aprendizajes" },
];

const ACTIVE = "04";

function Pill({ title = "04 Wireframes" }: { title?: string }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.15)]">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="font-heading text-[15px] font-semibold tracking-tight">
        josht<span className="text-primary">.</span>xyz
      </span>
      <span className="h-3 w-px bg-border" />
      <span className="font-heading text-[13px]">{title}</span>
      <span className="h-3 w-px bg-border" />
      <MenuIcon size={14} className="text-foreground" />
    </div>
  );
}

/* A — Números mono (acento si activo) + títulos Fraunces medium */
function VariantA() {
  return (
    <div className="flex flex-col gap-4">
      <Pill />
      <div className="mx-auto w-[300px] rounded-xl border border-border bg-background/95 py-2 backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]">
        {CHAPTERS.map((c) => {
          const isActive = c.id === ACTIVE;
          return (
            <button
              key={c.id}
              className={cn(
                "flex w-full items-baseline gap-3 px-5 py-2.5 text-left transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {c.id}
              </span>
              <span
                className={cn(
                  "font-heading text-[14px] leading-tight",
                  isActive ? "font-medium text-primary" : "font-normal"
                )}
              >
                {c.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* B — Números grises siempre + título con acento al activo */
function VariantB() {
  return (
    <div className="flex flex-col gap-4">
      <Pill />
      <div className="mx-auto w-[300px] rounded-xl border border-border bg-background/95 py-2 backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]">
        {CHAPTERS.map((c) => {
          const isActive = c.id === ACTIVE;
          return (
            <button
              key={c.id}
              className="flex w-full items-baseline gap-3 px-5 py-2.5 text-left transition-colors"
            >
              <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                {c.id}
              </span>
              <span
                className={cn(
                  "font-heading text-[14px] leading-tight transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* C — Dot al activo + número gris + título neutro */
function VariantC() {
  return (
    <div className="flex flex-col gap-4">
      <Pill />
      <div className="mx-auto w-[300px] rounded-xl border border-border bg-background/95 py-2 backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]">
        {CHAPTERS.map((c) => {
          const isActive = c.id === ACTIVE;
          return (
            <button
              key={c.id}
              className="flex w-full items-baseline gap-3 px-5 py-2.5 text-left transition-colors"
            >
              <span className="flex h-3 w-3 shrink-0 items-baseline">
                {isActive && (
                  <span className="mt-[3px] inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </span>
              <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                {c.id}
              </span>
              <span
                className={cn(
                  "font-heading text-[14px] leading-tight transition-colors",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8 md:px-8">
      <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-primary">
        Playground — 3 variantes del dropdown de capitulos. Abre en movil.
      </div>

      <h1 className="mb-3 font-heading text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
        Dropdown<em className="italic text-primary">.</em>
      </h1>
      <p className="mb-10 max-w-[640px] text-muted-foreground">
        Compara las 3. Fijate que el acento no debe gritar en 2 sitios a la vez.
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-widest text-primary">A</div>
          <h2 className="mb-2 font-heading text-[18px]">Números acento + título acento</h2>
          <p className="mb-4 text-xs text-muted-foreground">Al activo: número y título en acento + medium. Glass heredado.</p>
          <VariantA />
        </div>

        <div>
          <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-widest text-primary">B</div>
          <h2 className="mb-2 font-heading text-[18px]">Números grises + título acento</h2>
          <p className="mb-4 text-xs text-muted-foreground">Solo el título en acento al activo. Números siempre grises.</p>
          <VariantB />
        </div>

        <div>
          <div className="mb-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-widest text-primary">C</div>
          <h2 className="mb-2 font-heading text-[18px]">Dot de acento al activo</h2>
          <p className="mb-4 text-xs text-muted-foreground">Solo un punto de acento. Todo lo demás neutro.</p>
          <VariantC />
        </div>
      </div>
    </div>
  );
}
