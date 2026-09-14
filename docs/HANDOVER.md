# Technische Übergabe – garage-klausner-website

Verkaufs-Demo für die Garage Elefant Klausner AG, Zürich. Neubau der einseitigen Website
garageklausner.ch als Next.js-Website mit Sanity-CMS.

## Adressen

| Was | Wo |
|---|---|
| Quellcode | https://github.com/Nick8952/garage-klausner-website |
| Hauptdemo (Vercel) | siehe Vercel-Projekt `garage-klausner-website` → `https://garage-klausner-website.vercel.app` (Adresse nach dem Import prüfen) |
| Studio (Inhalte bearbeiten) | `<Vercel-Adresse>/studio` |
| Zweitauslieferung GitHub Pages | https://nick8952.github.io/garage-klausner-website/ (statisch, ohne Studio/Vorschau) |
| Sanity-Projekt | sanity.io/manage → Projekt «Garage Klausner» (Projekt-ID in Vercel/`.env.local`) |

## Architektur in einem Absatz

Next.js 16 (App Router, TypeScript, Tailwind 4) rendert Seiten aus Sanity-Dokumenten. Jede Seite
(`seite`) besteht aus Bausteinen (Hero, Text, Werkstätten, Bild, Text neben Bild, Aufruf, Kontaktformular,
Fragen & Antworten). Werkstätten (`standort`) sind eigene Dokumente und werden vom Baustein «Werkstätten»
automatisch eingeblendet. `siteSettings` hält Name, Logo, Telefon, Navigation, Fusszeile, SEO, Demo-Modus.
Ohne konfiguriertes Sanity-Projekt läuft die Website mit den identisch geformten Rückfall-Daten aus `data/`.
Sanity-Änderungen erscheinen auf Vercel per **Live Content API** (`next-sanity/live`) ohne Deployment;
`/api/revalidate` ist nur Rückversicherung. Draft Mode + Visual Editing laufen über das Presentation-Tool im Studio.

## Einrichtung (einmalig)

### 1. Sanity-Projekt anlegen

```bash
npx sanity@latest login                      # Browser-Login (Google/GitHub/E-Mail)
npx sanity@latest projects create --organization <org-id> "Garage Klausner"   # oder im Web: sanity.io/manage
npx sanity@latest dataset create production --visibility public   # public: Bilder/Inhalte lesbar ohne Token
```

- **Tokens** (sanity.io/manage → Projekt → API → Tokens):
  - `Viewer`-Token → `SANITY_API_READ_TOKEN` (Vercel + `.env.local`) – für Entwürfe/Vorschau.
  - `Editor`-Token → `SANITY_API_WRITE_TOKEN` (nur `.env.local`, nur für `npm run seed`, danach löschen).
- **CORS** (API → CORS origins): `http://localhost:3000` und die Vercel-Adresse, jeweils «Allow credentials». Ohne das bleibt das Studio weiss.
- **Mitglieder**: Kunde als «Editor» einladen (E-Mail genügt, kein GitHub-Konto nötig).

### 2. Inhalte einspielen

```bash
cp .env.example .env.local   # Werte eintragen
npm install
npm run seed                 # legt fehlende Dokumente an, lädt Bilder hoch
# npm run seed -- --reset    # überschreibt bewusst alles mit dem Stand aus data/
```

### 3. Vercel

1. vercel.com → Add New → Project → GitHub-Repo `garage-klausner-website` importieren (Framework: Next.js, keine Sonderwerte).
2. Environment Variables (Type **Config**, nicht «Secret» – sonst nie wieder lesbar):
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`,
   `NEXT_PUBLIC_SANITY_API_VERSION=2026-09-01`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `SITE_URL=https://<projekt>.vercel.app`.
3. Deploy. Danach im Studio (`/studio`) das Presentation-Tool («Vorschau») öffnen – es benutzt automatisch die eigene Adresse.
4. Optional Webhook als Rückversicherung: sanity.io/manage → API → Webhooks → URL `https://<projekt>.vercel.app/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`, Trigger create/update/delete, Feld «Secret» leer lassen.

### 4. GitHub Pages (Zweitauslieferung, statisch)

- Repo → Settings → Pages → Source «GitHub Actions». Der Workflow `.github/workflows/pages.yml` baut bei jedem Push auf `main`.
- Repo → Settings → Secrets and variables → Actions → **Variables**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. Ohne sie baut der Export aus `data/`.
- Damit ein Sanity-Publish auch dort erscheint: Fine-grained GitHub-Token (nur dieses Repo, Permission «Contents: Read and write») anlegen und in Sanity einen zweiten Webhook setzen:
  - URL `https://api.github.com/repos/Nick8952/garage-klausner-website/dispatches`, Methode POST
  - Headers: `Authorization: Bearer <Token>`, `Accept: application/vnd.github+json`
  - Body (Projection): `{"event_type": "sanity-publish"}`
  - Das löst den Workflow per `repository_dispatch` aus (2–3 Minuten bis live).
