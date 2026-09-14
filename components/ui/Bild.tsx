import Image from "next/image";
import type { Bild as BildTyp } from "@/lib/types";
import { basePath } from "@/lib/site-url";

/** Bild aus Sanity (CDN-URL) oder aus public/img (Rückfall). Breite/Höhe sind immer bekannt → kein Layout-Springen. */
export function Bild({ bild, sizes, priority = false, className = "" }: { bild: BildTyp; sizes: string; priority?: boolean; className?: string }) {
  const src = bild.src.startsWith("/") ? `${basePath}${bild.src}` : bild.src;
  return (
    <Image
      src={src}
      alt={bild.alt}
      width={bild.width}
      height={bild.height}
      sizes={sizes}
      priority={priority}
      placeholder={bild.lqip ? "blur" : "empty"}
      blurDataURL={bild.lqip ?? undefined}
      className={className}
    />
  );
}
