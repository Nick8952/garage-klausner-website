import { stegaClean } from "next-sanity";
import type { TextBaustein } from "@/lib/types";
import { Abschnittskopf } from "../ui/Abschnittskopf";
import { Reveal } from "../ui/Reveal";
import { Text } from "../ui/Text";

export function TextAbschnitt({ b, erster }: { b: TextBaustein; erster: boolean }) {
  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className={stegaClean(b.breite) === "breit" ? "" : "mx-auto max-w-3xl"}>
        <Abschnittskopf kurzzeile={b.kurzzeile} titel={b.titel} as={erster ? "h1" : "h2"} />
        <Text value={b.text} className="mt-8 text-[1.0625rem]" />
      </div>
    </Reveal>
  );
}
