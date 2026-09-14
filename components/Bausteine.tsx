import type { Baustein, Standort } from "@/lib/types";
import { BildAbschnitt } from "./sections/BildAbschnitt";
import { Cta } from "./sections/Cta";
import { Faq } from "./sections/Faq";
import { Hero } from "./sections/Hero";
import { KontaktFormular } from "./sections/KontaktFormular";
import { Standorte } from "./sections/Standorte";
import { TextAbschnitt } from "./sections/TextAbschnitt";
import { TextBild } from "./sections/TextBild";

/** Rendert die Bausteine einer Seite in Reihenfolge. Der erste Baustein trägt die H1. */
export function Bausteine({ bausteine, standorte }: { bausteine: Baustein[]; standorte: Standort[] }) {
  return (
    <>
      {bausteine.map((b, i) => {
        const erster = i === 0;
        switch (b._type) {
          case "heroBaustein": return <Hero key={b._key} b={b} />;
          case "textBaustein": return <TextAbschnitt key={b._key} b={b} erster={erster} />;
          case "standorteBaustein": return <Standorte key={b._key} b={b} standorte={standorte} erster={erster} />;
          case "bildBaustein": return <BildAbschnitt key={b._key} b={b} />;
          case "textBildBaustein": return <TextBild key={b._key} b={b} erster={erster} />;
          case "ctaBaustein": return <Cta key={b._key} b={b} />;
          case "kontaktFormularBaustein": return <KontaktFormular key={b._key} b={b} standorte={standorte} erster={erster} />;
          case "faqBaustein": return <Faq key={b._key} b={b} erster={erster} />;
          default: return null;
        }
      })}
    </>
  );
}
