import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "./DisableDraftMode";

/** Overlays fürs Visual Editing + Leiste zum Beenden – nur im Draft Mode gerendert. */
export function Entwurfswerkzeuge() {
  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
    </>
  );
}
