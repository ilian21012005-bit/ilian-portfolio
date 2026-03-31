import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BootIntro } from "@/components/BootIntro";
import { AuroraBg } from "@/components/backgrounds/AuroraBg";
import { ThemeProvider } from "@/components/ThemeProvider";
import { THEME_STORAGE_KEY, DEFAULT_THEME } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "Ilian — Portfolio",
  title: {
    default: "Ilian El Bouazzaoui Prieur | Portfolio",
    template: "%s | Ilian EBP",
  },
  description:
    "Portfolio d'Ilian El Bouazzaoui Prieur — étudiant BUT 2 Informatique (Paris-Saclay). Recherche de stage Avril–Juillet 2026. Systèmes, réseaux et développement.",
  keywords: [
    "BUT Informatique",
    "Paris-Saclay",
    "Stage",
    "Systèmes",
    "Réseaux",
    "Cybersécurité",
    "Développement",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Ilian El Bouazzaoui Prieur" }],
  creator: "Ilian El Bouazzaoui Prieur",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Ilian — Portfolio",
    title: "Ilian El Bouazzaoui Prieur | Portfolio",
    description:
      "Étudiant BUT 2 Informatique (Paris-Saclay). Recherche de stage Avril–Juillet 2026. Systèmes, réseaux et développement.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilian El Bouazzaoui Prieur | Portfolio",
    description:
      "Étudiant BUT 2 Informatique (Paris-Saclay). Recherche de stage Avril–Juillet 2026. Systèmes, réseaux et développement.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      {/* Script inline exécuté avant le premier paint pour éviter le flash de couleur */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='blue'||t==='red'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.className} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <BootIntro>
              <a href="#main-content" className="skip-link">
                Aller au contenu principal
              </a>
              <AuroraBg />
              <ScrollProgress />
              <Navbar />
              {children}
            </BootIntro>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
