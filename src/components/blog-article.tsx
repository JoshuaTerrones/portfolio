import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getAdjacentPosts } from "@/lib/posts";

type BlogArticleProps = {
  post: Post;
};

export function BlogArticle({ post }: BlogArticleProps) {
  const { prev, next } = getAdjacentPosts(post.slug);

  return (
    <article className="mx-auto max-w-[700px] pb-12 pt-6 md:pb-16 md:pt-8">
      <Link
        href="/blog"
        className="mb-6 inline-block font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        ← Volver al Blog
      </Link>

      <div className="mb-5 flex flex-wrap items-center gap-3 font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
        <span className="uppercase text-primary">{post.category}</span>
        <span>·</span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime} lectura</span>
      </div>

      <h1 className="mb-7 font-heading text-[26px] leading-[1.05] tracking-[-0.03em] md:text-[48px]">
        {post.title}
      </h1>

      <div className="font-heading text-[16px] font-light leading-[1.7] md:text-[18px]">
        {post.content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="mb-4 mt-8 font-heading text-[22px] font-normal md:text-[26px]">
                {block.text}
              </h2>
            );
          }
          if (block.type === "code") {
            return (
              <pre
                key={i}
                className="my-4 overflow-x-auto rounded border border-border bg-card p-3 font-[family-name:var(--font-geist-mono)] text-[13px] md:text-sm"
              >
                <code>{block.text}</code>
              </pre>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={i}
                className="my-5 border-l-2 border-primary pl-5 italic text-muted-foreground"
              >
                {block.text}
              </blockquote>
            );
          }
          return (
            <p key={i} className="mb-4">
              {block.text}
            </p>
          );
        })}
      </div>

      {/* Nav prev/next */}
      <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 md:grid-cols-2">
        {prev && (
          <Link
            href={`/blog/${prev.slug}`}
            className="rounded-lg border border-border p-5 transition-colors hover:border-primary"
          >
            <div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">
              ← Anterior
            </div>
            <div className="font-heading text-[18px]">{prev.title}</div>
          </Link>
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="rounded-lg border border-border p-5 transition-colors hover:border-primary md:text-right"
          >
            <div className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase text-muted-foreground">
              Siguiente →
            </div>
            <div className="font-heading text-[18px]">{next.title}</div>
          </Link>
        )}
      </div>
    </article>
  );
}
