import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "./live";

/**
 * Holt Inhalte aus Sanity; ohne konfiguriertes Projekt, bei fehlendem Dokument
 * oder API-Ausfall greift der Rückfall (als Funktion übergeben, damit die
 * Datei nur gelesen wird, wenn es nötig ist).
 */
export async function fetchOrFallback<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: () => T,
): Promise<T> {
  if (!isSanityConfigured) return fallback();
  try {
    const { data } = await sanityFetch({ query, params, tags: ["sanity"] });
    return (data as T | null) ?? fallback();
  } catch (error) {
    console.error("Sanity nicht erreichbar – Rückfall auf data/:", error);
    return fallback();
  }
}
