import type { CtaBaustein } from "@/lib/types";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function Cta({ b }: { b: CtaBaustein }) {
  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="relative bg-blau px-6 py-10 text-white sm:px-10 sm:py-12">
        <div className="streifen absolute inset-x-0 top-0" aria-hidden="true" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-[1.9rem] sm:text-[2.4rem]">{b.titel}</h2>
            {b.text && <p className="mt-3 text-white/85">{b.text}</p>}
          </div>
          {!!b.schaltflaechen?.length && (
            <div className="flex flex-wrap gap-3">
              {b.schaltflaechen.map((l) => (
                <Button key={l.label} link={l} variante={l.primaer ? "primaer" : "hell"} className={l.href.startsWith("tel:") ? "mono" : ""} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
