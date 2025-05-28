import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Allow all paths under this domain
        pathname: "/**",  
      },
    ],
  },
};

export default nextConfig;