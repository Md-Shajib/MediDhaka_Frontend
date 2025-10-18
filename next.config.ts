import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ibb.co", "i.ibb.co.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};


export default nextConfig;
