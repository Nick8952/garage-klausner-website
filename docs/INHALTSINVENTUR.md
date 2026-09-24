# Inhaltsinventur – garageklausner.ch → Demo

Stand der Erfassung: 14.09.2026. Quelle: https://www.garageklausner.ch/ (Hostpoint/cm4all-Baukasten).

## Umfang der bisherigen Website

- **Eine einzige Seite** (`/pid_801324/`, Sitemap enthält nur diese URL). Nur Deutsch.
- **Nicht vorhanden** auf der alten Seite: Impressum, AGB, Datenschutzerklärung, Preise,
  Leistungsliste, Team, Kundenbewertungen, Downloads, Kurstermine, Kontaktformular, Karte
  (nur ein Link), Sprachversionen. Es wurde nichts davon erfunden.
- Cookie-Banner (cm4all-Widget) ohne eigenen Datenschutztext – in der Demo nicht nötig
  (keine Cookies, kein Tracking).

## Übernommene Inhalte

| Inhalt | Quelle (alte Seite) | Zielseite Demo | Status |
|---|---|---|---|
| Firmenname «Garage Elefant Klausner AG» | `<title>`, Fusszeile | Kopf-/Fusszeile, Impressum, JSON-LD | übernommen |
| Titel «GARAGE KLAUSNER» (im Hero-Bild eingebrannt) | Header-Bild | Hero-Titel als Text | übernommen (als echter Text statt Grafik) |
| «WERKSTÄTTEN» | H1 | Startseite + `/werkstaetten` | übernommen |
| Hofackerstrasse 74, 8032 Zürich · 044 381 47 17 · elefant@garageklausner.ch · Mo–Fr 08:00–12:00, 13:30–17:30 | Abschnitt Hofackerstrasse | Werkstatt-Karte, Fusszeile, Impressum, JSON-LD | übernommen; **Öffnungszeiten am 24.09.2026 auf Nicks Anweisung durch Google-Maps-Zeiten ersetzt: Mo–Fr 07:30–12:00, 13:30–18:00, Sa/So geschlossen** |
| Weinbergstrasse 62, 8006 Zürich · 044 525 19 95 · weinberg@garageklausner.ch · «Termin auf Anfrage» | Abschnitt Weinbergstrasse | Werkstatt-Karte, Fusszeile, Impressum, JSON-LD | übernommen; **«Termin auf Anfrage» am 24.09.2026 auf Nicks Anweisung durch Google-Maps-Zeiten ersetzt: Mo–Fr 07:30–18:00, Sa/So geschlossen** |
| «Familienbetrieb seit Generationen» | H2 | Kurzzeile Hero, Abschnitt «Über uns», `/familienbetrieb` | übernommen |
| «Wir freuen uns über Ihren besuch auf unserer Website.» | Text | `/familienbetrieb`, Startseite | übernommen, Tippfehler «besuch» → «Besuch» |
| «Ob alte Klassiker oder moderne Elektrofahrzeuge, wir kümmern uns gerne um Ihr Anliegen.» | Text | Hero-Text, `/familienbetrieb` | übernommen, Komma → Gedankenstrich, Aussage unverändert |
| «Erreichbar unter: 044 381 47 17 / Garage Elefant, Hofackerstrasse 74 / Email Kontakt elefant@…» | Fusszeile | Aufruf-Kasten Startseite, Fusszeile | übernommen |
| Google-Maps-Link Weinbergstrasse | Link auf «Weinbergstrasse 62 …» | Karte-Link Werkstatt Weinbergstrasse | übernommen (Original-URL) |
| mailto-Links beider Werkstätten | Links | Werkstatt-Karten, Fusszeile | übernommen |

## Bilder (Freigabe durch Nick am 14.09.2026)

| Datei | Herkunft (Original-URL) | Verwendung | Bearbeitung |
|---|---|---|---|
| `assets/originals/garageklausnerlogo_2024_web.png` (595×595) | `/.cm4all/uproc.php/0/.garageklausnerlogo_2024_web.png/picture-1200` | Logo Kopfzeile, Favicon (`app/icon.png`) | nur verkleinert |
| `assets/originals/delta_headerbild_web.png` (2250×1193, transparenter Himmel) | `/.cm4all/uproc.php/0/.delta_headerbild_web.png/picture-2600` | Hero-Bild | eingebrannter roter Schriftzug «GARAGE KLAUSNER» entfernt (der Titel ist jetzt echter Text), leerer Bereich oben beschnitten, transparenter Himmel mit hellem Grauverlauf hinterlegt |
| `assets/originals/Sven 010.jpg` (2831×1835, Nikon D50, 2007 fotografiertes Album-Bild) | `/.cm4all/uproc.php/0/.Sven%20010.jpg/picture-2600` | Abschnitt «Familienbetrieb» | nur verkleinert, WebP |

