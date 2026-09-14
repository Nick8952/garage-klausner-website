import type { HeroBaustein } from "@/lib/types";
import { Bild } from "../ui/Bild";
import { Button } from "../ui/Button";

export function Hero({ b }: { b: HeroBaustein }) {
  return (
    <section className="relative" aria-labelledby={`${b._key}-titel`}>
      <div className="mx-auto max-w-7xl px-0 sm:px-6">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/8] lg:aspect-[21/8] sm:rounded-sm">
          <Bild bild={b.bild} sizes="(min-width: 1280px) 1280px, 100vw" priority className="absolute inset-0 h-full w-full object-cover object-[50%_35%] sm:object-center" />
        </div>
      </div>
      {/* Das «Werkstattschild»: liegt über der unteren Bildkante, linksbündig. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-10 max-w-2xl bg-blau px-6 py-7 text-white shadow-[0_18px_40px_-20px_rgba(18,20,26,.55)] sm:-mt-20 sm:px-9 sm:py-9">
          <div className="streifen absolute inset-x-0 top-0" aria-hidden="true" />
          {b.kurzzeile && <p className="kurzzeile mb-3 !text-gelb">{b.kurzzeile}</p>}
          <h1 id={`${b._key}-titel`} className="display text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem]">
            {b.titel}
          </h1>
          {b.text && <p className="mt-4 max-w-xl text-lg text-white/85">{b.text}</p>}
          {!!b.schaltflaechen?.length && (
            <div className="mt-7 flex flex-wrap gap-3">
              {b.schaltflaechen.map((l) => (
                <Button key={l.label} link={l} variante={l.primaer ? "primaer" : "hell"} className={l.href.startsWith("tel:") ? "mono" : ""} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
