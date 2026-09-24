"use client";

import { useEffect, useState } from "react";

type Chapter = {
  id: string;
  label: string;
};

type ProcesoSidebarProps = {
  chapters: Chapter[];
};

export function ProcesoSidebar({ chapters }: ProcesoSidebarProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportH >= docHeight - 80) {
        setActiveId(chapters[chapters.length - 1].id);
        return;
      }

      const threshold = scrollY + viewportH * 0.35;
      let current = chapters[0].id;
      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= threshold) current = ch.id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  return (
    <aside className="hidden md:sticky md:top-24 md:block md:self-start">
      <ul className="block">
        {chapters.map((c) => {
          const active = activeId === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className={`block border-l-2 py-1.5 pl-3 font-[family-name:var(--font-geist-mono)] text-[13px] transition-colors ${
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                {c.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
