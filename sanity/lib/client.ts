import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: "/studio" },
});
