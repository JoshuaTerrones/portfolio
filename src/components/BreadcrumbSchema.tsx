import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/config/site";

type Item = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: Item[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
  return <JsonLd data={schema} />;
}
