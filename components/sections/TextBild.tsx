import type { TextBildBaustein } from "@/lib/types";
import { Abschnittskopf } from "../ui/Abschnittskopf";
import { Bild } from "../ui/Bild";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Text } from "../ui/Text";

export function TextBild({ b, erster }: { b: TextBildBaustein; erster: boolean }) {
  const rechts = b.bildRechts !== false;
  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div className={rechts ? "" : "md:order-2"}>
          <Abschnittskopf kurzzeile={b.kurzzeile} titel={b.titel} as={erster ? "h1" : "h2"} />
          <Text value={b.text} className="mt-6" />
          {!!b.schaltflaechen?.length && (
            <div className="mt-6 flex flex-wrap gap-3">
              {b.schaltflaechen.map((l) => <Button key={l.label} link={l} />)}
            </div>
          )}
        </div>
        {/* Abzug mit weissem Rand – wie ein Foto aus dem Familienalbum. */}
        <figure className={`bg-white p-3 shadow-[0_18px_40px_-24px_rgba(18,20,26,.5)] sm:p-4 ${rechts ? "" : "md:order-1"}`}>
          <Bild bild={b.bild} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
        </figure>
      </div>
    </Reveal>
  );
}
