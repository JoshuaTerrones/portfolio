"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="relative flex items-center justify-between border-b border-border py-4 md:py-[18px]">
        <Link
          href="/"
          className="flex items-center font-heading text-[22px] font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="mr-2 inline-block h-2 w-2 rounded-full bg-primary animate-[dot-glow_2.5s_ease-in-out_infinite]"
          />
          <span className="text-foreground">
            josht<span className="text-primary">.</span>xyz
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
          className="rounded-md border border-border p-1.5 text-foreground md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M3 5h14M3 10h14M3 15h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <nav
          className={cn(
            "absolute right-0 top-full z-50 mt-2 min-w-[180px] flex-col rounded-lg border border-border bg-background py-1.5 shadow-lg",
            "md:static md:mt-0 md:flex md:min-w-0 md:flex-row md:items-center md:gap-[26px] md:border-0 md:bg-transparent md:py-0 md:shadow-none",
            open ? "flex" : "hidden"
          )}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "relative w-full px-4 py-2.5 text-[15px] transition-colors md:w-auto md:px-0 md:py-0 md:text-sm",
                  "after:absolute after:bottom-0 after:left-4 after:h-px after:w-0 after:bg-primary after:transition-all md:after:-bottom-1 md:after:left-0",
                  "hover:after:w-[calc(100%-2rem)] md:hover:after:w-full",
                  active ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="mt-1 border-t border-border px-4 py-3 font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground md:mt-0 md:border-0 md:p-0">
            <span className="text-foreground">ES</span> / EN
          </span>
        </nav>
      </div>
    </header>
  );
}
