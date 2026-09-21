import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  applicationName: "Ilian — Portfolio",
  title: {
    default: "Ilian El Bouazzaoui Prieur | Portfolio",
    template: "%s | Ilian EBP",
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
    siteName: "Ilian — Portfolio",
    title: "Ilian El Bouazzaoui Prieur | Portfolio",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilian El Bouazzaoui Prieur | Portfolio",
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
      <body className={`${inter.variable} ${newsreader.variable} ${inter.className} relative antialiased font-sans bg-background text-foreground`}>
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
