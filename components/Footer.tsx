import Link from "next/link";
import type { Site, Standort } from "@/lib/types";
import { telHref } from "@/lib/site-url";

export function Footer({ site, standorte }: { site: Site; standorte: Standort[] }) {
  return (
    <footer className="mt-24 bg-tinte text-white">
      <div className="streifen streifen--fein" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="display text-2xl">{site.firmenname}</p>
          {site.footerText && <p className="mt-3 max-w-sm text-white/75">{site.footerText}</p>}
          <a href={telHref(site.telefon)} className="mt-5 inline-flex min-h-11 items-center text-lg font-semibold text-gelb underline-offset-4 hover:underline">
            {site.telefon}
          </a>
        </div>
        {standorte.map((s) => (
          <address key={s._id} className="not-italic">
            <p className="kurzzeile mb-2 !text-gelb">{s.name}</p>
            <p>
              {s.strasse}
              <br />
              {s.plzOrt}
            </p>
            <p className="mt-2">
              <a href={telHref(s.telefon)} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">{s.telefon}</a>
              <br />
              <a href={`mailto:${s.email}`} className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline">{s.email}</a>
            </p>
          </address>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm text-white/70 sm:px-6">
          <p>© {new Date().getFullYear()} {site.firmenname}</p>
          <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-5">
            {site.footerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
