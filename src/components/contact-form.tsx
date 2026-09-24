"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Error al enviar el mensaje");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder="Tu nombre"
          className="border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          placeholder="¿De qué quieres hablar?"
          className="min-h-[120px] resize-none border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="self-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 md:self-start"
      >
        {status === "loading" && "Enviando..."}
        {status === "success" && "Enviado ✓"}
        {status === "error" && "Reintentar"}
        {status === "idle" && "Enviar mensaje →"}
      </button>
    </form>
  );
}
