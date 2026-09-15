export function Abschnittskopf({ kurzzeile, titel, text, hell = false, as: Tag = "h2" }: { kurzzeile?: string; titel?: string; text?: string; hell?: boolean; as?: "h1" | "h2" }) {
  if (!kurzzeile && !titel && !text) return null;
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kurzzeile && <p className={`kurzzeile mb-3 ${hell ? "!text-white/80" : "!text-grau"}`}>{kurzzeile}</p>}
      {titel && <Tag className={`display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] ${hell ? "text-white" : "text-rot"}`}>{titel}</Tag>}
      {text && <p className={`mx-auto mt-4 max-w-2xl text-lg ${hell ? "text-white/85" : "text-grau"}`}>{text}</p>}
    </div>
  );
}
