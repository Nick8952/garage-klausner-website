import type { MetadataRoute } from "next";
import { ladeSlugs } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const slugs = await ladeSlugs();
  return slugs.map((slug) => ({ url: slug === "start" ? `${base}/` : `${base}/${slug}`, changeFrequency: "monthly", priority: slug === "start" ? 1 : 0.7 }));
}
