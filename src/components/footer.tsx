import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-2 px-6 py-5 text-center font-[family-name:var(--font-geist-mono)] md:py-8 text-xs text-muted-foreground md:px-8">
      <div>© {new Date().getFullYear()} — Joshua E. Terrones</div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <Link href="/proceso" className="hover:text-primary">
          ¿Cómo se hizo esto?
        </Link>
        <a
          href="https://github.com/JoshuaTerrones"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/joshuaterrones"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          LinkedIn
        </a>
        <a href="mailto:terronesjoshua@icloud.com" className="hover:text-primary">
          terronesjoshua@icloud.com
        </a>
      </div>
    </footer>
  );
}
