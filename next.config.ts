import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/learn_app', // Replace 'learn_app' with your GitHub repository name
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
