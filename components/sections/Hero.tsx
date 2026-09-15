import type { HeroBaustein } from "@/lib/types";
import { Bild } from "../ui/Bild";
import { Button } from "../ui/Button";

/**
 * Hero wie auf der alten Seite: der Schriftzug steht gross, rot und zentriert im Himmel,
 * das Auto fährt davor – der Titel liegt hinter dem Fahrzeug. Funktioniert, weil das Bild
 * einen transparenten Himmel hat (siehe Hilfetext im Studio). Kurzzeile, Text und
 * Schaltflächen folgen zentriert unter dem Bild.
 */
export function Hero({ b }: { b: HeroBaustein }) {
  return (
    <section className="bg-white" aria-labelledby={`${b._key}-titel`}>
      <div className="relative overflow-hidden pt-[30vw] sm:pt-[12vw] lg:pt-[6vw]">
        <h1
          id={`${b._key}-titel`}
          className="display hero-titel absolute inset-x-0 top-[17vw] z-0 mx-auto max-w-[9ch] px-4 text-center text-[12.5vw] uppercase leading-[0.9] text-rot sm:top-[14.2vw] sm:max-w-none sm:whitespace-nowrap sm:text-[6.6vw] lg:top-[6.6vw] lg:text-[6.4vw]"
        >
          {b.titel}
        </h1>
        <Bild
          bild={b.bild}
          sizes="(min-width: 1024px) 100vw, 175vw"
          priority
          className="relative z-10 -ml-[37%] h-auto w-[174%] max-w-none sm:-ml-[17%] sm:w-[134%] lg:ml-0 lg:w-full"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-14 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-12">
        {b.kurzzeile && <p className="kurzzeile mb-3 !text-grau">{b.kurzzeile}</p>}
        {b.text && <p className="mx-auto max-w-2xl text-lg text-grau sm:text-xl">{b.text}</p>}
        {!!b.schaltflaechen?.length && (
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {b.schaltflaechen.map((l) => (
              <Button key={l.label} link={l} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
