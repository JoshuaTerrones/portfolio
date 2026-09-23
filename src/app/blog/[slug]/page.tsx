import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { POSTS, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <BlogArticle post={post} />
    </div>
  );
}
