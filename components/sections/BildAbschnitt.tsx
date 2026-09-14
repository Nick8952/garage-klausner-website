import { stegaClean } from "next-sanity";
import type { BildBaustein } from "@/lib/types";
import { Bild } from "../ui/Bild";
import { Reveal } from "../ui/Reveal";

export function BildAbschnitt({ b }: { b: BildBaustein }) {
  const voll = stegaClean(b.breite) === "voll";
  return (
    <Reveal as="section" className={`py-8 ${voll ? "" : "mx-auto max-w-6xl px-4 sm:px-6"}`}>
      <figure>
        <Bild bild={b.bild} sizes={voll ? "100vw" : "(min-width: 1152px) 1152px, 100vw"} className={`h-auto w-full object-cover ${voll ? "" : "rounded-sm"}`} />
        {b.bildunterschrift && <figcaption className="mono mt-3 px-4 text-sm text-grau sm:px-0">{b.bildunterschrift}</figcaption>}
      </figure>
    </Reveal>
  );
}
