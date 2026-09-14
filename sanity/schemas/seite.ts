import { defineField, defineType } from "sanity";
import { bausteinNamen } from "./bausteine";

export const seite = defineType({
  name: "seite",
  title: "Seite",
  type: "document",
  groups: [
    { name: "inhalt", title: "Inhalt", default: true },
    { name: "seo", title: "Suchmaschinen" },
  ],
  fields: [
    defineField({ name: "titel", title: "Seitentitel", type: "string", group: "inhalt", validation: (r) => r.required().max(70) }),
    defineField({
      name: "slug",
      title: "Adresse (Slug)",
      type: "slug",
      group: "inhalt",
      description: "Teil der Web-Adresse, z. B. «werkstaetten» → garageklausner.ch/werkstaetten. Die Startseite heisst «start».",
      options: { source: "titel", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bausteine",
      title: "Bausteine",
      type: "array",
      group: "inhalt",
      description: "Die Seite von oben nach unten. Bausteine per Ziehen umordnen, mit «+» neue hinzufügen.",
      of: bausteinNamen,
      validation: (r) => r.min(1).error("Eine Seite braucht mindestens einen Baustein."),
    }),
    defineField({
      name: "seoTitel",
      title: "Titel für Suchmaschinen",
      type: "string",
      group: "seo",
      description: "Optional. Sonst wird der Seitentitel verwendet. Maximal 60 Zeichen.",
      validation: (r) => r.max(60).warning("Titel über 60 Zeichen werden in Suchergebnissen gekürzt."),
    }),
    defineField({
      name: "seoBeschreibung",
      title: "Beschreibung für Suchmaschinen",
      type: "text",
      rows: 3,
      group: "seo",
      description: "1–2 Sätze, die diese Seite zusammenfassen. Maximal 160 Zeichen.",
      validation: (r) => r.max(160).warning("Google kürzt Beschreibungen über 160 Zeichen."),
    }),
  ],
  preview: { select: { title: "titel", subtitle: "slug.current" }, prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/${subtitle === "start" ? "" : subtitle}` : "" }) },
});
