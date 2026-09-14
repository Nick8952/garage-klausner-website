export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

/** Ohne Projekt-ID läuft die Website mit den Rückfall-Inhalten aus data/. */
export const isSanityConfigured = /^[a-z0-9-]{4,}$/.test(projectId);

/**
 * Token (Rolle Viewer) für Entwürfe und Visual Editing. Bleibt für normale Besucher auf dem Server;
 * next-sanity gibt ihn nur im aktivierten Draft Mode an den Browser weiter (dafür ist er da).
 * Nie mit NEXT_PUBLIC_ benennen.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN;

export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
