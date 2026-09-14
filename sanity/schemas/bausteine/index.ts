import { defineField, defineType } from "sanity";

const bausteinLabel = (typ: string) => (titel?: string) => ({ title: titel || "(ohne Titel)", subtitle: typ });

export const heroBaustein = defineType({
  name: "heroBaustein",
  title: "Grosses Bild mit Titel (Hero)",
  type: "object",
  description: "Der Einstieg einer Seite: Bild, Kurzzeile, Titel und Schaltflächen. Am besten nur einmal, ganz oben.",
  fields: [
    defineField({ name: "kurzzeile", title: "Kurzzeile über dem Titel", type: "string", description: "Z. B. «Familienbetrieb seit Generationen».", validation: (r) => r.max(60) }),
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required().max(80) }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (r) => r.max(300) }),
    defineField({ name: "bild", title: "Bild", type: "bildMitAlt", validation: (r) => r.required() }),
    defineField({ name: "schaltflaechen", title: "Schaltflächen", type: "array", of: [{ type: "linkziel" }], validation: (r) => r.max(2) }),
  ],
  preview: { select: { titel: "titel", media: "bild" }, prepare: ({ titel, media }) => ({ ...bausteinLabel("Hero")(titel), media }) },
});

export const textBaustein = defineType({
  name: "textBaustein",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "kurzzeile", title: "Kurzzeile", type: "string", validation: (r) => r.max(60) }),
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.max(90) }),
    defineField({ name: "text", title: "Text", type: "fliesstext" }),
    defineField({
      name: "breite",
      title: "Breite",
      type: "string",
      options: { list: [{ title: "Schmal (gut lesbar)", value: "schmal" }, { title: "Breit", value: "breit" }], layout: "radio" },
      initialValue: "schmal",
    }),
  ],
  preview: { select: { titel: "titel" }, prepare: ({ titel }) => bausteinLabel("Text")(titel) },
});

export const standorteBaustein = defineType({
  name: "standorteBaustein",
  title: "Werkstätten (Adressen & Öffnungszeiten)",
  type: "object",
  description: "Zeigt alle Werkstätten aus dem Bereich «Werkstätten» automatisch an.",
  fields: [
    defineField({ name: "kurzzeile", title: "Kurzzeile", type: "string" }),
    defineField({ name: "titel", title: "Titel", type: "string", initialValue: "Werkstätten" }),
    defineField({ name: "text", title: "Einleitung", type: "text", rows: 2 }),
  ],
  preview: { select: { titel: "titel" }, prepare: ({ titel }) => bausteinLabel("Werkstätten")(titel) },
});

export const bildBaustein = defineType({
  name: "bildBaustein",
  title: "Bild mit Bildunterschrift",
  type: "object",
  fields: [
    defineField({ name: "bild", title: "Bild", type: "bildMitAlt", validation: (r) => r.required() }),
    defineField({ name: "bildunterschrift", title: "Bildunterschrift", type: "string", validation: (r) => r.max(160) }),
    defineField({
      name: "breite",
      title: "Breite",
      type: "string",
      options: { list: [{ title: "Inhaltsbreite", value: "inhalt" }, { title: "Volle Breite", value: "voll" }], layout: "radio" },
      initialValue: "inhalt",
    }),
  ],
  preview: { select: { titel: "bildunterschrift", media: "bild" }, prepare: ({ titel, media }) => ({ ...bausteinLabel("Bild")(titel), media }) },
});

export const textBildBaustein = defineType({
  name: "textBildBaustein",
  title: "Text neben Bild",
  type: "object",
  fields: [
    defineField({ name: "kurzzeile", title: "Kurzzeile", type: "string" }),
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Text", type: "fliesstext" }),
    defineField({ name: "bild", title: "Bild", type: "bildMitAlt", validation: (r) => r.required() }),
    defineField({ name: "bildRechts", title: "Bild rechts (sonst links)", type: "boolean", initialValue: true }),
    defineField({ name: "schaltflaechen", title: "Schaltflächen", type: "array", of: [{ type: "linkziel" }], validation: (r) => r.max(2) }),
  ],
  preview: { select: { titel: "titel", media: "bild" }, prepare: ({ titel, media }) => ({ ...bausteinLabel("Text neben Bild")(titel), media }) },
});

export const ctaBaustein = defineType({
  name: "ctaBaustein",
  title: "Aufruf (farbiger Kasten mit Schaltfläche)",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required().max(90) }),
    defineField({ name: "text", title: "Text", type: "text", rows: 2, validation: (r) => r.max(240) }),
    defineField({ name: "schaltflaechen", title: "Schaltflächen", type: "array", of: [{ type: "linkziel" }], validation: (r) => r.min(1).max(2) }),
  ],
  preview: { select: { titel: "titel" }, prepare: ({ titel }) => bausteinLabel("Aufruf")(titel) },
});

export const kontaktFormularBaustein = defineType({
  name: "kontaktFormularBaustein",
  title: "Kontaktformular (öffnet E-Mail-Programm)",
  type: "object",
  description: "Das Formular sendet nichts selbst: Es öffnet das E-Mail-Programm der Besucherin mit vorausgefüllter Nachricht.",
  fields: [
    defineField({ name: "kurzzeile", title: "Kurzzeile", type: "string" }),
    defineField({ name: "titel", title: "Titel", type: "string", initialValue: "Anfrage" }),
    defineField({ name: "text", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "betreff", title: "Betreff der E-Mail", type: "string", initialValue: "Anfrage über die Website" }),
    defineField({
      name: "hinweisNachAbsenden",
      title: "Hinweis nach dem Klick",
      type: "text",
      rows: 2,
      description: "Wird angezeigt, nachdem sich das E-Mail-Programm geöffnet hat.",
      initialValue: "Ihr E-Mail-Programm sollte sich jetzt geöffnet haben. Falls nicht, schreiben Sie uns direkt an die Adresse der gewünschten Werkstatt.",
    }),
  ],
  preview: { select: { titel: "titel" }, prepare: ({ titel }) => bausteinLabel("Kontaktformular")(titel) },
});

export const faqBaustein = defineType({
  name: "faqBaustein",
  title: "Fragen & Antworten (aufklappbar)",
  type: "object",
  fields: [
    defineField({ name: "kurzzeile", title: "Kurzzeile", type: "string" }),
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({
      name: "fragen",
      title: "Fragen",
      type: "array",
      of: [
        {
          type: "object",
          name: "frage",
          title: "Frage",
          fields: [
            defineField({ name: "frage", title: "Frage", type: "string", validation: (r) => r.required() }),
            defineField({ name: "antwort", title: "Antwort", type: "fliesstext", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "frage" } },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { titel: "titel" }, prepare: ({ titel }) => bausteinLabel("Fragen & Antworten")(titel) },
});

export const bausteinTypen = [heroBaustein, textBaustein, standorteBaustein, bildBaustein, textBildBaustein, ctaBaustein, kontaktFormularBaustein, faqBaustein];
export const bausteinNamen = bausteinTypen.map((t) => ({ type: t.name }));
