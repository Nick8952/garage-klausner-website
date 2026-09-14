export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function siteUrl(): string {
  const raw = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return raw.replace(/\/$/, "") + basePath;
}

/** Telefonnummer in Anzeigeform → tel:-Link (Schweiz). */
export function telHref(anzeige: string): string {
  const roh = anzeige.trim();
  if (roh.startsWith("+")) return `tel:+${roh.replace(/\D/g, "")}`;
  const digits = roh.replace(/\D/g, "").replace(/^0041/, "0");
  return `tel:+41${digits.replace(/^0/, "")}`;
}
