import Link from "next/link";

type ProjectListItemProps = {
  num: string;
  title: string;
  description: string;
  tags: string[];
};

export function ProjectListItem({ num, title, description, tags }: ProjectListItemProps) {
  return (
    <Link
      href={`/proyectos/${num}`}
      className="grid grid-cols-[50px_1fr] items-baseline gap-4 border-b border-border py-5 transition-all hover:pl-3 md:grid-cols-[110px_1fr_auto] md:gap-6"
    >
      <div className="font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
        {num}
      </div>
      <div>
        <h3 className="font-heading text-[20px] leading-tight tracking-tight transition-colors md:text-[26px]">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="hidden flex-wrap justify-end gap-1.5 md:flex">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded border border-border px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
