import type { NextConfig } from "next";

const BASE = process.env.NEXT_PUBLIC_API_URL;
const PREFIX = process.env.NEXT_PUBLIC_API_PREFIX;
const SERVER = process.env.NEXT_1C_SERVER;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: `/${PREFIX}/:path*`,
        destination: `${SERVER}${BASE}/hs/${PREFIX}/:path*`,
      },
    ];
  },
};

export default nextConfig;