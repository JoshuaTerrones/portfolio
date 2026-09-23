"use client";

import { useEffect, useRef } from "react";

export function ContribGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    for (let i = 0; i < 26 * 7; i++) {
      const c = document.createElement("div");
      c.className = "aspect-square rounded-[2px]";
      const r = Math.random();
      if (r > 0.85) c.style.background = "var(--accent)";
      else if (r > 0.65)
        c.style.background = "color-mix(in srgb, var(--accent) 60%, var(--border))";
      else if (r > 0.45)
        c.style.background = "color-mix(in srgb, var(--accent) 30%, var(--border))";
      else c.style.background = "var(--border)";
      el.appendChild(c);
    }
  }, []);

  return <div ref={ref} className="mt-4 grid grid-cols-[repeat(26,1fr)] gap-[3px]" />;
}
