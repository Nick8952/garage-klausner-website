import type { StandorteBaustein, Standort } from "@/lib/types";
import { telHref } from "@/lib/site-url";
import { Abschnittskopf } from "../ui/Abschnittskopf";
import { Reveal } from "../ui/Reveal";

export function Standorte({ b, standorte, erster }: { b: StandorteBaustein; standorte: Standort[]; erster: boolean }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby={b.titel ? `${b._key}-titel` : undefined}>
      <Reveal>
        <div id={b.titel ? `${b._key}-titel` : undefined}>
          <Abschnittskopf kurzzeile={b.kurzzeile} titel={b.titel} text={b.text || undefined} as={erster ? "h1" : "h2"} />
        </div>
      </Reveal>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {standorte.map((s) => (
          <Reveal as="li" key={s._id} className="relative flex flex-col bg-white p-6 sm:p-8">
            <div className="streifen absolute inset-x-0 top-0" aria-hidden="true" />
            <h3 className="display text-2xl sm:text-[1.75rem]">{s.name}</h3>
            <p className="mt-3 text-grau">
              {s.strasse}, {s.plzOrt}
            </p>
            <a href={telHref(s.telefon)} className="mono mt-4 inline-flex min-h-11 w-fit items-center text-2xl font-semibold text-blau underline-offset-4 hover:underline">
              {s.telefon}
            </a>
            <a href={`mailto:${s.email}?subject=Anfrage`} className="inline-flex min-h-11 w-fit items-center break-all text-rot-tief underline-offset-4 hover:underline">
              {s.email}
            </a>
            <dl className="mono mt-5 border-t border-linie pt-4 text-[0.95rem]">
              {s.oeffnungszeiten.map((z) => (
                <div key={z.tage} className="flex flex-wrap justify-between gap-x-4 py-1">
                  <dt className="text-grau">{z.tage}</dt>
                  <dd>{z.zeiten}</dd>
                </div>
              ))}
              {s.hinweis && (
                <div className="flex flex-wrap justify-between gap-x-4 py-1">
                  <dt className="text-grau">Öffnungszeiten</dt>
                  <dd>{s.hinweis}</dd>
                </div>
              )}
            </dl>
            {s.kartenLink && (
              <a
                href={s.kartenLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 border-b-2 border-tinte font-semibold transition-colors hover:border-rot hover:text-rot-tief"
              >
                Auf der Karte anzeigen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 13L13 3M6 3h7v7" /></svg>
                <span className="sr-only">(öffnet Google Maps in neuem Fenster)</span>
              </a>
            )}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
