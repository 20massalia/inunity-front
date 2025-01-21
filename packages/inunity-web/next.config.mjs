import pwa from "next-pwa";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withPWA = pwa({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_JEAN}/:path*`,
      },
    ];
  },
};

export default withPWA(nextConfig);
