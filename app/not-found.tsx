import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <p className="kurzzeile mb-3">Fehler 404</p>
      <h1 className="display text-[2.5rem] sm:text-[3.5rem]">Diese Seite gibt es nicht.</h1>
      <p className="mt-4 max-w-xl text-lg text-grau">Vielleicht wurde sie verschoben oder die Adresse ist falsch geschrieben.</p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-[4px] bg-rot px-6 font-semibold text-white hover:bg-rot-tief">
        Zur Startseite
      </Link>
    </section>
  );
}
