"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/mobile-menu";
import { CHAPTERS } from "@/lib/proceso";

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
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>(CHAPTERS[0]?.id ?? "");
  const [isMobile, setIsMobile] = useState(false);

  const isProceso = pathname === "/proceso";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Scroll pill con histeresis */
  useEffect(() => {
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

  /* Scroll spy de capitulos — solo /proceso */
  useEffect(() => {
    if (!isProceso) return;

    const update = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportH >= docHeight - 80) {
        setActiveChapter(CHAPTERS[CHAPTERS.length - 1].id);
        return;
      }

      const threshold = scrollY + viewportH * 0.35;
      let current = CHAPTERS[0].id;
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= threshold) current = ch.id;
      }
      setActiveChapter(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isProceso]);

  useEffect(() => { setChaptersOpen(false); }, [pathname]);

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
  const showChapter = isProceso && scrolled && isMobile && !!activeChapterData;

  return (
    <>
      {/* Wrapper sticky */}
      <div className="sticky top-3 z-40 flex w-full justify-center px-4 md:px-6">
        {/* Pill con motion layout — animación fluida entre estados */}
        <motion.div
          layout
          transition={{
            layout: {
              type: "spring",
              damping: 30,
              stiffness: 260,
              mass: 0.8,
            },
            default: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
          }}
          className={cn(
            "flex items-center",
            scrolled
              ? "gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.15)]"
              : "w-full max-w-[1080px] gap-0 rounded-none border-b border-border bg-transparent px-0 py-4 md:py-[18px]"
          )}
        >
          <motion.div layout="position" transition={{ duration: 0.3 }}>
            <Link
              href="/"
              className="flex shrink-0 items-center font-heading font-semibold tracking-tight"
            >
              <span
                aria-hidden
                className={cn(
                  "inline-block rounded-full bg-primary transition-all duration-300",
                  scrolled
                    ? "mr-2 h-1.5 w-1.5"
                    : "mr-2.5 h-2 w-2 animate-[dot-glow_2.5s_ease-in-out_infinite]"
                )}
              />
              <span
                className={cn(
                  "text-foreground transition-all duration-300",
                  scrolled ? "text-[15px]" : "text-[22px]"
                )}
              >
                josht<span className="text-primary">.</span>xyz
              </span>
            </Link>
          </motion.div>

          {showChapter && activeChapterData && (
            <motion.div
              layout="position"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex items-center gap-2"
            >
              <span className="h-3 w-px bg-border" />
              <button
                type="button"
                onClick={() => setChaptersOpen(!chaptersOpen)}
                aria-label="Elegir capitulo"
                aria-expanded={chaptersOpen}
                className="flex min-w-0 items-baseline gap-2 px-1 transition-colors"
              >
                <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                  {activeChapterData.id.split("-")[0]}
                </span>
                <span className="max-w-[160px] truncate font-heading text-[13px] text-foreground sm:max-w-[200px]">
                  {activeChapterData.title.replace(/^\d+\s*—\s*/, "")}
                </span>
              </button>
            </motion.div>
          )}

          <motion.nav
            layout="position"
            transition={{ duration: 0.3 }}
            className={cn(
              "hidden items-center md:flex",
              scrolled ? "gap-4 border-l border-border pl-3" : "ml-auto gap-[26px]"
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
                    "relative transition-all duration-300",
                    scrolled ? "text-[12px]" : "text-sm",
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                    active ? "text-primary after:w-full" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>

          <motion.button
            layout="position"
            transition={{ duration: 0.3 }}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className={cn(
              "flex shrink-0 items-center justify-center text-foreground transition-all duration-300 hover:text-primary md:hidden",
              scrolled ? "border-l border-border pl-3" : "ml-auto rounded-md border border-border p-2"
            )}
          >
            <MenuIcon
              size={scrolled ? 16 : 20}
              strokeWidth={1.75}
              className="transition-all duration-300"
            />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {chaptersOpen && showChapter && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setChaptersOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              className="fixed left-1/2 top-[68px] z-50 w-[min(300px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background/95 py-1.5 backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]"
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

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
