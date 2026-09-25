import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function OG({ params }: Props) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as "es" | "en");

  const title = post?.title ?? "Blog";
  const category = post?.category ?? "Devlog";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#C2410C" }}>
          {category.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            color: "#faf7f2",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#888" }}>
          josht.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
