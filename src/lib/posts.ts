import { tx } from "gt-next/server";
import { client } from "@/sanity/lib/client";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; text: string; language?: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readingTime: string;
  content: PostBlock[];
};

type PortableTextChild = { _type?: string; text?: string };

type PortableTextBlock = {
  _type: string;
  style?: string;
  language?: string;
  code?: string;
  children?: PortableTextChild[];
};

type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  categoryTitle?: string;
  body?: PortableTextBlock[];
};

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id, title, slug, excerpt, publishedAt, "categoryTitle": categories[0]->title
}`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, publishedAt, "categoryTitle": categories[0]->title,
  body[]{ _type, style, language, code, children[]{ _type, text } }
}`;

function formatDate(iso: string, locale: "es" | "en"): string {
  try {
    return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function blocksToPlainText(blocks: PortableTextBlock[] | undefined): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((b) =>
      b._type === "block" && Array.isArray(b.children)
        ? b.children.map((c) => c.text ?? "").join("")
        : ""
    )
    .join(" ");
}

function calcReadingTime(blocks: PortableTextBlock[] | undefined): string {
  const text = blocksToPlainText(blocks);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function toBlocks(blocks: PortableTextBlock[] | undefined): PostBlock[] {
  if (!Array.isArray(blocks)) return [];
  const result: PostBlock[] = [];
  for (const b of blocks) {
    if (b._type === "block" && Array.isArray(b.children)) {
      const text = b.children.map((c) => c.text ?? "").join("");
      if (!text.trim()) continue;
      const style = b.style ?? "normal";
      if (style === "h2" || style === "h3") result.push({ type: "h2", text });
      else if (style === "blockquote") result.push({ type: "quote", text });
      else result.push({ type: "p", text });
    } else if (b._type === "code") {
      result.push({ type: "code", text: b.code ?? "", language: b.language });
    }
  }
  return result;
}

function sanityToPost(s: SanityPost, locale: "es" | "en"): Post {
  return {
    slug: s.slug?.current ?? "",
    category: s.categoryTitle ?? "Devlog",
    date: formatDate(s.publishedAt, locale),
    title: s.title,
    excerpt: s.excerpt ?? "",
    readingTime: calcReadingTime(s.body),
    content: toBlocks(s.body),
  };
}

async function translatePost(s: SanityPost, locale: "es" | "en"): Promise<SanityPost> {
  if (locale === "es") return s;
  return {
    ...s,
    title: await tx(s.title),
    excerpt: s.excerpt ? await tx(s.excerpt) : s.excerpt,
    categoryTitle: s.categoryTitle ? await tx(s.categoryTitle) : s.categoryTitle,
    body: s.body
      ? await Promise.all(
          s.body.map(async (block) => {
            if (block._type === "block" && Array.isArray(block.children)) {
              return {
                ...block,
                children: await Promise.all(
                  block.children.map(async (child) =>
                    child.text ? { ...child, text: await tx(child.text) } : child
                  )
                ),
              };
            }
            return block;
          })
        )
      : s.body,
  };
}

export async function getPosts(locale: "es" | "en" = "es"): Promise<Post[]> {
  try {
    const posts = await client.fetch<SanityPost[]>(POSTS_QUERY, {}, { next: { revalidate: 3600 } });
    const translated = await Promise.all(posts.map((p) => translatePost(p, locale)));
    return translated.map((p) => sanityToPost(p, locale));
  } catch (err) {
    console.error("Sanity getPosts error:", err);
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  locale: "es" | "en" = "es"
): Promise<Post | undefined> {
  try {
    const post = await client.fetch<SanityPost | null>(
      POST_QUERY,
      { slug },
      { next: { revalidate: 3600 } }
    );
    if (!post) return undefined;
    const translated = await translatePost(post, locale);
    return sanityToPost(translated, locale);
  } catch (err) {
    console.error("Sanity getPostBySlug error:", err);
    return undefined;
  }
}

export async function getAdjacentPosts(slug: string, locale: "es" | "en" = "es") {
  const posts = await getPosts(locale);
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? posts[idx - 1] : posts[posts.length - 1];
  const next = idx < posts.length - 1 ? posts[idx + 1] : posts[0];
  return { prev, next };
}
