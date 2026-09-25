import { ImageResponse } from "next/og";
import { FRAUNCES_ITALIC_B64 } from "./fonts/fraunces-italic";

function getFontData(): ArrayBuffer {
  const binary = atob(FRAUNCES_ITALIC_B64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function renderIcon(size: number) {
  const fontData = getFontData();
  const fontSize = Math.round(size * 0.78);
  const dotSize = Math.round(size * 0.14);

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
          fontFamily: "Fraunces",
          fontStyle: "italic",
          fontWeight: 700,
          color: "#faf7f2",
          fontSize,
          letterSpacing: `${-size * 0.04}px`,
          paddingRight: size * 0.08,
        }}
      >
        j<span style={{ color: "#C2410C", fontStyle: "normal", fontSize: dotSize * 3 }}>.</span>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "Fraunces",
          data: fontData,
          style: "italic",
          weight: 700,
        },
      ],
    }
  );
}
