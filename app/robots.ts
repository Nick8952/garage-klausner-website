import type { MetadataRoute } from "next";
import { ladeSite } from "@/lib/data";
import { keinIndex } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await ladeSite();
  // Demo: komplett gesperrt. Nach dem Umzug auf die Kundendomain (demoModus aus) freigegeben.
  return keinIndex(site)
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] }, sitemap: `${siteUrl()}/sitemap.xml` };
}
