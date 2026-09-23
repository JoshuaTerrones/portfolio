import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua Terrones — Desarrollador de Software",
  description:
    "Portafolio de Joshua Terrones, desarrollador backend y full-stack. Python, Django, TypeScript, Next.js, Docker y PostgreSQL.",
  authors: [{ name: "Joshua Terrones" }],
  creator: "Joshua Terrones",
  metadataBase: new URL("https://josht.xyz"),
};

const accentRotationScript = `
(function () {
  function getISOWeek(d) {
    var date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  }
  var accents = ["orange", "wine", "blue", "emerald", "violet", "rose"];
  var week = getISOWeek(new Date());
  var accent = accents[(week - 1) % 6];
  document.documentElement.setAttribute("data-accent", accent);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-accent="orange"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: accentRotationScript }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}