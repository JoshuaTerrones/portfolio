import Link from "next/link";

type BlogListItemProps = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readingTime: string;
};

export function BlogListItem({
  slug,
  category,
  date,
  title,
  excerpt,
  readingTime,
}: BlogListItemProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="grid grid-cols-1 items-baseline gap-2 border-b border-border py-5 transition-all hover:pl-3 md:grid-cols-[110px_1fr_auto] md:gap-6"
    >
      <div className="flex items-baseline gap-2.5 font-[family-name:var(--font-geist-mono)] text-[10px] text-muted-foreground md:block md:gap-0 md:text-[11px]">
        <div className="uppercase text-primary">{category}</div>
        <div>{date}</div>
      </div>
      <div>
        <h3 className="font-heading text-[19px] leading-tight tracking-tight transition-colors md:text-[26px]">
          {title}
        </h3>
        <p className="mt-1 text-[13px] text-muted-foreground md:text-sm">{excerpt}</p>
      </div>
      <div className="hidden font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground md:block">
        {readingTime}
      </div>
    </Link>
  );
}
