import { JsonLd } from "./JsonLd";
import { SITE_URL, SITE_NAME } from "@/config/site";

type Props = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl: string;
  tags?: string[];
  locale: string;
};

export function BlogPostSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  imageUrl,
  tags = [],
  locale,
}: Props) {
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: tags.join(", "),
    inLanguage: locale,
  };
  return <JsonLd data={schema} />;
}
