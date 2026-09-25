import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SOCIAL,
} from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};


const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/api/og`,
    width: 1200,
    height: 630,
  },
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
  contactPoint: {
    "@type": "ContactPoint",
    email: SOCIAL.email,
    contactType: "customer support",
    availableLanguage: ["Spanish", "English"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Joshua Terrones",
    "desarrollador full-stack",
    "backend developer",
    "Python",
    "Django",
    "Next.js",
    "TypeScript",
    "Docker",
    "PostgreSQL",
    "Sanity CMS",
    "Lima Perú",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: `${SITE_URL}/es`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/es`,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "es_PE",
    alternateLocale: ["en_US"],
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  category: "technology",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Desarrollador de Software Full-Stack",
  worksFor: { "@type": "Organization", name: "Freelance" },
  description: SITE_DESCRIPTION,
  knowsAbout: [
    "Python",
    "Django",
    "TypeScript",
    "Next.js",
    "React",
    "Docker",
    "PostgreSQL",
    "Sanity CMS",
    "REST APIs",
    "CI/CD",
  ],
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
  email: SOCIAL.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: ["es", "en"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
                <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname;var l=p==="/en"||p.startsWith("/en/")?"en":"es";if(document.documentElement.lang!==l)document.documentElement.lang=l;}catch(e){}})();`,
          }}
        />
        <JsonLd data={[personSchema, websiteSchema, organizationSchema]} />
        {children}
      </body>
    </html>
  );
}
