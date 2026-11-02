import type { NextConfig } from "next";

// Short share links (https://dubio.ai/s/<code>) are resolved by the API, which
// redirects to a short-lived URL for the shared video.
const backendApiUrl = (
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://api.dubio.ai/api"
).replace(/\/+$/, "");

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
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/launch",
        permanent: false,
      },
      {
        source: "/s/:code([A-Za-z0-9_-]{16,32})",
        destination: `${backendApiUrl}/share/:code`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
