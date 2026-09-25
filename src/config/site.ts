export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://josht.xyz";

export const SITE_NAME = "Joshua Terrones";
export const SITE_TITLE = "Joshua Terrones — Desarrollador de Software";
export const SITE_DESCRIPTION =
  "Portafolio de Joshua Terrones, desarrollador backend y full-stack. Python, Django, TypeScript, Next.js, Docker y PostgreSQL.";

export const SOCIAL = {
  github: "https://github.com/JoshuaTerrones",
  linkedin: "https://linkedin.com/in/joshuaterrones",
  email: "hola@josht.xyz",
};

export const DEFAULT_LOCALE = "es";
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
