import { bausteinTypen } from "./bausteine";
import { bildMitAlt, fliesstext, linkziel } from "./objekte";
import { seite } from "./seite";
import { siteSettings } from "./siteSettings";
import { standort } from "./standort";

export const schemaTypes = [siteSettings, standort, seite, bildMitAlt, linkziel, fliesstext, ...bausteinTypen];
