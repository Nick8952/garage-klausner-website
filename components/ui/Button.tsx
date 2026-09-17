import Link from "next/link";
import type { Link as LinkTyp } from "@/lib/types";

const basis =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] px-6 py-3 font-body text-[0.95rem] font-semibold leading-none transition-colors duration-200 cursor-pointer";
const varianten = {
  primaer: `${basis} bg-rot text-white hover:bg-rot-tief`,
  umriss: `${basis} border border-tinte/30 bg-white text-tinte hover:border-tinte hover:bg-halle`,
  hell: `${basis} border border-white/60 bg-transparent text-white hover:bg-white hover:text-tinte`,
};

export function Button({ link, variante, className = "" }: { link: LinkTyp; variante?: keyof typeof varianten; className?: string }) {
  const v = variante ?? (link.primaer ? "primaer" : "umriss");
  const extern = /^(https?:|mailto:|tel:)/.test(link.href);
  const cls = `${varianten[v]} ${className}`;
  if (extern) {
    const neuesFenster = link.href.startsWith("http");
    return (
      <a href={link.href} className={cls} {...(neuesFenster ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}
