"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/mobile-menu";

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
    <>
      <header className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
        <div className="flex items-center justify-between border-b border-border py-4 md:py-[18px]">
          <Link href="/" className="flex items-center font-heading text-[22px] font-semibold tracking-tight">
            <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-primary animate-[dot-glow_2.5s_ease-in-out_infinite]" />
            <span className="text-foreground">josht<span className="text-primary">.</span>xyz</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="flex items-center justify-center rounded-md border border-border p-2 text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            <MenuIcon size={20} strokeWidth={1.75} />
          </button>

          <nav className="hidden md:flex md:items-center md:gap-[26px]">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm transition-colors",
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                    active ? "text-primary after:w-full" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
