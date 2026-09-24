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
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "categoryTitle": categories[0]->title
}`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "categoryTitle": categories[0]->title,
  body[]{
    _type,
    style,
    language,
    code,
    children[]{ _type, text }
  }
}`;

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
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
    .map((b) => {
      if (b._type === "block" && Array.isArray(b.children)) {
        return b.children.map((c) => c.text ?? "").join("");
      }
      return "";
    })
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

function sanityToPost(s: SanityPost): Post {
  return {
    slug: s.slug?.current ?? "",
    category: s.categoryTitle ?? "Devlog",
    date: formatDate(s.publishedAt),
    title: s.title,
    excerpt: s.excerpt ?? "",
    readingTime: calcReadingTime(s.body),
    content: toBlocks(s.body),
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<SanityPost[]>(POSTS_QUERY, {}, { next: { revalidate: 3600 } });
    return posts.map(sanityToPost);
  } catch (err) {
    console.error("Sanity getPosts error:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const post = await client.fetch<SanityPost | null>(
      POST_QUERY,
      { slug },
      { next: { revalidate: 3600 } }
    );
    return post ? sanityToPost(post) : undefined;
  } catch (err) {
    console.error("Sanity getPostBySlug error:", err);
    return undefined;
  }
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? posts[idx - 1] : posts[posts.length - 1];
  const next = idx < posts.length - 1 ? posts[idx + 1] : posts[0];
  return { prev, next };
}
