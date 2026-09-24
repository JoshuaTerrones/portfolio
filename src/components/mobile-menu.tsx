"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderOpen, User, BookOpen, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/proyectos", label: "Proyectos", hint: "05 casos", icon: FolderOpen },
  { href: "/sobre-mi", label: "Sobre mí", hint: "Bio + stack", icon: User },
  { href: "/blog", label: "Blog", hint: "Devlogs", icon: BookOpen },
  { href: "/contacto", label: "Contacto", hint: "Hablemos", icon: Mail },
];

const spring = { type: "spring" as const, damping: 30, stiffness: 300 };

export type Accent = "orange" | "wine" | "blue" | "emerald" | "violet" | "rose";

function OrangeEffect() {
  return <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.75, ease: "easeOut" }}
    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />;
}
function WineEffect() {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
    className="pointer-events-none absolute inset-x-0 top-0 h-20"
    style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 18%, transparent), transparent)" }} />;
}
function BlueEffect() {
  return <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full"
    style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 45%, transparent), transparent 70%)" }} />;
}
function EmeraldEffect() {
  return (
    <>
      <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <motion.div initial={{ width: "0%" }} animate={{ width: "70%" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="absolute left-1/2 top-1 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </>
  );
}
function VioletEffect() {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
    className="pointer-events-none absolute inset-x-8 -top-6 h-12 blur-2xl"
    style={{ background: "radial-gradient(ellipse, color-mix(in srgb, var(--primary) 55%, transparent), transparent 70%)" }} />;
}
function RoseEffect() {
  return (
    <>
      <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 42%, transparent), transparent 70%)" }} />
    </>
  );
}
function Effect({ accent }: { accent: Accent }) {
  switch (accent) {
    case "orange": return <OrangeEffect />;
    case "wine": return <WineEffect />;
    case "blue": return <BlueEffect />;
    case "emerald": return <EmeraldEffect />;
    case "violet": return <VioletEffect />;
    case "rose": return <RoseEffect />;
  }
}

type MobileMenuProps = {
  open?: boolean;
  onClose?: () => void;
  accentOverride?: Accent;
  previewMode?: boolean;
};

export function MobileMenu({
  open = false,
  onClose = () => {},
  accentOverride,
  previewMode = false,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [accent, setAccent] = useState<Accent>("orange");

  useEffect(() => {
    if (accentOverride) return;
    const current = document.documentElement.getAttribute("data-accent") as Accent | null;
    if (current) setAccent(current);
    const observer = new MutationObserver(() => {
      const val = document.documentElement.getAttribute("data-accent") as Accent | null;
      if (val) setAccent(val);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] });
    return () => observer.disconnect();
  }, [accentOverride]);

  useEffect(() => {
    if (!open || previewMode) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open, previewMode]);

  const show = previewMode || open;
  const activeAccent = accentOverride ?? accent;

  return (
    <AnimatePresence>
      {show && (
        <>
          {!previewMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} onClick={onClose}
              className="fixed inset-0 z-[90] bg-foreground/5 md:hidden" />
          )}
          <motion.div
            initial={previewMode ? false : { y: "100%" }}
            animate={previewMode ? false : { y: 0 }}
            exit={previewMode ? undefined : { y: "100%" }}
            transition={spring}
            drag={previewMode ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={previewMode ? 0 : { top: 0, bottom: 0.6 }}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (!previewMode && info.offset.y > 80) onClose();
            }}
            aria-hidden={previewMode || undefined}
            className={cn(
              "overflow-hidden rounded-t-xl border border-b-0 border-primary/30 bg-background/95",
              previewMode
                ? "relative w-full shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_10%,transparent)]"
                : "fixed bottom-0 left-0 right-0 z-[95] touch-none cursor-grab shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_10%,transparent),0_-15px_40px_-20px_rgba(0,0,0,0.3)] active:cursor-grabbing md:hidden"
            )}
          >
            <Effect accent={activeAccent} />

            <div className="relative px-5 pb-4 pt-2.5">
              {/* Handle arrastrable + badge beta */}
              <div className="mb-3 flex items-center justify-center gap-2">
                <div className="h-1.5 w-12 rounded-full bg-primary/50" />
                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-wider text-primary">
                  beta · drag
                </span>
              </div>

              <nav className="flex flex-col">
                {NAV.map((item, i) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  const inner = (
                    <>
                      <span className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors",
                        "group-hover:bg-primary group-hover:text-primary-foreground"
                      )}>
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <div className="flex-1">
                        <div className={cn("font-heading text-[17px] leading-tight", active && "text-primary")}>
                          {item.label}
                        </div>
                        <div className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.hint}
                        </div>
                      </div>
                      <ArrowRight size={16} className={cn(
                        "text-primary transition-all",
                        active ? "opacity-100" : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100"
                      )} />
                    </>
                  );
                  const itemClass = cn(
                    "group flex items-center gap-4 rounded-xl px-3 py-3 transition-all",
                    !previewMode && "hover:bg-primary/10 hover:pl-5",
                    active && "bg-primary/10"
                  );
                  return (
                    <motion.div key={item.href}
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}>
                      {previewMode ? (
                        <div className={itemClass}>{inner}</div>
                      ) : (
                        <Link href={item.href} onClick={onClose} aria-current={active ? "page" : undefined} className={itemClass}>
                          {inner}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
