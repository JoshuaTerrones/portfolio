import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/config/site";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";

const STATIC_PAGES = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "/proyectos", priority: 0.9, freq: "monthly" as const },
  { path: "/blog", priority: 0.9, freq: "weekly" as const },
  { path: "/sobre-mi", priority: 0.8, freq: "monthly" as const },
  { path: "/contacto", priority: 0.7, freq: "yearly" as const },
  { path: "/proceso", priority: 0.6, freq: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const page of STATIC_PAGES) {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}${page.path}`;
    languages["x-default"] = `${SITE_URL}/es${page.path}`;

    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.freq,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  try {
    const posts = await getPosts("es");
    for (const post of posts) {
      const languages: Record<string, string> = {};
      for (const l of LOCALES)
        languages[l] = `${SITE_URL}/${l}/blog/${post.slug}`;
      languages["x-default"] = `${SITE_URL}/es/blog/${post.slug}`;

      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: { languages },
        });
      }
    }
  } catch {}

  try {
    const projects = await getProjects("es");
    for (const p of projects) {
      const languages: Record<string, string> = {};
      for (const l of LOCALES)
        languages[l] = `${SITE_URL}/${l}/proyectos/${p.num}`;
      languages["x-default"] = `${SITE_URL}/es/proyectos/${p.num}`;

      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}/proyectos/${p.num}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: { languages },
        });
      }
    }
  } catch {}

  return entries;
}
