import { notFound } from "next/navigation";
import { Bausteine } from "@/components/Bausteine";
import { ladeSeite, ladeStandorte } from "@/lib/data";

export async function SeitenInhalt({ slug }: { slug: string }) {
  const [seite, standorte] = await Promise.all([ladeSeite(slug), ladeStandorte()]);
  if (!seite) notFound();
  return <Bausteine bausteine={seite.bausteine} standorte={standorte} />;
}
