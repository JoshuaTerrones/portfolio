import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const runtime = "nodejs";

const POST_BY_ID_QUERY = `*[_type == "post" && _id == $id][0] {
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

type PortableTextBlock = {
  _type: string;
  style?: string;
  language?: string;
  code?: string;
  children?: Array<{ _type?: string; text?: string }>;
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

function portableTextToMarkdown(body: PortableTextBlock[] | undefined): string {
  if (!Array.isArray(body)) return "";
  const lines: string[] = [];
  for (const block of body) {
    if (block._type === "block" && Array.isArray(block.children)) {
      const text = block.children.map((c) => c.text ?? "").join("");
      const style = block.style ?? "normal";
      if (style === "h1") lines.push(`# ${text}\n`);
      else if (style === "h2") lines.push(`## ${text}\n`);
      else if (style === "h3") lines.push(`### ${text}\n`);
      else if (style === "h4") lines.push(`#### ${text}\n`);
      else if (style === "blockquote") lines.push(`> ${text}\n`);
      else lines.push(`${text}\n`);
    } else if (block._type === "code") {
      const lang = block.language ?? "";
      lines.push(`\`\`\`${lang}\n${block.code ?? ""}\n\`\`\`\n`);
    }
  }
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  if (!process.env.DEV_TO_API_KEY || process.env.DEV_TO_API_KEY === "placeholder") {
    return NextResponse.json(
      { error: "DEV_TO_API_KEY no configurado en .env.local" },
      { status: 500 }
    );
  }

  let payload: { _id?: string } = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const id = payload._id;
  if (!id) {
    return NextResponse.json({ error: "Falta _id del documento" }, { status: 400 });
  }

  const post = await client.fetch<SanityPost | null>(POST_BY_ID_QUERY, { id });
  if (!post) {
    return NextResponse.json({ error: "Post no encontrado en Sanity" }, { status: 404 });
  }

  // Dev.to exige HTTPS en canonical_url. Usamos el dominio de producción siempre.
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://josht.xyz";
  const siteUrl = rawSiteUrl.startsWith("https://") ? rawSiteUrl : "https://josht.xyz";
  const markdown = portableTextToMarkdown(post.body);

  const devtoBody = {
    article: {
      title: post.title,
      body_markdown: markdown,
      published: true,
      canonical_url: `${siteUrl}/blog/${post.slug.current}`,
      description: post.excerpt ?? "",
      tags: [
        post.categoryTitle?.toLowerCase().replace(/\s+/g, "") ?? "devlog",
        "webdev",
        "nextjs",
        "sanity",
      ].slice(0, 4),
    },
  };

  try {
    const res = await fetch("https://dev.to/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.DEV_TO_API_KEY,
      },
      body: JSON.stringify(devtoBody),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }
    return NextResponse.json({ success: true, url: data.url, id: data.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
