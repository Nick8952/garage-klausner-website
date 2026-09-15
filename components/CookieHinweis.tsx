"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const KEY = "klausner-hinweis-bestaetigt";
const listeners = new Set<() => void>();
const lese = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true; // kein Speicher verfügbar (privater Modus o. ä.) → nicht nerven
  }
};
const subscribe = (cb: () => void) => (listeners.add(cb), () => listeners.delete(cb));

/**
 * Hinweisleiste beim ersten Besuch. Die Website setzt keine Tracking-Cookies – die Leiste
 * informiert nur und merkt sich die Bestätigung lokal im Browser (Local Storage, kein Cookie).
 * Kein Consent-Mechanismus: Sobald Analyse/Maps-Einbettungen dazukommen, braucht es einen echten.
 */
export function CookieHinweis({ text, button, datenschutzHref }: { text?: string; button?: string; datenschutzHref: string }) {
  const bestaetigt = useSyncExternalStore(subscribe, lese, () => true);
  if (bestaetigt) return null;

  const schliessen = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    listeners.forEach((cb) => cb());
  };

  return (
    <div role="region" aria-label="Hinweis zum Datenschutz" className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-lg border border-linie bg-white p-4 text-sm text-tinte shadow-[0_12px_40px_-12px_rgba(18,20,26,.4)] sm:flex-row sm:items-center sm:gap-5 sm:px-5">
        <p className="flex-1">
          {text || "Diese Website verwendet keine Cookies zur Nachverfolgung und keine Analysedienste."}{" "}
          <Link href={datenschutzHref} className="whitespace-nowrap font-semibold text-rot-tief underline underline-offset-4 hover:text-rot">
            Datenschutz
          </Link>
        </p>
        <button
          type="button"
          onClick={schliessen}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-md bg-tinte px-5 font-semibold text-white transition-colors hover:bg-black"
        >
          {button || "Verstanden"}
        </button>
      </div>
    </div>
  );
}
