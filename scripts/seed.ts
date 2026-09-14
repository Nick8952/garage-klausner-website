/**
 * Schiebt die Inhalte aus data/ und die Bilder aus public/img einmalig nach Sanity.
 *
 *   npm run seed            legt nur an, was fehlt (Kundenänderungen bleiben unangetastet)
 *   npm run seed -- --reset überschreibt alle Seed-Dokumente mit dem Stand aus data/
 *
 * Braucht in .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN (Rolle Editor).
 */
import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { seitenRoh } from "../lib/content";
import { textToBlocks } from "../lib/blocks";
import siteJson from "../data/site.json";
import standorteJson from "../data/standorte.json";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Fehlt: NEXT_PUBLIC_SANITY_PROJECT_ID und/oder SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}
const reset = process.argv.includes("--reset");
const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-01", useCdn: false });

type Bild = { src: string; alt: string };
type RohLink = { label: string; slug?: string; url?: string; primaer?: boolean };

const bildCache = new Map<string, string>();
async function bildRef(b: Bild) {
  const datei = join(process.cwd(), "public", b.src);
  const daten = readFileSync(datei);
  const hash = createHash("sha1").update(daten).digest("hex").slice(0, 12);
  let assetId = bildCache.get(hash);
  if (!assetId) {
    // Sanity dedupliziert identische Dateien selbst – ein zweiter Lauf lädt nichts doppelt hoch.
    const asset = await client.assets.upload("image", daten, { filename: basename(b.src) });
    assetId = asset._id;
    bildCache.set(hash, assetId);
    console.log("Bild:", b.src, "→", assetId);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: b.alt };
}

const seitenId = (slug: string) => `seite-${slug}`;
const link = (l: RohLink, key: string) => ({
  _key: key,
  _type: "linkziel",
  label: l.label,
  primaer: !!l.primaer,
  ...(l.url ? { url: l.url } : {}),
  ...(l.slug ? { seite: { _type: "reference", _ref: seitenId(l.slug) } } : {}),
});
const links = (arr: RohLink[] | undefined, prefix: string) => arr?.map((l, i) => link(l, `${prefix}-${i}`)) ?? [];

async function baustein(b: Record<string, unknown>, key: string) {
  const out: Record<string, unknown> = { ...b, _key: key };
  if (b.bild) out.bild = await bildRef(b.bild as Bild);
  if (typeof b.text === "string" && (b._type === "textBaustein" || b._type === "textBildBaustein")) out.text = textToBlocks(b.text, `${key}-`);
  if (Array.isArray(b.schaltflaechen)) out.schaltflaechen = links(b.schaltflaechen as RohLink[], `${key}-l`);
  return out;
}

async function main() {
  const docs: Record<string, unknown>[] = [];

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    firmenname: siteJson.firmenname,
    kurzname: siteJson.kurzname,
    claim: siteJson.claim,
    logo: await bildRef(siteJson.logo),
    telefon: siteJson.telefon,
    email: siteJson.email,
    navigation: siteJson.navigation.map((n, i) => ({ _key: `nav-${i}`, _type: "navEintrag", label: n.label, seite: { _type: "reference", _ref: seitenId(n.slug) } })),
    footerLinks: siteJson.footerLinks.map((n, i) => ({ _key: `foot-${i}`, _type: "footerLink", label: n.label, seite: { _type: "reference", _ref: seitenId(n.slug) } })),
    footerText: siteJson.footerText,
    seoTitelZusatz: siteJson.seoTitelZusatz,
    seoBeschreibung: siteJson.seoBeschreibung,
    demoModus: siteJson.demoModus,
  });

  for (const s of standorteJson) {
    docs.push({
      ...s,
      _type: "standort",
      oeffnungszeiten: s.oeffnungszeiten.map((z, i) => ({ _key: `z-${i}`, _type: "zeitzeile", ...z })),
    });
  }

  for (const seite of seitenRoh) {
    const bausteine = [];
    for (const [i, b] of seite.bausteine.entries()) bausteine.push(await baustein(b as Record<string, unknown>, `${seite.slug}-${i}`));
    docs.push({
      _id: seitenId(seite.slug),
      _type: "seite",
      titel: seite.titel,
      slug: { _type: "slug", current: seite.slug },
      seoTitel: "seoTitel" in seite ? seite.seoTitel : undefined,
      seoBeschreibung: seite.seoBeschreibung,
      bausteine,
    });
  }

  // Referenzen zeigen auf Seiten, die im selben Lauf entstehen – deshalb eine Transaktion.
  let tx = client.transaction();
  for (const d of docs) tx = reset ? tx.createOrReplace(d as never) : tx.createIfNotExists(d as never);
  const result = await tx.commit();
  console.log(`${reset ? "Überschrieben" : "Angelegt (falls fehlend)"}: ${docs.length} Dokumente (Transaktion ${result.transactionId}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
