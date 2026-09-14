"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";
import { singletonTypes, structure } from "@/sanity/structure";

export default defineConfig({
  name: "garage-klausner",
  title: "Garage Klausner – Inhalte",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
  plugins: [
    structureTool({ structure, title: "Inhalte" }),
    presentationTool({
      title: "Vorschau",
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion, title: "Abfragen (Entwickler)" }),
  ],
});
