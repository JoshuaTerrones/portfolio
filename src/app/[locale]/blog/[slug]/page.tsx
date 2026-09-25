import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { BlogPostSchema } from "@/components/BlogPostSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getPostBySlug } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/config/site";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as "es" | "en");
  if (!post) return {};

  const languages: Record<string, string> = {
    es: `${SITE_URL}/es/blog/${slug}`,
    en: `${SITE_URL}/en/blog/${slug}`,
    "x-default": `${SITE_URL}/es/blog/${slug}`,
  };
  const ogImage = `${SITE_URL}/${locale}/blog/${slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/${locale}/blog/${slug}`, languages },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      authors: [SITE_NAME],
      locale: locale === "es" ? "es_PE" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as "es" | "en");
  if (!post) notFound();

  const ogImage = `${SITE_URL}/${locale}/blog/${slug}/opengraph-image`;

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 md:px-8">
      <BlogPostSchema
        title={post.title}
        description={post.excerpt}
        slug={slug}
        publishedAt={post.date}
        imageUrl={ogImage}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: `/${locale}` },
          { name: "Blog", url: `/${locale}/blog` },
          { name: post.title, url: `/${locale}/blog/${slug}` },
        ]}
      />
      <BlogArticle post={post} locale={locale as "es" | "en"} />
    </div>
  );
}
