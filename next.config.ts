import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.xquiz.co" },
      { protocol: "https", hostname: "**.xquiz.co" },
    ],
  },
};

export default nextConfig;
