import type { Metadata } from "next";
import { tx } from "gt-next/server";
import { TerminalLine } from "@/components/terminal-line";
import { ContactForm } from "@/components/contact-form";

const INFO = [
  { label: "Email", value: "hola@josht.xyz", href: "mailto:hola@josht.xyz" },
  { label: "GitHub", value: "github/JoshuaTerrones", href: "https://github.com/JoshuaTerrones" },
  { label: "LinkedIn", value: "linkedin/joshuaterrones", href: "https://linkedin.com/in/joshuaterrones" },
];

export async function generateMetadata(): Promise<Metadata> {
  const [title, desc] = await Promise.all([
    tx("Contacto — Joshua Terrones"),
    tx("Escríbeme para hablar de un proyecto, una oferta o simplemente saludar."),
  ]);
  return { title, description: desc };
}

export default async function ContactoPage() {
  const [hable, mos, desc, cmd] = await Promise.all([
    tx("Hable"), tx("mos"),
    tx("Si quieres hablar de un proyecto, una oferta o simplemente saludar."),
    tx('mail -s "Hablemos"'),
  ]);
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-3 md:pt-8 md:pb-4">
        <TerminalLine cmd={cmd} />
        <h1 className="mb-3 font-heading text-[32px] leading-[0.95] tracking-[-0.03em] md:text-[68px]">{hable}<em className="italic text-primary">{mos}</em>.</h1>
        <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">{desc}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 md:gap-12 md:py-6">
        <ContactForm />
        <div>
          {INFO.map((item) => (
            <div key={item.label} className="border-b border-dashed border-border py-3">
              <div className="mb-1 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{item.label}</div>
              <div className="font-heading text-[17px]">
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-primary hover:underline">{item.value}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
