import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ilian-portfolio-kohl.vercel.app"
).replace(/\/$/, "");

export function localizedAlternates(locale: string, path = "") {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      fr: `${SITE_URL}/fr${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/fr${path}`,
    },
  };
}
export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      type: "website",
      siteName: "Ilian — Portfolio",
      locale: locale === "en" ? "en_GB" : "fr_FR",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Ilian — Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/twitter-image`],
    },
  };
}
