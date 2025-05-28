import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
  // Optional: Add if you need other image providers
  // experimental: {
  //   images: {
  //     allowFutureImage: true,
  //   },
  // },
};

export default nextConfig;