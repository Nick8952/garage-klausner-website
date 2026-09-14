import { defineField, defineType } from "sanity";

export const standort = defineType({
  name: "standort",
  title: "Werkstatt",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", description: "Z. B. «Hofackerstrasse» oder «Garage Elefant».", validation: (r) => r.required() }),
    defineField({ name: "strasse", title: "Strasse und Nummer", type: "string", validation: (r) => r.required() }),
    defineField({ name: "plzOrt", title: "PLZ und Ort", type: "string", validation: (r) => r.required() }),
    defineField({ name: "telefon", title: "Telefon", type: "string", description: "Anzeigeform, z. B. 044 381 47 17.", validation: (r) => r.required() }),
    defineField({ name: "email", title: "E-Mail", type: "string", validation: (r) => r.required().email() }),
    defineField({
      name: "oeffnungszeiten",
      title: "Öffnungszeiten",
      type: "array",
      description: "Eine Zeile pro Tagesgruppe. Leer lassen, wenn nur «Termin auf Anfrage» gilt.",
      of: [
        {
          type: "object",
          name: "zeitzeile",
          title: "Zeile",
          fields: [
            defineField({ name: "tage", title: "Tage", type: "string", description: "Z. B. «Montag bis Freitag».", validation: (r) => r.required() }),
            defineField({ name: "zeiten", title: "Zeiten", type: "string", description: "Z. B. «08:00–12:00, 13:30–17:30».", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "tage", subtitle: "zeiten" } },
        },
      ],
    }),
    defineField({ name: "hinweis", title: "Hinweis", type: "string", description: "Z. B. «Termin auf Anfrage».", }),
    defineField({
      name: "kartenLink",
      title: "Link zur Karte",
      type: "url",
      description: "Google-Maps-Adresse des Standorts (öffnet in neuem Fenster).",
      validation: (r) => r.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "reihenfolge",
      title: "Reihenfolge",
      type: "number",
      description: "Kleinere Zahl zuerst.",
      initialValue: 1,
    }),
  ],
  orderings: [{ title: "Reihenfolge", name: "reihenfolge", by: [{ field: "reihenfolge", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "strasse" } },
});
