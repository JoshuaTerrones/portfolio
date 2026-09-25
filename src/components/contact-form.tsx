"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

const LABELS = {
  es: {
    nombre: "Nombre",
    tuNombre: "Tu nombre",
    tuEmail: "tu@email.com",
    mensaje: "Mensaje",
    deQue: "¿De qué quieres hablar?",
    enviar: "Enviar mensaje →",
    enviando: "Enviando...",
    enviado: "Enviado ✓",
    reintentar: "Reintentar",
    errEnvio: "Error al enviar el mensaje",
    errConex: "Error de conexión. Intenta de nuevo.",
  },
  en: {
    nombre: "Name",
    tuNombre: "Your name",
    tuEmail: "your@email.com",
    mensaje: "Message",
    deQue: "What would you like to talk about?",
    enviar: "Send message →",
    enviando: "Sending...",
    enviado: "Sent ✓",
    reintentar: "Retry",
    errEnvio: "Error sending the message",
    errConex: "Connection error. Try again.",
  },
} as const;

export function ContactForm() {
  const pathname = usePathname();
  const locale = (pathname.split("/")[1] === "en" ? "en" : "es") as "es" | "en";
  const t = LABELS[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) { setError(json.error || t.errEnvio); setStatus("error"); return; }
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setError(t.errConex);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{t.nombre}</label>
        <input id="nombre" name="nombre" type="text" required placeholder={t.tuNombre} className="border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Email</label>
        <input id="email" name="email" type="email" required placeholder={t.tuEmail} className="border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{t.mensaje}</label>
        <textarea id="mensaje" name="mensaje" rows={5} required placeholder={t.deQue} className="min-h-[120px] resize-none border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button type="submit" disabled={status === "loading" || status === "success"} className="self-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 md:self-start">
        {status === "loading" && t.enviando}
        {status === "success" && t.enviado}
        {status === "error" && t.reintentar}
        {status === "idle" && t.enviar}
      </button>
    </form>
  );
}
