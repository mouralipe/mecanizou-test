import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'motosneno.cdn.magazord.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
