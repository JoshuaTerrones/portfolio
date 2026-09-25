import { ImageResponse } from "next/og";

export function renderIcon(size: number) {
  const fontSize = Math.round(size * 0.72);
  const dotSize = Math.round(size * 0.14);
  const letterSpacing = Math.round(size * -0.04);
  const padding = Math.round(size * 0.08);

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
          fontWeight: 700,
          color: "#faf7f2",
          fontSize,
          letterSpacing: `${letterSpacing}px`,
          paddingRight: padding,
          paddingBottom: padding,
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline" }}>
          j
          <span
            style={{
              color: "#C2410C",
              fontStyle: "normal",
              fontSize: dotSize * 3,
              lineHeight: 1,
              marginLeft: Math.round(size * -0.04),
            }}
          >
            .
          </span>
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}
