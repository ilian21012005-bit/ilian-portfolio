import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

const SITE_DESCRIPTION =
  "Portfolio d'Ilian El Bouazzaoui Prieur — étudiant BUT 3 Informatique, parcours B (IUT Orsay / Paris-Saclay). Administration systèmes et réseaux, labs Windows / Active Directory, cybersécurité côté analyse.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "Portfolio Ilian",
  title: {
    default: "Portfolio Ilian",
    template: "%s | Portfolio Ilian",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "BUT Informatique",
    "Paris-Saclay",
    "IUT Orsay",
    "Systèmes",
    "Réseaux",
    "Active Directory",
    "Cybersécurité",
    "Administration système",
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
    siteName: "Portfolio Ilian",
    title: "Portfolio Ilian",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Ilian",
    description: SITE_DESCRIPTION,
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
      <body className={`${plexSans.variable} ${newsreader.variable} ${plexSans.className} relative antialiased font-sans bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
