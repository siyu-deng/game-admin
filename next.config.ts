import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除 output: "export" 以支持 Vercel 动态功能
  // output: "export", 
  images: {
    unoptimized: true,
  },
  typescript: {
    // 在生产环境中忽略TypeScript错误（可选）
    // ignoreBuildErrors: true,
  },
  eslint: {
    // 在生产环境构建时忽略ESLint错误（可选）
    // ignoreDuringBuilds: true,
  },
  // Vercel优化配置
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
