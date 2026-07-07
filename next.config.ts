import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com"
      },
      {
        protocol: "https",
        hostname: "img.youtube.com"
      },
      {
        protocol: "https",
        hostname: "*.ytimg.com"
      }
    ],
    unoptimized: true
  },
  experimental: {
    mdxRs: true
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
