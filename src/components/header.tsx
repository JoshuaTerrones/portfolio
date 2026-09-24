"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MenuProvider, useMenu } from "@/components/menu-context";
import { MobileMenu } from "@/components/mobile-menu";
import { CHAPTERS } from "@/lib/proceso";

const NAV_ITEMS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const EASE = [0.33, 1, 0.68, 1] as const;
const DUR = 0.4;

function HeaderInner() {
  const pathname = usePathname();
  const { openMenu } = useMenu();
  const [scrolled, setScrolled] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  const isProceso = pathname === "/proceso";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener("change", update);
    const raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const ENTER = 40;
    const EXIT = 20;
    const LOCK_MS = 440;
    let ticking = false;
    let wasScrolled = false;
    let lockedUntil = 0;

    const update = () => {
      const y = window.scrollY;
      const now = performance.now();
      if (now < lockedUntil) {
        ticking = false;
        return;
      }
      let next = wasScrolled;
      if (!wasScrolled && y > ENTER) next = true;
      else if (wasScrolled && y < EXIT) next = false;
      if (next !== wasScrolled) {
        wasScrolled = next;
        lockedUntil = now + LOCK_MS;
        setScrolled(next);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isProceso) return;
    let ticking = false;
    let currentId = "";
    const update = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      let next = currentId;
      if (scrollY + viewportH >= docHeight - 80) {
        next = CHAPTERS[CHAPTERS.length - 1].id;
      } else {
        const threshold = scrollY + viewportH * 0.35;
        next = CHAPTERS[0].id;
        for (const ch of CHAPTERS) {
          const el = document.getElementById(ch.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + scrollY;
          if (top <= threshold) next = ch.id;
        }
      }
      if (next !== currentId) {
        currentId = next;
        setActiveChapter(next);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isProceso]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChaptersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jumpToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setChaptersOpen(false);
  };

  const activeChapterData = CHAPTERS.find((c) => c.id === activeChapter);
  const showChapter = isProceso && isMobile && !!activeChapterData;

  return (
    <>
      <div className="sticky top-0 z-40 w-full">
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mx-auto h-px max-w-[1080px] bg-border"
        />

        <motion.div
          layoutRoot
          className="flex h-[72px] w-full items-center justify-center px-4 md:px-6"
        >
          {/* === CONTENEDOR MORPH REAL — motion layout === */}
          <motion.div
            layout
            transition={{ layout: { duration: DUR, ease: EASE } }}
            style={{ willChange: "transform" }}
            className={cn(
              "flex items-center overflow-hidden [contain:layout_paint] [transform:translateZ(0)]",
              scrolled
                ? "w-fit gap-2.5 rounded-full bg-background/95 px-4 py-2 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.15)]"
                : "w-full max-w-[1080px] justify-between py-4"
            )}
          >
            {/* Logo — fontSize animado con Motion, misma duración */}
            <Link
              href="/"
              className="flex shrink-0 items-center font-heading font-semibold tracking-tight"
            >
              <motion.span
                aria-hidden
                animate={{
                  width: scrolled ? 6 : 8,
                  height: scrolled ? 6 : 8,
                  marginRight: scrolled ? 8 : 10,
                }}
                transition={{ duration: DUR, ease: EASE }}
                className="inline-block rounded-full bg-primary"
              />
              <motion.span
                animate={{ fontSize: scrolled ? "15px" : "22px" }}
                transition={{ duration: DUR, ease: EASE }}
                className="whitespace-nowrap text-foreground"
                style={{ lineHeight: 1 }}
              >
                josht<span className="text-primary">.</span>xyz
              </motion.span>
            </Link>

            {/* Capítulo activo (solo /proceso móvil + scrolled) */}
            <AnimatePresence>
              {showChapter && activeChapterData && scrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.24, ease: EASE }}
                  className="flex shrink-0 items-center gap-2 overflow-hidden"
                >
                  <span className="h-3 w-px shrink-0 bg-border" />
                  <button
                    type="button"
                    onClick={() => setChaptersOpen(!chaptersOpen)}
                    aria-label="Elegir capítulo"
                    aria-expanded={chaptersOpen}
                    className="flex min-w-0 items-baseline gap-2"
                  >
                    <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                      {activeChapterData.id.split("-")[0]}
                    </span>
                    <span className="max-w-[130px] truncate font-heading text-[13px] text-foreground">
                      {activeChapterData.title.replace(/^\d+\s*—\s*/, "")}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav desktop — fontSize animado con Motion */}
            <nav
              className={cn(
                "hidden items-center md:flex",
                scrolled ? "gap-4 border-l border-border pl-3" : "gap-[26px]"
              )}
            >
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap transition-colors",
                      "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                      active ? "text-primary after:w-full" : "text-foreground"
                    )}
                  >
                    <motion.span
                      animate={{ fontSize: scrolled ? "12px" : "14px" }}
                      transition={{ duration: DUR, ease: EASE }}
                      className="block"
                      style={{ lineHeight: 1 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                );
              })}
            </nav>

            {/* Hamburguesa — tamaño animado con Motion */}
            <button
              type="button"
              onClick={openMenu}
              aria-label="Abrir menú"
              className={cn(
                "flex shrink-0 items-center justify-center text-foreground transition-colors hover:text-primary md:hidden",
                scrolled
                  ? "border-l border-border pl-3"
                  : "rounded-md border border-border p-2"
              )}
            >
              <motion.span
                animate={{
                  width: scrolled ? 16 : 20,
                  height: scrolled ? 16 : 20,
                }}
                transition={{ duration: DUR, ease: EASE }}
                className="flex items-center justify-center"
              >
                <MenuIcon
                  size={20}
                  strokeWidth={1.75}
                  style={{ width: "100%", height: "100%" }}
                />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {chaptersOpen && showChapter && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setChaptersOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="fixed left-1/2 top-[80px] z-50 w-[min(300px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card py-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]"
            >
              {CHAPTERS.map((c) => {
                const isActive = activeChapter === c.id;
                const num = c.id.split("-")[0];
                const label = c.title.replace(/^\d+\s*—\s*/, "");
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => jumpToChapter(c.id)}
                    className="flex w-full items-baseline gap-3 px-5 py-2.5 text-left transition-colors"
                  >
                    <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                      {num}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-[14px] leading-tight transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileMenu />
    </>
  );
}

export function Header() {
  return (
    <MenuProvider>
      <HeaderInner />
    </MenuProvider>
  );
}
