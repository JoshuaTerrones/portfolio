import { ImageResponse } from "next/og";
import { SITE_TITLE, SITE_URL } from "@/config/site";

export const runtime = "edge";
export const alt = SITE_TITLE;
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
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#C2410C",
            marginBottom: 24,
          }}
        >
          josht.xyz
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            color: "#faf7f2",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Construyo cosas que funcionan.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#888",
            marginTop: 32,
          }}
        >
          Desarrollador backend & full-stack
        </div>
      </div>
    ),
    { ...size }
  );
}
