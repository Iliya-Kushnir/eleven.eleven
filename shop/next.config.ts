import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.shopify.com", "letsenhance.io"], // 👈 добавь сюда
  },
};

export default nextConfig;
