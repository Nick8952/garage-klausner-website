import { defineField, defineType } from "sanity";

/** Bild mit Pflicht-Beschreibung – für alle Bausteine gleich. */
export const bildMitAlt = defineType({
  name: "bildMitAlt",
  title: "Bild",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Bildbeschreibung",
      type: "string",
      description: "Was ist zu sehen? Wird vorgelesen und von Suchmaschinen gelesen. Z. B. «Roter Lancia Delta auf einer Landstrasse».",
      validation: (r) => r.required().max(160),
    }),
  ],
});

/** Interner oder externer Link – Schaltflächen in Bausteinen. */
export const linkziel = defineType({
  name: "linkziel",
  title: "Schaltfläche",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Beschriftung", type: "string", validation: (r) => r.required().max(40) }),
    defineField({ name: "seite", title: "Interne Seite", type: "reference", to: [{ type: "seite" }], description: "Entweder eine Seite wählen …" }),
    defineField({ name: "url", title: "… oder externe Adresse", type: "string", description: "Z. B. https://…, tel:0443814717 oder mailto:…" }),
    defineField({ name: "primaer", title: "Hervorgehoben", type: "boolean", initialValue: false, description: "Rote Schaltfläche statt Umriss." }),
  ],
  validation: (r) =>
    r.custom((v: { seite?: unknown; url?: string } | undefined) =>
      v && !v.seite && !v.url ? "Bitte eine Seite wählen oder eine Adresse eintragen." : true,
    ),
  preview: { select: { title: "label", subtitle: "url" } },
});

/** Fliesstext mit wenigen, bewusst gewählten Formaten. */
export const fliesstext = defineType({
  name: "fliesstext",
  title: "Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Zwischentitel", value: "h3" },
      ],
      lists: [{ title: "Aufzählung", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({ name: "href", title: "Adresse", type: "string", description: "https://…, mailto:… oder tel:…", validation: (r) => r.required() }),
            ],
          },
        ],
      },
    },
  ],
});
