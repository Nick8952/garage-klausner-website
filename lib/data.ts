import { fetchOrFallback } from "@/sanity/lib/fetch";
import { SEITE_QUERY, SITE_QUERY, SLUGS_QUERY, STANDORTE_QUERY } from "@/sanity/lib/queries";
import { fallbackSeite, fallbackSite, fallbackSlugs, fallbackStandorte } from "./content";
import type { Seite, Site, Standort } from "./types";

export const ladeSite = () => fetchOrFallback<Site>(SITE_QUERY, {}, fallbackSite);
export const ladeStandorte = () => fetchOrFallback<Standort[]>(STANDORTE_QUERY, {}, fallbackStandorte);
export const ladeSeite = (slug: string) => fetchOrFallback<Seite | null>(SEITE_QUERY, { slug }, () => fallbackSeite(slug));
export const ladeSlugs = () => fetchOrFallback<string[]>(SLUGS_QUERY, {}, fallbackSlugs);
