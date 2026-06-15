/**
 * NEXT.JS CONFIG
 * --------------------------------------------------------------
 * - `images.remotePatterns` allow-lists the CDNs we load from.
 *
 * - `experimental.staleTimes` disables the App Router's in-memory
 *   client cache. Without this, when a user navigates from `/`
 *   to `/blog` and clicks Back, Next.js can restore a frozen
 *   snapshot of the page without re-running its server component
 *   or re-firing framer-motion's `whileInView` observers. The
 *   visible symptom was sections rendering blank until a manual
 *   refresh. Setting both to 0 means every navigation re-renders
 *   from the server, keeping content in sync with Sanity and
 *   animations playing correctly.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