- GitHub Pages hat **kein** Studio, keine Vorschau, kein Formular-Backend (braucht es nicht) – nur die Seiten.

## Entwicklung

```bash
npm run dev          # http://localhost:3000, Studio unter /studio
npm run build        # Produktions-Build (Vercel-Variante)
npm run build:pages  # statischer Export wie auf GitHub Pages (vorher app/api + app/studio nicht löschen – nur im Workflow)
npm run lint
npm run typecheck
```

## Umgebungsvariablen (ohne Werte)

| Name | Wo | Zweck |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Vercel, GitHub-Variable, `.env.local` | Sanity-Projekt |
| `NEXT_PUBLIC_SANITY_DATASET` | ebd. | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ebd. | Datumsstand der API |
| `SANITY_API_READ_TOKEN` | Vercel, `.env.local` | Viewer-Token für Entwürfe/Visual Editing |
| `SANITY_API_WRITE_TOKEN` | nur `.env.local` | Seed |
| `SANITY_REVALIDATE_SECRET` | Vercel | Webhook-Rückversicherung |
| `SITE_URL` | Vercel, Workflow | Canonical/Sitemap/OG |

## Kontoinhaberschaft und Übergabe an den Kunden

Ziel: Der Betrieb kann Website, Inhalte und Hosting ohne Nicks Konto weiterführen.

| Konto | Heute | Übergabe |
|---|---|---|
| GitHub-Repo | Nick8952 | Repo → Settings → Transfer ownership an ein Kunden-Konto/-Organisation; danach Vercel-Git-Verbindung neu setzen |
| Vercel-Projekt | Nicks Vercel-Konto | Projekt → Settings → Transfer to another team (Kunde braucht Vercel-Konto, Hobby-Plan reicht für die Demo; kommerzielle Nutzung verlangt Pro, ca. USD 20/Monat pro Mitglied) |
| Sanity-Projekt | Nicks Sanity-Konto | sanity.io/manage → Projekt → Settings → Transfer project an Kunden-Organisation; Kunde vorher als Administrator einladen |
| Domain garageklausner.ch | Kunde (Hostpoint) | bleibt beim Kunden; DNS auf Vercel zeigen (siehe `docs/DOMAIN-UMSTELLUNG.md`) |

## Export, Backup, Wiederherstellung

- **Inhalte**: `npx sanity@latest dataset export production backup.tar.gz` (mit Bildern). Zurückspielen: `npx sanity@latest dataset import backup.tar.gz production --replace`.
- **Versionsgeschichte**: jedes Sanity-Dokument hat im Studio eine Historie («Review changes»), einzelne Änderungen lassen sich dort zurücksetzen.
- **Code**: Git-Historie auf GitHub; jeder Vercel-Deploy ist einzeln wiederherstellbar (Deployments → «Promote to production»).
- **Notfall ohne Sanity**: Projekt-ID in Vercel entfernen → Website läuft mit `data/` (Stand der Übernahme) weiter.

## Laufende Kosten (Stand 09/2026, ohne Gewähr)

| Posten | Kosten |
|---|---|
| Sanity Free | CHF 0 (bis 20 Mitglieder, 100 GB Bandbreite/Monat, 10 Datasets – für diese Website weit ausreichend) |
| Vercel Hobby | CHF 0, aber nur für nicht-kommerzielle Nutzung; für die Kundenwebsite **Pro** ca. USD 20/Monat |
| GitHub (public Repo + Pages) | CHF 0 |
| Domain | bleibt beim bisherigen Anbieter (Hostpoint) |

## Wartung

- Abhängigkeiten ca. halbjährlich aktualisieren (`npm outdated`; Next/Sanity-Major-Versionen mit Changelog prüfen).
- Nach Updates: `npm run build`, `npm run lint`, Studio öffnen, eine Seite in der Vorschau prüfen.
- Sanity-API-Version (`NEXT_PUBLIC_SANITY_API_VERSION`) nur bewusst hochsetzen.

## Bekannte Fallen

- Vercel-Variable Type «Secret» ist nach dem Speichern nie wieder lesbar → «Config» verwenden.
- Mehrere Sanity-Kunden: Projekt-IDs vor dem Eintragen per GROQ (`*[_type=="siteSettings"][0].firmenname`) gegenprüfen.
- Stega-Zeichen aus dem Visual Editing landen in allen Strings; Werte in Logik/Metadata immer mit `stegaClean` bereinigen (bereits so umgesetzt in `lib/seo.ts`).
- Statischer Export: `next-sanity/live` und `next-sanity/visual-editing` werden in `next.config.ts` durch Stubs ersetzt (Server Actions sind im Export nicht erlaubt); `app/api` und `app/studio` löscht der Workflow vor dem Build.
