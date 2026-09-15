# garage-klausner-website – Anweisungen für Claude Code

@AGENTS.md

Verkaufs-Demo für die **Garage Elefant Klausner AG, Zürich** (Autowerkstatt mit zwei Standorten –
**keine Fahrschule**). Neubau von garageklausner.ch (einseitiger Hostpoint-Baukasten) als
Next.js-Website mit Sanity-CMS. Übergeordnete Regeln: `../CLAUDE.md` (Websites Hustle) und die
globale `~/.claude/CLAUDE.md` gelten weiterhin.

## Architektur

- **Next.js 16** (App Router, TypeScript, Tailwind 4, Turbopack), React 19.
- **Sanity 6 / next-sanity 13**: Live Content API (`sanity/lib/live.ts`), Draft Mode
  (`app/api/draft-mode/{enable,disable}`), Visual Editing (Presentation-Tool im Studio unter `/studio`).
- **Zwei Deploy-Ziele aus einem Code:**
  - Vercel (Hauptdemo, Server): Studio, Vorschau, Live-Updates.
  - GitHub Pages (Spiegel): `STATIC_EXPORT=1` → `output: "export"`, `BASE_PATH=/garage-klausner-website`,
    Stubs für `next-sanity/live` und `next-sanity/visual-editing` via `turbopack.resolveAlias`;
    der Workflow `.github/workflows/pages.yml` löscht `app/api` + `app/studio` vor dem Build.
    Statischer Export ist **immer noindex**.
- **Rückfall-Daten** `data/*.json` und `data/seiten/*.json`: gleiche Form wie die GROQ-Abfragen
  (`sanity/lib/queries.ts`), zugleich Quelle für `npm run seed`. Ohne `NEXT_PUBLIC_SANITY_PROJECT_ID`
  läuft die Website daraus. Text in `data/` ist Klartext (`### `, `- `, `**fett**`, `[Text](url)`) und
  wird von `lib/blocks.ts` deterministisch in Portable Text gewandelt.
- Alle Werte aus Sanity können Stega-Zeichen enthalten → für Logik/Metadata/JSON-LD `stegaClean` (siehe `lib/seo.ts`).

## Sanity-Inhaltsmodell (deutsche Labels, `sanity/schemas/`)

| Typ | Zweck |
|---|---|
| `siteSettings` (Singleton) | Firmenname, Kurzname, Leitsatz, Logo, Telefon, E-Mail, Navigation (Referenzen auf Seiten), Fusszeilen-Links/-Text, SEO-Zusatz/-Beschreibung, **`demoModus`** (noindex) |
| `standort` | Werkstatt: Name, Strasse, PLZ/Ort, Telefon, E-Mail, Öffnungszeiten (Zeilen), Hinweis, Karten-Link, Reihenfolge |
| `seite` | Titel, Slug (`start` = Startseite), SEO-Titel/-Beschreibung, `bausteine[]` |
| Bausteine | `heroBaustein`, `textBaustein`, `standorteBaustein`, `bildBaustein`, `textBildBaustein`, `ctaBaustein`, `kontaktFormularBaustein`, `faqBaustein` |
| Objekte | `bildMitAlt` (Alt-Pflicht), `linkziel` (interne Seite oder URL, `primaer`), `fliesstext` (Absatz/h3/Aufzählung/fett/kursiv/Link) |

Neuer Baustein = Schema in `sanity/schemas/bausteine/index.ts` + Projektion in `SEITE_QUERY` + Typ in
`lib/types.ts` + Komponente in `components/sections/` + Fall in `components/Bausteine.tsx` + ggf. `lib/content.ts`/`scripts/seed.ts`.

## Befehle

```bash
npm run dev          # Entwicklung, Studio unter /studio
npm run build        # Produktions-Build (Vercel)
npm run build:pages  # statischer Export (nur zum Testen; im Workflow werden app/api + app/studio vorher gelöscht)
npm run lint && npm run typecheck
npm run seed         # data/ + public/img → Sanity (createIfNotExists; --reset überschreibt)
```

