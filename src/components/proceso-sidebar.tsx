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
    const observers: IntersectionObserver[] = [];

    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [chapters]);

  return (
    <aside className="border-b border-border pb-3 md:sticky md:top-24 md:border-0 md:pb-0">
      <ul className="block">
        {chapters.map((c) => {
          const active = activeId === c.id;
          return (
            <li key={c.id} className="border-b border-border last:border-0 md:border-0">
              <a
                href={`#${c.id}`}
                className={`block border-l-2 py-2.5 pl-3 pr-2 font-[family-name:var(--font-geist-mono)] text-[13px] transition-colors md:py-1.5 ${
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
