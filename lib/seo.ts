import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import type { Seite, Site, Standort } from "./types";
import { siteUrl, telHref } from "./site-url";
import { isStaticExport } from "@/sanity/env";

/** Demo-Modus oder GitHub-Pages-Spiegel: nie indexieren, damit nichts mit der Kundenwebsite konkurriert. */
export const keinIndex = (site: Site) => site.demoModus || isStaticExport;

export function seitenMetadata(site: Site, seite: Seite): Metadata {
  const titel = stegaClean(seite.seoTitel || seite.titel);
  const zusatz = stegaClean(site.seoTitelZusatz || site.kurzname);
  const voll = seite.slug === "start" ? titel : `${titel} – ${zusatz}`;
  const pfad = seite.slug === "start" ? "/" : `/${seite.slug}`;
  return {
    title: { absolute: voll },
    description: stegaClean(seite.seoBeschreibung || site.seoBeschreibung || ""),
    alternates: { canonical: pfad },
    openGraph: { title: voll, description: stegaClean(seite.seoBeschreibung || site.seoBeschreibung || ""), type: "website", locale: "de_CH", url: pfad },
    // Demo-Modus: die Vorschau soll nicht mit der echten Kundenwebsite konkurrieren.
    robots: keinIndex(site) ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** Strukturierte Daten nur mit belegten Angaben: Firma, Adressen, Telefon, E-Mail, Öffnungszeiten. */
export function organisationJsonLd(site: Site, standorte: Standort[]) {
  const url = siteUrl();
  const tage: Record<string, string[]> = {
    "montag bis freitag": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "montag bis samstag": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  };
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: stegaClean(site.firmenname),
    url,
    telephone: telHref(stegaClean(site.telefon)).replace("tel:", ""),
    email: stegaClean(site.email),
    ...(site.logo ? { logo: site.logo.src.startsWith("/") ? url + site.logo.src : site.logo.src } : {}),
    location: standorte.map((s) => {
      const [plz, ...ort] = stegaClean(s.plzOrt).split(" ");
      const hours = s.oeffnungszeiten.flatMap((z) => {
        const days = tage[stegaClean(z.tage).toLowerCase()];
        if (!days) return [];
        return stegaClean(z.zeiten).split(/,\s*/).map((slot) => {
          const [opens, closes] = slot.split(/[–-]/);
          return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: opens?.trim(), closes: closes?.trim() };
        });
      });
      return {
        "@type": "AutoRepair",
        name: `${stegaClean(site.kurzname)} ${stegaClean(s.name)}`,
        telephone: telHref(stegaClean(s.telefon)).replace("tel:", ""),
        email: stegaClean(s.email),
        address: { "@type": "PostalAddress", streetAddress: stegaClean(s.strasse), postalCode: plz, addressLocality: ort.join(" "), addressCountry: "CH" },
        ...(hours.length ? { openingHoursSpecification: hours } : {}),
        ...(s.kartenLink ? { hasMap: stegaClean(s.kartenLink) } : {}),
      };
    }),
  };
}