Screenshots/Audits: puppeteer-core im Scratchpad gegen `next start -p 3311` (siehe Auto-Memory `browser-screenshots`).

## Designregeln «Elefantino»

- **Rot `#e30814` ist die Leitfarbe** (Nicks Vorgabe 15.09.2026, wie die alte Seite): Hero-Schriftzug, Abschnittstitel, Kurzzeilen-Akzent, Telefon-Button, primäre Buttons. Blau `#222c77` und Gelb `#ffed00` nur noch im Dreifarb-Streifen und im Logo. Hallengrau `#f2f2ef`, Tinte `#12141a` (dunkler Aufruf-Kasten). Tokens in `app/globals.css` (`@theme inline`), keine Roh-Hex in Komponenten.
- Schrift: Archivo (variabel, `wdth` 118, Titel), IBM Plex Sans (Text, Buttons, Kurzzeilen, Telefonnummern), IBM Plex Mono **nur** für die Öffnungszeiten-Tabelle. Nur via `next/font`. Buttons: `rounded-md`, Sans semibold, dezenter Schatten – keine Mono-Schrift (Nicks Vorgabe 15.09.2026).
- Signatur: `.streifen` (Blau/Gelb/Rot-Linie, 2–3 px) nur als feine Kante über Kopf- und Fusszeile. Karten/Kästen tragen keinen Streifen; blaue Kästen (Hero-Schild, Aufruf) sind `rounded-lg` mit dezentem Verlauf Blau→Blau-tief.
- **Hero wie die alte Seite** (Nicks Vorgabe 15.09.2026): Schriftzug «GARAGE KLAUSNER» gross, rot, uppercase, zentriert im weissen Himmel – und das **Auto steht davor** (Titel liegt hinter dem Fahrzeug). Technik: Hero-Bild ist ein WebP mit transparentem Himmel (`public/img/hero-lancia-delta-freigestellt.webp`, Auto + Boden opak), H1 absolut dahinter, Grössen/Offsets in vw pro Breakpoint (`components/sections/Hero.tsx`). Kurzzeile, Text, Buttons zentriert unter dem Bild. Nie Kästen über das Auto legen.
- Abschnittsköpfe zentriert (`Abschnittskopf`), Karten-/Fliesstext linksbündig; 8-px-Raster, Inhaltsbreite `max-w-6xl`, Sektionen `py-14 sm:py-20`.
- Motion: nur `.reveal` (Opacity/10 px) + Hover-Unterstreichung; `prefers-reduced-motion` schaltet alles ab.
- Touch-Ziele ≥ 44 px (`min-h-11`/`min-h-12`), sichtbarer Fokus global (`:focus-visible`), Kontraste ≥ 4.5:1 (gemessen, siehe Prüfbericht).
- Kein Reskin anderer Demos; keine erfundenen Fakten, Statistiken oder Bewertungen.

## Inhaltsregeln

- Nur Fakten der alten Website (`docs/INHALTSINVENTUR.md`). Keine Preise, Leistungen, Team, Bewertungen erfinden.
- Rechtstexte: Impressum nur belegte Angaben; Datenschutz ist ein gekennzeichneter Entwurf.
- Kontaktformular öffnet **mailto** – keine Versandbestätigung vortäuschen.

## Deployment & Wartung

- Vercel-Env als Type «Config» (nicht «Secret»). Variablen: siehe `.env.example`.
- Sanity-Projekt-ID vor dem Eintragen per GROQ gegen `siteSettings.firmenname` prüfen (mehrere Kunden auf Sanity!).
- Doku: `docs/HANDOVER.md` (Technik, Konten, Backup), `docs/KUNDENANLEITUNG.md`, `docs/DOMAIN-UMSTELLUNG.md`.
- Keine Zugangsdaten in Repo, Doku oder diese Datei.
