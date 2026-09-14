import siteJson from "@/data/site.json";
import standorteJson from "@/data/standorte.json";
import start from "@/data/seiten/start.json";
import werkstaetten from "@/data/seiten/werkstaetten.json";
import familienbetrieb from "@/data/seiten/familienbetrieb.json";
import kontakt from "@/data/seiten/kontakt.json";
import impressum from "@/data/seiten/impressum.json";
import datenschutz from "@/data/seiten/datenschutz.json";
import { textToBlocks } from "./blocks";
import type { Baustein, Link, Seite, Site, Standort } from "./types";

// Rückfall-Inhalte (identische Form wie die GROQ-Abfragen), zugleich Quelle für `npm run seed`.
// Statisch importiert: Turbopack erlaubt kein fs.readFileSync mit dynamischem Pfad.

export const seitenRoh = [start, werkstaetten, familienbetrieb, kontakt, impressum, datenschutz];

type RohLink = { label: string; slug?: string; url?: string; primaer?: boolean };

export function hrefFuer(slug?: string, url?: string): string {
  if (url) return url;
  if (!slug || slug === "start") return "/";
  return `/${slug}`;
}

function links(roh?: RohLink[]): Link[] | undefined {
  return roh?.map(({ label, slug, url, primaer }) => ({ label, href: hrefFuer(slug, url), primaer }));
}

export function fallbackSite(): Site {
  const s = siteJson;
  return {
    ...s,
    navigation: s.navigation.map((n) => ({ label: n.label, href: hrefFuer(n.slug) })),
    footerLinks: s.footerLinks.map((n) => ({ label: n.label, href: hrefFuer(n.slug) })),
  };
}

export function fallbackStandorte(): Standort[] {
  return standorteJson;
}

export function fallbackSeite(slug: string): Seite | null {
  const roh = seitenRoh.find((s) => s.slug === slug);
  if (!roh) return null;
  return {
    titel: roh.titel,
    slug: roh.slug,
    seoTitel: "seoTitel" in roh ? roh.seoTitel : undefined,
    seoBeschreibung: roh.seoBeschreibung,
    bausteine: roh.bausteine.map((b, i) => {
      const _key = `${slug}-${i}`;
      const raw = b as Record<string, unknown>;
      switch (b._type) {
        case "textBaustein":
          return { ...b, _key, text: textToBlocks(raw.text as string, `${_key}-`) } as Baustein;
        case "textBildBaustein":
          return { ...b, _key, text: textToBlocks(raw.text as string, `${_key}-`), schaltflaechen: links(raw.schaltflaechen as RohLink[]) } as Baustein;
        case "heroBaustein":
        case "ctaBaustein":
          return { ...b, _key, schaltflaechen: links(raw.schaltflaechen as RohLink[]) } as Baustein;
        default:
          return { ...b, _key } as Baustein;
      }
    }),
  };
}

export function fallbackSlugs(): string[] {
  return seitenRoh.map((s) => s.slug);
}
