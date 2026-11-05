import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div style={{ fontSize: 64, color: "#faf7f2" }}>Mi Blog</div>
        <div style={{ fontSize: 24, color: "#888", marginTop: 20 }}>josht.xyz</div>
      </div>
    ),
    { ...size }
  );
}
