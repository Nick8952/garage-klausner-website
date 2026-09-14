export function Abschnittskopf({ kurzzeile, titel, text, hell = false, as: Tag = "h2" }: { kurzzeile?: string; titel?: string; text?: string; hell?: boolean; as?: "h1" | "h2" }) {
  if (!kurzzeile && !titel && !text) return null;
  return (
    <div className="max-w-3xl">
      {kurzzeile && <p className={`kurzzeile mb-3 ${hell ? "text-gelb" : ""}`}>{kurzzeile}</p>}
      {titel && <Tag className={`display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] ${hell ? "text-white" : "text-tinte"}`}>{titel}</Tag>}
      {text && <p className={`mt-4 max-w-2xl text-lg ${hell ? "text-white/85" : "text-grau"}`}>{text}</p>}
    </div>
  );
}
