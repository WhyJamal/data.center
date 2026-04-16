import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",                     
        destination: "http://localhost/kvarts/hs/api/:path*", 
      },
    ];
  },
};

export default nextConfig;