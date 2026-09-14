import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set(["siteSettings"]);

// Seitenleiste im Studio: das Häufigste zuerst, Einstellungen als Einzeldokument ohne «Neu»-Knopf.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem().title("Seiten").schemaType("seite").child(S.documentTypeList("seite").title("Seiten")),
      S.listItem().title("Werkstätten").schemaType("standort").child(S.documentTypeList("standort").title("Werkstätten").defaultOrdering([{ field: "reihenfolge", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Website-Einstellungen").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
