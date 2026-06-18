// app/page.tsx
"use client";

import { useEffect, useState } from "react";

const content = {
    en: {
        pill: "under construction",
        title: { line1: "Something new", line2: "is ", accent: "coming" },
        subtitle: "My portfolio is on its way — check back soon.",
    },
    es: {
        pill: "en construcción",
        title: { line1: "Algo nuevo", line2: "está ", accent: "llegando" },
        subtitle: "Mi portfolio está en camino — vuelve pronto.",
    },
};

type Lang = "en" | "es";

export default function Home() {
    const [lang, setLang] = useState<Lang>("es");

    useEffect(() => {
        const browserLang = navigator.language.startsWith("es") ? "es" : "en";
        setLang(browserLang);
    }, []);

    const t = content[lang];

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-8 py-16 font-sans">

            {/* Grid background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,255,209,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,209,0.04) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glow orb */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0,255,209,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Language toggle */}
            <div className="absolute right-6 top-6 flex items-center gap-1 rounded-full p-1" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                {(["es", "en"] as Lang[]).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors"
                        style={{
                            background: lang === l ? "rgba(0,255,209,0.12)" : "transparent",
                            color: lang === l ? "#00ffd1" : "rgba(255,255,255,0.3)",
                        }}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {/* Pill */}
            <span
                className="relative mb-6 flex items-center gap-2 rounded-full px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#00ffd1]"
                style={{
                    background: "rgba(0,255,209,0.08)",
                    border: "0.5px solid rgba(0,255,209,0.3)",
                }}
            >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ffd1]" />
                {t.pill}
      </span>

            {/* Title */}
            <h1 className="relative mb-2 text-center text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                {t.title.line1}<br />
                {t.title.line2}<span className="text-[#00ffd1]">{t.title.accent}</span>
            </h1>

            {/* Subtitle */}
            <p className="relative mb-8 text-center text-[15px] text-white/40">
                {t.subtitle}
            </p>

            {/* Domain */}
            <div
                className="relative w-full max-w-xs text-center text-[13px] tracking-wide text-white/25"
                style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}
            >
                <strong className="font-medium text-[#00ffd1]/50">josht.xyz</strong>
            </div>
        </main>
    );
}