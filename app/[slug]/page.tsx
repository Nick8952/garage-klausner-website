import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeitenInhalt } from "@/components/SeitenInhalt";
import { ladeSeite, ladeSite, ladeSlugs } from "@/lib/data";
import { seitenMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Alle Seiten aus Sanity werden beim Build vorgerendert; neue Seiten erscheinen
// auf Vercel dank Live Content API auch ohne Build (dynamicParams).
export async function generateStaticParams() {
  const slugs = await ladeSlugs();
  return slugs.filter((s) => s !== "start").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, seite] = await Promise.all([ladeSite(), ladeSeite(slug)]);
  if (!seite) return {};
  return seitenMetadata(site, seite);
}

export default async function Seite({ params }: Props) {
  const { slug } = await params;
  if (slug === "start") notFound();
  return <SeitenInhalt slug={slug} />;
}
