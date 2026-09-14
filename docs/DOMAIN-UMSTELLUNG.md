# Umstellung auf die Kundendomain garageklausner.ch

Reihenfolge ist wichtig: erst Inhalte final, dann Domain, dann Indexierung freigeben.

1. **Inhalte final:** Impressum (UID/Handelsregister), Datenschutz rechtlich prüfen lassen, offene Punkte aus
   `docs/INHALTSINVENTUR.md` klären.
2. **Vercel:** Projekt → Settings → Domains → `garageklausner.ch` und `www.garageklausner.ch` hinzufügen.
   Vercel zeigt die nötigen DNS-Einträge (A-Record `76.76.21.21` für Apex, CNAME `cname.vercel-dns.com` für www).
   Eine der beiden als primär wählen, die andere leitet Vercel automatisch mit 308 um.
3. **DNS bei Hostpoint** entsprechend setzen; alte Website-Zuordnung (cm4all) entfernen. TTL vorher senken.
4. **Umgebungsvariable** `SITE_URL=https://www.garageklausner.ch` (bzw. ohne www, je nach Wahl) in Vercel setzen
   und neu deployen → Canonicals, Sitemap und OpenGraph-URLs zeigen auf die Domain.
5. **Sanity CORS**: neue Domain mit «Allow credentials» eintragen (sonst Studio unter der Domain weiss).
6. **Demo-Modus aus:** Studio → Website-Einstellungen → «Demo-Modus» ausschalten. Damit:
   `noindex` verschwindet, `robots.txt` erlaubt alles ausser `/studio` und `/api`, Sitemap wird eingetragen.
7. **Weiterleitungen:** die alte Seite hatte nur `/pid_801324/`. In `next.config.ts` unter `redirects()`
   `/pid_801324` und `/pid_801324/` → `/` (301) eintragen, damit alte Links und Google-Einträge nicht ins Leere laufen.
8. **Google Search Console:** Domain-Property anlegen (DNS-TXT), Sitemap `https://<domain>/sitemap.xml` einreichen,
   Google-Unternehmensprofil («Garage Weinberg» / Garage Elefant) mit der neuen Website-URL aktualisieren.
9. **GitHub Pages** ist immer `noindex` (im Code fest, unabhängig vom Demo-Modus) und kann als Spiegel bleiben
   oder per deaktiviertem Workflow abgeschaltet werden.
10. **Prüfen:** `curl -I https://garageklausner.ch` (200, keine `x-robots-tag: noindex`), `/robots.txt`, `/sitemap.xml`,
    Rich-Results-Test für die JSON-LD-Daten (`AutoRepair`).
