"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore, useTransition } from "react";

const leer = () => () => {};

/** Kleine Leiste, solange Entwürfe angezeigt werden – ausserhalb des Studio-Vorschaufensters. */
export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const imStudio = useSyncExternalStore(leer, () => window.top !== window, () => true);
  if (imStudio) return null;

  const beenden = () =>
    startTransition(async () => {
      await fetch("/api/draft-mode/disable");
      router.refresh();
    });

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-sm bg-tinte px-4 py-2 text-sm text-white shadow-lg">
      Entwurfsansicht
      <button type="button" onClick={beenden} disabled={pending} className="min-h-11 cursor-pointer underline underline-offset-4 disabled:opacity-50">
        {pending ? "…" : "Beenden"}
      </button>
    </div>
  );
}
