import type { NextConfig } from "next";

const basePath = '/learn_app'; // Replace 'learn_app' with your GitHub repository name

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath, // Make basePath available to client-side code
  },
};

export default nextConfig;
