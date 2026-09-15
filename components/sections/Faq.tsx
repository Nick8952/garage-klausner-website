import type { FaqBaustein } from "@/lib/types";
import { Abschnittskopf } from "../ui/Abschnittskopf";
import { Reveal } from "../ui/Reveal";
import { Text } from "../ui/Text";

export function Faq({ b, erster }: { b: FaqBaustein; erster: boolean }) {
  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Abschnittskopf kurzzeile={b.kurzzeile} titel={b.titel} as={erster ? "h1" : "h2"} />
      <div className="mx-auto mt-8 max-w-3xl divide-y divide-linie border-y border-linie">
        {b.fragen.map((f) => (
          <details key={f._key} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold marker:content-none">
              {f.frage}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden="true"><path d="M9 3v12M3 9h12" /></svg>
            </summary>
            <Text value={f.antwort} className="pb-4 text-grau" />
          </details>
        ))}
      </div>
    </Reveal>
  );
}
