import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontFamily: "serif",
          fontSize: 44,
          fontWeight: 600,
          color: "#faf7f2",
          letterSpacing: "-2px",
        }}
      >
        j<span style={{ color: "#C2410C" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