Optimierte Web-Versionen liegen in `public/img/` und werden per `npm run seed` nach Sanity hochgeladen.

## Funktionen der alten Seite und ihre Abbildung

| Funktion alt | Demo |
|---|---|
| mailto-Links | mailto-Links + Kontaktformular, das eine vorbefüllte E-Mail im E-Mail-Programm öffnet (kein Server-Versand, keine falsche Versandbestätigung) |
| Google-Maps-Link (nur Weinbergstrasse) | «Auf der Karte anzeigen» bei beiden Werkstätten, externer Link |
| Cookie-Banner | eigener Hinweis-Banner (`components/CookieHinweis.tsx`), Text/Schalter in Sanity → Website-Einstellungen → «Cookie-Hinweis». Reiner Hinweis, kein Consent-Mechanismus, weil keine Tracking-Cookies gesetzt werden; Bestätigung liegt im Local Storage. |
| Kein Formular, keine Buchung, keine Einbindungen | – |

## Offene Liste: Widersprüche, Defekte, fehlende Angaben (nicht stillschweigend entschieden)

1. **Karten-Link Hofackerstrasse defekt** (`href="http://Hofackerstrasse"`). In der Demo durch eine
   Google-Maps-Suche nach «Hofackerstrasse 74, 8032 Zürich» ersetzt – kein Eintrag «Garage Elefant»
   verlinkt, weil keiner bekannt ist. **Vom Betrieb zu bestätigen.**
2. **Google-Maps-Eintrag heisst «Garage Weinberg»**, die Website nennt den Standort nur «Weinbergstrasse».
   Demo verwendet die Website-Bezeichnung. **Klären, ob «Garage Weinberg» ein eigener Firmenname ist.**
3. **Firmenname vs. Logo:** Website sagt «Garage Elefant Klausner AG», das Wappen «KLAUSNER AG».
   Demo verwendet den Website-Namen.
4. **Seitentitel der alten Seite endet mit «- » (leerer Zusatz)** – in der Demo durch saubere Titel ersetzt.
5. **Kein Impressum/keine Datenschutzerklärung vorhanden.** Demo-Impressum enthält nur belegte Angaben;
   Handelsregister-Nr./UID fehlen und sind im Text als «zu ergänzen» markiert. Die Datenschutz-Seite ist
   ein als solcher gekennzeichneter **Entwurf** (siehe unten).
6. **Öffnungszeiten: Website und Google Maps widersprechen sich.** Website: Hofackerstrasse 08:00–12:00/13:30–17:30, Weinbergstrasse «Termin auf Anfrage». Google Maps (Einträge «Klausner AG, Garage Elefant» und «Garage Weinberg», Stand 24.09.2026): Hofackerstrasse 07:30–12:00/13:30–18:00, Weinbergstrasse 07:30–18:00, beide Sa/So geschlossen. **Demo zeigt die Maps-Zeiten (Entscheid Nick, 24.09.2026). Vom Betrieb bestätigen lassen.**
7. **Keine Leistungsliste, keine Preise** – nicht erfunden; die Demo beschreibt nur «alte Klassiker und
   moderne Elektrofahrzeuge» wie das Original.
8. **E-Mail-Empfänger des Formulars** = die zwei E-Mail-Adressen der Website. Ob diese Postfächer aktiv
   gelesen werden, ist unbekannt.

## Datenschutz: nötige Anpassungen durch Vercel und Sanity (zur späteren rechtlichen Prüfung)

Die alte Website hatte keine Datenschutzerklärung. Der Demo-Entwurf (`/datenschutz`) nennt bereits:

- Hosting bei **Vercel Inc.** (USA) – Verarbeitung von Verbindungsdaten (IP, Zeitpunkt, URL) in Server-Logs.
- Inhalte/Bilder über **Sanity AS** (Norwegen), Bild-Auslieferung über `cdn.sanity.io`.
- Keine Cookies, kein Tracking, Kontaktformular ohne Server-Versand (mailto).
- Externe Links zu Google Maps.

**Nicht geprüft:** Formulierung nach revDSG/DSGVO, Auftragsverarbeitungsverträge (Vercel DPA, Sanity DPA),
ob GitHub Pages als zweite Auslieferung (GitHub Inc., USA) ebenfalls genannt werden muss, sobald der
Betrieb sie nutzt. Der Text ist ausdrücklich als Entwurf gekennzeichnet und **nicht** als rechtlich
für die neue Technik geprüft dargestellt.
