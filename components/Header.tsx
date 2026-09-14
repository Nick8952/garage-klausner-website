"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { Site } from "@/lib/types";
import { telHref } from "@/lib/site-url";
import { Bild } from "./ui/Bild";

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
    <header className="sticky top-0 z-40 bg-halle/95 backdrop-blur supports-[backdrop-filter]:bg-halle/85">
      <div className="streifen" aria-hidden="true" />
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
          <a href={telHref(site.telefon)} className="mono ml-3 inline-flex min-h-11 items-center rounded-sm bg-blau px-4 text-sm font-semibold text-white transition-colors hover:bg-blau-tief">
            {site.telefon}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-sm border-2 border-tinte md:hidden"
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
          <a href={telHref(site.telefon)} className="mono mt-4 inline-flex min-h-12 items-center justify-center rounded-sm bg-blau px-4 font-semibold text-white">
            Anrufen: {site.telefon}
          </a>
        </nav>
      </div>
    </header>
  );
}
