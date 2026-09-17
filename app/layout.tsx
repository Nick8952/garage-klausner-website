import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { draftMode } from "next/headers";
import { Footer } from "@/components/Footer";
import { CookieHinweis } from "@/components/CookieHinweis";
import { Header } from "@/components/Header";
import { Entwurfswerkzeuge } from "@/components/Entwurfswerkzeuge";
import { ladeSite, ladeStandorte } from "@/lib/data";
import { keinIndex, organisationJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import { isSanityConfigured, isStaticExport } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-inter-tight", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const site = await ladeSite();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: site.kurzname, template: `%s – ${site.seoTitelZusatz || site.kurzname}` },
    description: site.seoBeschreibung,
    robots: keinIndex(site) ? { index: false, follow: false } : undefined,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [site, standorte] = await Promise.all([ladeSite(), ladeStandorte()]);
  // Statischer Export (GitHub Pages) kennt weder Draft Mode noch Live-Updates.
  const entwurf = !isStaticExport && (await draftMode()).isEnabled;

  return (
    <html lang="de-CH" className={`${interTight.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Scroll-Reveals blenden Inhalte nur aus, wenn JavaScript läuft (Klasse «js»). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gelb focus:px-4 focus:py-3 focus:font-semibold">
          Zum Inhalt springen
        </a>
        <Header site={site} />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer site={site} standorte={standorte} />
        {site.cookieHinweisAnzeigen && (
          <CookieHinweis text={site.cookieHinweisText} button={site.cookieHinweisButton} datenschutzHref={site.footerLinks.find((l) => /datenschutz/i.test(l.label))?.href ?? "/datenschutz"} />
        )}
        <script type="application/ld+json" // «<» maskieren, damit CMS-Text das Script-Element nicht beenden kann.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd(site, standorte)).replace(/</g, "\\u003c") }} />
        {isSanityConfigured && !isStaticExport && <SanityLive />}
        {entwurf && <Entwurfswerkzeuge />}
      </body>
    </html>
  );
}
