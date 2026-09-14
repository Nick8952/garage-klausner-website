import type { Metadata } from "next";
import { SeitenInhalt } from "@/components/SeitenInhalt";
import { ladeSeite, ladeSite } from "@/lib/data";
import { seitenMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, seite] = await Promise.all([ladeSite(), ladeSeite("start")]);
  return seite ? seitenMetadata(site, seite) : {};
}

export default function Startseite() {
  return <SeitenInhalt slug="start" />;
}
