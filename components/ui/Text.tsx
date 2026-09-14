import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";

const komponenten: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      // Interne Pfade über next/link, damit der GitHub-Pages-Unterpfad (basePath) erhalten bleibt.
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      const extern = href.startsWith("http");
      return (
        <a href={href} {...(extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export function Text({ value, className = "" }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={`prose-klausner ${className}`}>
      <PortableText value={value} components={komponenten} />
    </div>
  );
}
