import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.BUILD_TARGET === "github-pages";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  isGitHubPagesBuild && repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild ? { output: "export", trailingSlash: true } : {}),
  images: isGitHubPagesBuild ? { unoptimized: true } : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
