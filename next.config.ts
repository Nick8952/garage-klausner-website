import type { NextConfig } from "next";

// Zwei Deploy-Ziele aus einem Code:
// - Vercel (Hauptdemo): Server-Rendering, Live Content API, Entwurfsvorschau, Studio unter /studio.
// - GitHub Pages (STATIC_EXPORT=1): statischer Export unter nick8952.github.io/<repo>/.
//   Der Workflow entfernt vorher app/api und app/studio, die einen Server brauchen.
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = isStaticExport ? (process.env.BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        // Die Live Content API bringt Server Actions mit, die ein statischer Export nicht kennt.
        turbopack: {
          resolveAlias: {
            "next-sanity/live": "./lib/static-stubs/next-sanity-live.ts",
            "next-sanity/visual-editing": "./lib/static-stubs/next-sanity-visual-editing.tsx",
          },
        },
      }
    : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "1" : "" },
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Sanity Studio bringt eigene Lint-Regeln mit; ESLint läuft separat über `npm run lint`.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
