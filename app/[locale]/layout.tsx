import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CONTACT } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  const title = en
    ? "Ilian — Systems, networks & software"
    : "Ilian — Systèmes, réseaux & développement";
  const description = en
    ? "Ilian El Bouazzaoui Prieur, third-year Computer Science student at Paris-Saclay. Networking, cybersecurity, Windows apps and automation. Internship January–May 2027."
    : "Ilian El Bouazzaoui Prieur, étudiant en BUT 3 Informatique à Paris-Saclay. Projets réseaux, cybersécurité, applications Windows et automatisation. Stage janvier–mai 2027.";
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "Ilian — Portfolio",
    title: {
      default: title,
      template: "%s | Ilian",
    },
    description,
    authors: [{ name: CONTACT.name }],
    creator: CONTACT.name,
    openGraph: {
      type: "website",
      siteName: "Ilian — Portfolio",
      title,
      description,
      locale: en ? "en_GB" : "fr_FR",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ilian — Portfolio",
        },
      ],
    },
    twitter: { card: "summary_large_image", images: ["/twitter-image"] },
    robots: { index: true, follow: true },
  };
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!["fr", "en"].includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTACT.name,
    url: `${SITE_URL}/${locale}`,
    sameAs: [CONTACT.githubUrl, CONTACT.linkedinUrl],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Université Paris-Saclay — IUT d’Orsay",
    },
    knowsAbout: ["Computer networks", "Cybersecurity", "Software development"],
  };
  return (
    <html lang={locale}>
      <body className={`${sans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {locale === "en"
              ? "Skip to main content"
              : "Aller au contenu principal"}
          </a>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
