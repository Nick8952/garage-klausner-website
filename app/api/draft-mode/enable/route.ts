import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

// Offizieller Weg (next-sanity): prüft, dass die Anfrage aus einer Studio-Sitzung stammt,
// und schaltet dann den Draft Mode ein. Der Token bleibt auf dem Server.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN || "" }),
});
