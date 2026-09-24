"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const COLORS = {
  light: "#FAF6EF",
  dark: "#121212",
};

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === "dark" ? COLORS.dark : COLORS.light;

    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [resolvedTheme]);

  return null;
}
