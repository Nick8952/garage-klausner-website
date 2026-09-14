import type { PortableTextBlock } from "@portabletext/react";

/**
 * Kleiner, deterministischer Konverter: Klartext (Absätze durch Leerzeile, «### » für
 * Zwischentitel, «- » für Aufzählungen, **fett**, [Text](Adresse)) → Portable Text.
 * Schlüssel werden aus der Position abgeleitet, damit jeder Seed-Lauf identische
 * Dokumente erzeugt. Dient dem Rückfall (data/) und dem Seed gleichermassen.
 */
export function textToBlocks(text: string | undefined, prefix = "b"): PortableTextBlock[] {
  if (!text) return [];
  const blocks: PortableTextBlock[] = [];
  const paragraphs = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
  paragraphs.forEach((para, pi) => {
    const trimmed = para.trim();
    if (!trimmed) return;
    const key = `${prefix}${pi}`;
    if (trimmed.startsWith("### ")) {
      blocks.push(block(key, "h3", trimmed.slice(4)));
      return;
    }
    const lines = trimmed.split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      lines.forEach((l, li) => blocks.push({ ...block(`${key}-${li}`, "normal", l.slice(2)), listItem: "bullet", level: 1 }));
      return;
    }
    blocks.push(block(key, "normal", trimmed));
  });
  return blocks;
}

function block(key: string, style: string, text: string): PortableTextBlock {
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children: { _key: string; _type: "span"; text: string; marks: string[] }[] = [];
  const re = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  const push = (t: string, marks: string[]) => t && children.push({ _key: `${key}s${i++}`, _type: "span", text: t, marks });
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index), []);
    if (m[1]) push(m[1].slice(2, -2), ["strong"]);
    else if (m[2]) {
      const [, label, href] = m[2].match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const defKey = `${key}l${markDefs.length}`;
      markDefs.push({ _key: defKey, _type: "link", href });
      push(label, [defKey]);
    }
    last = m.index + m[0].length;
  }
  push(text.slice(last), []);
  return { _key: key, _type: "block", style, markDefs, children };
}
