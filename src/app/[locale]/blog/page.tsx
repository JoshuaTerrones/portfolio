import type { Metadata } from "next";
import { tx } from "gt-next/server";
import { TerminalLine } from "@/components/terminal-line";
import { BlogListItem } from "@/components/blog-list-item";
import { getPosts } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  const [title, desc] = await Promise.all([
    tx("Blog — Joshua Terrones"),
    tx("Bitácora del proceso. Lo que aprendo construyendo."),
  ]);
  return { title, description: desc };
}

export const revalidate = 3600;
type PageProps = { params: Promise<{ locale: string }> };

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = await getPosts(locale as "es" | "en");
  const cmd = await tx("cat blog.md");
  const [desc, empty1, empty2] = await Promise.all([
    tx("Bitácora del proceso. Lo que aprendo construyendo."),
    tx("Aún no hay posts publicados. Entra a"),
    tx("para escribir el primero."),
  ]);
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-2 md:pt-8 md:pb-3">
        <TerminalLine cmd={cmd} />
        <h1 className="mb-5 font-heading text-[32px] leading-none tracking-[-0.03em] md:text-[80px] md:leading-[0.95]">Blog</h1>
        <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">{desc}</p>
      </div>
      {posts.length === 0 && (
        <p className="text-muted-foreground">{empty1} <a href="/studio" className="text-primary hover:underline">/studio</a> {empty2}</p>
      )}
      <section className="pt-0 pb-6 md:pb-8">
        {posts.map((post) => (
          <BlogListItem key={post.slug} slug={post.slug} category={post.category} date={post.date} title={post.title} excerpt={post.excerpt} readingTime={post.readingTime} />
        ))}
      </section>
    </div>
  );
}
