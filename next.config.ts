import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const repoName = "forme-ritual-athletics";
const basePath = isStaticExport ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
