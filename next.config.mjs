import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

// Enables Cloudflare bindings (KV/D1/R2/etc., if added later) to work when
// running `next dev` locally. No-op in production — the actual Workers
// runtime is used there via the OpenNext adapter (see wrangler.jsonc).
initOpenNextCloudflareForDev();
