import type { Metadata } from "next";
import { TerminalLine } from "@/components/terminal-line";
import { ContactForm } from "@/components/contact-form";

const INFO = [
  {
    label: "Email",
    value: "hola@josht.xyz",
    href: "mailto:hola@josht.xyz",
  },
  {
    label: "GitHub",
    value: "github/JoshuaTerrones",
    href: "https://github.com/JoshuaTerrones",
  },
  {
    label: "LinkedIn",
    value: "linkedin/joshuaterrones",
    href: "https://linkedin.com/in/joshuaterrones",
  },
];

export const metadata: Metadata = {
  title: "Contacto — Joshua Terrones",
  description: "Escríbeme para hablar de un proyecto, una oferta o simplemente saludar.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-3 md:pt-8 md:pb-4">
        <TerminalLine cmd='mail -s "Hablemos"' />

        <h1 className="mb-3 font-heading text-[32px] leading-[0.95] tracking-[-0.03em] md:text-[68px]">
          Hable<em className="italic text-primary">mos</em>.
        </h1>
        <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">
          Si quieres hablar de un proyecto, una oferta o simplemente saludar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 md:gap-12 md:py-6">
        <ContactForm />

        <div>
          {INFO.map((item) => (
            <div key={item.label} className="border-b border-dashed border-border py-3">
              <div className="mb-1 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {item.label}
              </div>
              <div className="font-heading text-[17px]">
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-primary hover:underline"
                >
                  {item.value}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
