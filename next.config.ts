import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
      "10.221.47.135","192.168.1.61"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
};

export default nextConfig;
