"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="nombre"
          className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          className="border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          className="border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="mensaje"
          className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          placeholder="¿De qué quieres hablar?"
          className="min-h-[120px] resize-none border-0 border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="self-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:self-start"
      >
        {submitted ? "Enviado ✓" : "Enviar mensaje →"}
      </button>
    </form>
  );
}
