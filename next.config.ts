import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "https",
        hostname: "thfvnext.bing.com",
      },
      {
        protocol: "https",
        hostname: "copilot.microsoft.com",
      },
    ],
  },
};

export default nextConfig;
