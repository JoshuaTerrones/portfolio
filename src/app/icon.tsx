import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontWeight: 500,
          color: "#faf7f2",
          fontSize: 48,
          letterSpacing: "-3px",
          paddingRight: "4px",
          paddingBottom: "4px",
        }}
      >
        j<span style={{ color: "#C2410C", fontStyle: "normal" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
