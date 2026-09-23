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
    <aside className="sticky top-24 border-b border-border pb-3 md:border-0 md:pb-0">
      <ul className="flex flex-wrap gap-3 md:block">
        {chapters.map((c) => {
          const active = activeId === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className={`block border-b-2 border-transparent pb-1 font-[family-name:var(--font-geist-mono)] text-[13px] transition-colors md:border-b-0 md:border-l-2 md:pb-0 md:pl-3 ${
                  active
                    ? "border-primary text-primary md:border-l-primary"
                    : "text-muted-foreground hover:text-primary"
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
