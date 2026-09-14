import Link from "next/link";
import type { Link as LinkTyp } from "@/lib/types";

const basis =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 font-body text-[0.95rem] font-semibold tracking-[0.01em] leading-none transition-[background-color,color,box-shadow,transform] duration-200 cursor-pointer active:translate-y-px";
const varianten = {
  primaer: `${basis} bg-rot text-white shadow-[0_1px_2px_rgba(18,20,26,.2),inset_0_1px_0_rgba(255,255,255,.18)] hover:bg-rot-tief`,
  umriss: `${basis} border border-tinte/25 bg-white text-tinte shadow-[0_1px_2px_rgba(18,20,26,.06)] hover:border-tinte hover:bg-halle`,
  hell: `${basis} border border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-tinte`,
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
