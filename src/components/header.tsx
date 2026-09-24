"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Histéresis: entra a pill a los 80px, vuelve a normal por debajo de 20px.
    // Evita flip-flop cuando el scroll oscila alrededor del umbral.
    const ENTER = 50;
    const EXIT = 10;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > ENTER) return true;
        if (prev && y < EXIT) return false;
        return prev;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Wrapper sticky full width, siempre visible */}
      <div className="sticky top-3 z-40 w-full px-4 md:px-6">
        {/* Marco interno: cambia de ancho segun estado */}
        <div
          className={cn(
            "mx-auto flex items-center transition-all duration-500 ease-out will-change-[width,padding,background-color,border-radius]",
            scrolled
              ? "w-fit gap-2.5 rounded-full border border-border bg-background/90 px-4 py-1.5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "w-full max-w-[1080px] gap-0 rounded-none border-b border-border bg-transparent px-0 py-4 md:py-[18px] shadow-none"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center font-heading font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className={cn(
                "inline-block rounded-full bg-primary transition-all duration-500",
                scrolled
                  ? "mr-2 h-1.5 w-1.5 animate-none"
                  : "mr-2.5 h-2 w-2 animate-[dot-glow_2.5s_ease-in-out_infinite]"
              )}
            />
            <span
              className={cn(
                "text-foreground transition-all duration-500",
                scrolled ? "text-[15px]" : "text-[22px]"
              )}
            >
              josht<span className="text-primary">.</span>xyz
            </span>
          </Link>

          {/* Tag "menu" */}
          <span
            className={cn(
              "hidden font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500 md:inline",
              scrolled ? "ml-1 max-w-[60px] opacity-100" : "ml-0 max-w-0 overflow-hidden opacity-0"
            )}
          >
            menu
          </span>

          {/* Desktop nav */}
          <nav
            className={cn(
              "hidden items-center transition-all duration-500 md:flex",
              scrolled
                ? "ml-2 gap-4 border-l border-border pl-4"
                : "ml-auto gap-[26px] border-l-0 pl-0"
            )}
          >
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative transition-all duration-500",
                    scrolled ? "text-[12px]" : "text-sm",
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                    active ? "text-primary after:w-full" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburguesa movil */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className={cn(
              "flex shrink-0 items-center justify-center text-foreground transition-all duration-500 hover:text-primary md:hidden",
              scrolled
                ? "ml-1 border-l border-border pl-2.5"
                : "ml-auto rounded-md border border-border p-2"
            )}
          >
            <MenuIcon
              size={scrolled ? 16 : 20}
              strokeWidth={1.75}
              className="transition-all duration-500"
            />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
