import type { PortableTextBlock } from "@portabletext/react";

export type Bild = { src: string; alt: string; width: number; height: number; lqip?: string | null };

export type Link = { label: string; href: string; primaer?: boolean };

export type Standort = {
  _id: string;
  name: string;
  strasse: string;
  plzOrt: string;
  telefon: string;
  email: string;
  oeffnungszeiten: { tage: string; zeiten: string }[];
  hinweis?: string;
  kartenLink?: string;
};

export type Site = {
  firmenname: string;
  kurzname: string;
  claim?: string;
  logo?: Bild | null;
  telefon: string;
  email: string;
  navigation: { label: string; href: string }[];
  footerLinks: { label: string; href: string }[];
  footerText?: string;
  seoTitelZusatz?: string;
  seoBeschreibung?: string;
  demoModus: boolean;
  cookieHinweisAnzeigen: boolean;
  cookieHinweisText?: string;
  cookieHinweisButton?: string;
};

type Basis = { _key: string };
export type HeroBaustein = Basis & { _type: "heroBaustein"; kurzzeile?: string; titel: string; text?: string; bild: Bild; schaltflaechen?: Link[] };
export type TextBaustein = Basis & { _type: "textBaustein"; kurzzeile?: string; titel?: string; text?: PortableTextBlock[]; breite?: "schmal" | "breit" };
export type StandorteBaustein = Basis & { _type: "standorteBaustein"; kurzzeile?: string; titel?: string; text?: string };
export type BildBaustein = Basis & { _type: "bildBaustein"; bild: Bild; bildunterschrift?: string; breite?: "inhalt" | "voll" };
export type TextBildBaustein = Basis & { _type: "textBildBaustein"; kurzzeile?: string; titel: string; text?: PortableTextBlock[]; bild: Bild; bildRechts?: boolean; schaltflaechen?: Link[] };
export type CtaBaustein = Basis & { _type: "ctaBaustein"; titel: string; text?: string; schaltflaechen?: Link[] };
export type KontaktFormularBaustein = Basis & { _type: "kontaktFormularBaustein"; kurzzeile?: string; titel?: string; text?: string; betreff?: string; hinweisNachAbsenden?: string };
export type FaqBaustein = Basis & { _type: "faqBaustein"; kurzzeile?: string; titel?: string; fragen: { _key: string; frage: string; antwort: PortableTextBlock[] }[] };

export type Baustein =
  | HeroBaustein | TextBaustein | StandorteBaustein | BildBaustein
  | TextBildBaustein | CtaBaustein | KontaktFormularBaustein | FaqBaustein;

export type Seite = {
  titel: string;
  slug: string;
  seoTitel?: string;
  seoBeschreibung?: string;
  bausteine: Baustein[];
};
