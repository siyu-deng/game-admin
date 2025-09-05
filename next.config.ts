import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除 output: "export" 以支持 Vercel 动态功能
  // output: "export", 
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
