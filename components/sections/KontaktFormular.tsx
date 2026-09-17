"use client";

import { useId, useState, type FormEvent } from "react";
import type { KontaktFormularBaustein, Standort } from "@/lib/types";
import { Abschnittskopf } from "../ui/Abschnittskopf";
import { Reveal } from "../ui/Reveal";

/**
 * Sendet nichts selbst: baut aus den Feldern eine mailto-Adresse und öffnet das
 * E-Mail-Programm. Deshalb heisst die Schaltfläche auch so – keine falsche Versandbestätigung.
 */
export function KontaktFormular({ b, standorte, erster }: { b: KontaktFormularBaustein; standorte: Standort[]; erster: boolean }) {
  const id = useId();
  const [geoeffnet, setGeoeffnet] = useState(false);
  const [werkstatt, setWerkstatt] = useState(standorte[0]?._id ?? "");
  const ziel = standorte.find((s) => s._id === werkstatt) ?? standorte[0];

  function absenden(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const zeilen = [
      `Name: ${f.get("name")}`,
      `Telefon: ${f.get("telefon") || "–"}`,
      `E-Mail: ${f.get("email") || "–"}`,
      `Fahrzeug: ${f.get("fahrzeug") || "–"}`,
      "",
      String(f.get("nachricht") ?? ""),
    ];
    const betreff = `${b.betreff || "Anfrage über die Website"} – ${ziel?.name ?? ""}`.trim();
    window.location.href = `mailto:${ziel?.email ?? ""}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(zeilen.join("\n"))}`;
    setGeoeffnet(true);
  }

  const feld = "mt-1.5 block w-full min-h-12 rounded-[4px] border border-linie bg-white px-3 py-2.5 text-tinte placeholder:text-grau/70 focus:border-blau focus:outline-none";
  const label = "block text-sm font-semibold";

  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Abschnittskopf kurzzeile={b.kurzzeile} titel={b.titel} text={b.text} as={erster ? "h1" : "h2"} />
      <form onSubmit={absenden} className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2" noValidate={false}>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-werkstatt`} className={label}>Werkstatt</label>
          <select id={`${id}-werkstatt`} name="werkstatt" value={werkstatt} onChange={(e) => setWerkstatt(e.target.value)} className={feld}>
            {standorte.map((s) => (
              <option key={s._id} value={s._id}>{s.name} – {s.strasse}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-name`} className={label}>Name <span className="font-normal text-grau">(Pflicht)</span></label>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className={feld} />
        </div>
        <div>
          <label htmlFor={`${id}-telefon`} className={label}>Telefon</label>
          <input id={`${id}-telefon`} name="telefon" type="tel" autoComplete="tel" className={feld} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>E-Mail für die Antwort</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={feld} />
        </div>
        <div>
          <label htmlFor={`${id}-fahrzeug`} className={label}>Fahrzeug</label>
          <input id={`${id}-fahrzeug`} name="fahrzeug" type="text" placeholder="Marke, Modell, Jahrgang" className={feld} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-nachricht`} className={label}>Ihr Anliegen <span className="font-normal text-grau">(Pflicht)</span></label>
          <textarea id={`${id}-nachricht`} name="nachricht" rows={5} required className={feld} />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[4px] bg-rot px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-rot-tief">
            E-Mail-Programm öffnen
          </button>
          <p className="mt-3 text-sm text-grau">
            Die Nachricht geht an {ziel?.email}. Abgeschickt wird sie erst in Ihrem E-Mail-Programm.
          </p>
          <p role="status" aria-live="polite" className={`mt-3 border-l-4 border-blau bg-white px-4 py-3 text-sm ${geoeffnet ? "" : "hidden"}`}>
            {geoeffnet && b.hinweisNachAbsenden}
          </p>
        </div>
      </form>
    </Reveal>
  );
}
