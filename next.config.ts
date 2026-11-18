import type { NextConfig } from "next";

// GitHub Pages (proje sayfası) için statik dışa aktarma.
// Vercel derlemesi bu bayrak olmadan normal çalışır.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: "/nerede-oyunu",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
