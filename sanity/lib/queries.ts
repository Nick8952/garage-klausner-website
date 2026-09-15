import { defineQuery } from "next-sanity";

// Bilder kommen als fertige Objekte (src/alt/width/height) – dieselbe Form wie die Rückfall-Daten.
const bild = `{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const link = `{
  label, primaer,
  "href": select(
    defined(url) => url,
    seite->slug.current == "start" => "/",
    defined(seite->slug.current) => "/" + seite->slug.current,
    "/"
  )
}`;

const navLink = `{ label, "href": select(seite->slug.current == "start" => "/", "/" + coalesce(seite->slug.current, "")) }`;

export const SITE_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  firmenname, kurzname, claim,
  "logo": select(defined(logo.asset) => logo${bild}, null),
  telefon, email,
  "navigation": coalesce(navigation[]${navLink}, []),
  "footerLinks": coalesce(footerLinks[]${navLink}, []),
  footerText, seoTitelZusatz, seoBeschreibung,
  "demoModus": coalesce(demoModus, true),
  "cookieHinweisAnzeigen": coalesce(cookieHinweisAnzeigen, true),
  cookieHinweisText, cookieHinweisButton
}`);

export const STANDORTE_QUERY = defineQuery(`*[_type == "standort"] | order(reihenfolge asc, name asc){
  _id, name, strasse, plzOrt, telefon, email,
  "oeffnungszeiten": coalesce(oeffnungszeiten[]{tage, zeiten}, []),
  hinweis, kartenLink
}`);

export const SEITE_QUERY = defineQuery(`*[_type == "seite" && slug.current == $slug][0]{
  titel, "slug": slug.current, seoTitel, seoBeschreibung,
  "bausteine": coalesce(bausteine[]{
    _type, _key,
    _type == "heroBaustein" => { kurzzeile, titel, text, "bild": bild${bild}, "schaltflaechen": schaltflaechen[]${link} },
    _type == "textBaustein" => { kurzzeile, titel, text, breite },
    _type == "standorteBaustein" => { kurzzeile, titel, text },
    _type == "bildBaustein" => { "bild": bild${bild}, bildunterschrift, breite },
    _type == "textBildBaustein" => { kurzzeile, titel, text, "bild": bild${bild}, bildRechts, "schaltflaechen": schaltflaechen[]${link} },
    _type == "ctaBaustein" => { titel, text, "schaltflaechen": schaltflaechen[]${link} },
    _type == "kontaktFormularBaustein" => { kurzzeile, titel, text, betreff, hinweisNachAbsenden },
    _type == "faqBaustein" => { kurzzeile, titel, "fragen": coalesce(fragen[]{ _key, frage, antwort }, []) }
  }, [])
}`);

export const SLUGS_QUERY = defineQuery(`*[_type == "seite" && defined(slug.current)].slug.current`);
