import { defineLive } from "next-sanity/live";
import { readToken } from "@/sanity/env";
import { client } from "./client";

// Live Content API (offizielle next-sanity-Anbindung): veröffentlichte Änderungen
// erscheinen ohne Webhook und ohne Deployment; mit Token zusätzlich Entwürfe im Draft Mode.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken,
});
