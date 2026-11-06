import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [90, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  headers: async () => [
    {
      // Demo media is static; let Vercel's CDN and browsers cache it hard.
      source: "/demo/:file*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
        },
      ],
    },
  ],
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/launch",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
