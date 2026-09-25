import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { GTProvider } from "gt-next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundShapes } from "@/components/background-shapes";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  return (
    <GTProvider locale={locale}>
      <div className={cn("h-full antialiased", fraunces.variable, geistSans.variable, geistMono.variable, "font-sans")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundShapes />
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
            Saltar al contenido
          </a>
          <script dangerouslySetInnerHTML={{ __html: accentRotationScript }} />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </div>
      <Analytics />
      <SpeedInsights />
    </GTProvider>
  );
}
