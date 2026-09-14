"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { Site } from "@/lib/types";
import { telHref } from "@/lib/site-url";
import { Bild } from "./ui/Bild";

function TelefonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function Header({ site }: { site: Site }) {
  const [offen, setOffen] = useState(false);
  const pfad = usePathname();
  const menuId = useId();

  // Menü schliesst bei Seitenwechsel – ohne setState im Effekt (React-Compiler-Regel).
  const [letzterPfad, setLetzterPfad] = useState(pfad);
  if (pfad !== letzterPfad) {
    setLetzterPfad(pfad);
    setOffen(false);
  }
  useEffect(() => {
    if (!offen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOffen(false);
    // Ab Desktop-Breite ist das Menü ohnehin unsichtbar – schliessen, sonst bleibt die Scrollsperre hängen.
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOffen(false);
    mq.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      mq.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [offen]);

  const aktiv = (href: string) => (href === "/" ? pfad === "/" : pfad.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-linie/70 bg-halle/95 backdrop-blur supports-[backdrop-filter]:bg-halle/85">
      <div className="streifen streifen--fein" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-12 items-center gap-3" aria-label={`${site.kurzname} – Startseite`}>
          {site.logo && <Bild bild={site.logo} sizes="48px" priority className="h-12 w-12 object-contain" />}
          <span className="flex flex-col leading-tight">
            <span className="display text-[1.05rem] sm:text-lg">{site.kurzname}</span>
            {site.claim && <span className="text-xs text-grau">{site.claim}</span>}
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
          {site.navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={aktiv(n.href) ? "page" : undefined}
              className={`relative flex min-h-11 items-center px-3 font-medium transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-rot after:transition-transform after:duration-200 hover:text-rot-tief hover:after:scale-x-100 ${aktiv(n.href) ? "text-blau after:scale-x-100 after:bg-blau" : "text-tinte"}`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={telHref(site.telefon)}
            className="ml-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-blau px-4 text-[0.95rem] font-semibold tracking-[0.01em] text-white shadow-[0_1px_2px_rgba(18,20,26,.2),inset_0_1px_0_rgba(255,255,255,.14)] transition-colors hover:bg-blau-tief"
          >
            <TelefonIcon />
            {site.telefon}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-tinte/25 bg-white shadow-[0_1px_2px_rgba(18,20,26,.06)] md:hidden"
          aria-expanded={offen}
          aria-controls={menuId}
          onClick={() => setOffen((o) => !o)}
        >
          <span className="sr-only">{offen ? "Menü schliessen" : "Menü öffnen"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {offen ? (
              <path d="M4 4l14 14M18 4L4 18" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" />
            )}
          </svg>
        </button>
      </div>

      <div id={menuId} hidden={!offen} className="border-t border-linie bg-halle md:hidden">
        <nav aria-label="Mobile Navigation" className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          <Link href="/" aria-current={pfad === "/" ? "page" : undefined} className={`flex min-h-12 items-center border-b border-linie text-lg font-medium ${pfad === "/" ? "text-blau" : ""}`}>
            Start
          </Link>
          {site.navigation.map((n) => (
            <Link key={n.href} href={n.href} aria-current={aktiv(n.href) ? "page" : undefined} className={`flex min-h-12 items-center border-b border-linie text-lg font-medium ${aktiv(n.href) ? "text-blau" : ""}`}>
              {n.label}
            </Link>
          ))}
          <a href={telHref(site.telefon)} className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-blau px-4 font-semibold text-white">
            <TelefonIcon />
            {site.telefon}
          </a>
        </nav>
      </div>
    </header>
  );
}
