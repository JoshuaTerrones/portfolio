import type { Metadata } from "next";
import { TerminalLine } from "@/components/terminal-line";
import { BlogListItem } from "@/components/blog-list-item";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Joshua Terrones",
  description: "Bitácora del proceso. Lo que aprendo construyendo.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <div className="pt-6 pb-2 md:pt-8 md:pb-3">
        <TerminalLine cmd="cat blog.md" />

        <h1 className="mb-5 font-heading text-[32px] leading-none tracking-[-0.03em] md:text-[80px] md:leading-[0.95]">
          Blog
        </h1>
        <p className="max-w-[620px] text-[15px] leading-snug text-muted-foreground md:text-[17px]">
          Bitácora del proceso. Lo que aprendo construyendo.
        </p>
      </div>

      {posts.length === 0 && (
          <p className="text-muted-foreground">
            Aún no hay posts publicados. Entra a <a href="/studio" className="text-primary hover:underline">/studio</a> para escribir el primero.
          </p>
        )}

      <section className="pt-0 pb-6 md:pb-8">
        {posts.map((post) => (
          <BlogListItem
            key={post.slug}
            slug={post.slug}
            category={post.category}
            date={post.date}
            title={post.title}
            excerpt={post.excerpt}
            readingTime={post.readingTime}
          />
        ))}
      </section>
    </div>
  );
}
