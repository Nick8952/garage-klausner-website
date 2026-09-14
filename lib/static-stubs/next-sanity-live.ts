// Ersatz für «next-sanity/live» beim statischen Export (GitHub Pages): kein Live-Abo,
// keine Server Actions – Inhalte werden einmal beim Build geholt. Eingehängt in next.config.ts.
import type { SanityClient } from "next-sanity";

export function defineLive({ client }: { client: SanityClient; serverToken?: string; browserToken?: string }) {
  return {
    sanityFetch: async <T = unknown>({ query, params = {} }: { query: string; params?: Record<string, unknown>; tags?: string[] }) => ({
      data: await client.fetch<T>(query, params, { stega: false }),
    }),
    SanityLive: () => null,
  };
}
