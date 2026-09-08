import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Semi_Condensed, Blaka, Fustat } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});
const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-semi-condensed",
});
// Blaka ships one weight only.
const blaka = Blaka({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-blaka",
});
const fustat = Fustat({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fustat",
});

export const metadata: Metadata = {
  title: "El Rawas Motors — three brands, or four, or six, or eight | Egypt",
  description:
    "A concept site built from El Rawas Motors' own Facebook and Instagram: Facebook states three authorized brands, Instagram states four, a co-branded exhibition poster shows six, and individual posts advertise two more — eight marques total, none of them contradicting the others outright.",
  metadataBase: new URL("https://rawas-motors-site.vercel.app"),
  openGraph: {
    title: "El Rawas Motors — three brands, or four, or six, or eight",
    description:
      "Four real sources, four different brand counts, and a temporary exhibition booth rebuilt as the structure it actually was.",
    locale: "en_US",
    type: "website",
  },
  other: { "theme-color": "#f4f5f3" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      translate="no"
      className={`notranslate ${bebasNeue.variable} ${barlowSemiCondensed.variable} ${blaka.variable} ${fustat.variable}`}
    >
      <body className="bg-ground text-ink antialiased">
        <noscript>
          <style>{`[data-unroll-item]{opacity:1!important;clip-path:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="en">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
