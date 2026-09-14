import type { HeroBaustein } from "@/lib/types";
import { Bild } from "../ui/Bild";
import { Button } from "../ui/Button";

/**
 * Hero nach dem Vorbild der alten Seite: Titel oben im hellen Himmel, das Auto unverdeckt,
 * Text und Schaltflächen unten.
 * - Ab lg: Vollbild – das Bild füllt die ganze Fläche, Text/Buttons liegen unten auf Wiese/Strasse
 *   (weicher dunkler Verlauf). Titel oben links.
 * - Darunter: gestapelt – Titel, dann das Bild in voller Breite und ganzer Höhe (Auto komplett sichtbar),
 *   dann Text und Buttons. So wird auf dem Handy nichts vom Auto abgeschnitten oder verdeckt.
 */
export function Hero({ b }: { b: HeroBaustein }) {
  return (
    <section
      className="relative isolate flex flex-col overflow-hidden bg-[#e4e8ec] lg:min-h-[86svh] lg:bg-halle-dunkel"
      aria-labelledby={`${b._key}-titel`}
    >
      <Bild
        bild={b.bild}
        sizes="100vw"
        priority
        className="order-2 aspect-[4/3] w-full object-cover object-[50%_62%] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-20 lg:order-none lg:aspect-auto lg:h-full lg:object-[50%_45%]"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-[46%] bg-gradient-to-t from-tinte/85 via-tinte/45 to-transparent lg:block" aria-hidden="true" />

      <div className="order-1 mx-auto w-full max-w-6xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12 lg:order-none lg:pt-14 lg:pb-0">
        {b.kurzzeile && <p className="kurzzeile mb-2 !text-blau">{b.kurzzeile}</p>}
        <h1 id={`${b._key}-titel`} className="display max-w-4xl text-[2.7rem] text-tinte sm:text-[4rem] lg:text-[5.4rem]">
          {b.titel}
        </h1>
      </div>

      <div className="order-3 mx-auto mt-auto w-full max-w-6xl bg-halle px-4 pt-6 pb-10 sm:px-6 sm:pb-12 lg:order-none lg:bg-transparent lg:pt-0 lg:pb-16">
        <div className="max-w-xl lg:text-white">
          {b.text && <p className="text-lg text-grau lg:text-white/90 lg:drop-shadow-[0_1px_6px_rgba(0,0,0,.45)]">{b.text}</p>}
          {!!b.schaltflaechen?.length && (
            <div className="mt-5 flex flex-wrap gap-3">
              {b.schaltflaechen.map((l) => (
                <Button key={l.label} link={l} variante={l.primaer ? "primaer" : "umriss"} className={l.primaer ? "" : "lg:border-white/50 lg:bg-white/10 lg:text-white lg:backdrop-blur-sm lg:hover:bg-white lg:hover:text-tinte"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
