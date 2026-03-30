import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours professionnel",
  description:
    "Expériences professionnelles : missions, responsabilités et apprentissages.",
  alternates: { canonical: "/parcours-pro" },
  openGraph: {
    title: "Parcours professionnel — Ilian EBP",
    description:
      "Expériences : missions, responsabilités et apprentissages.",
    url: "/parcours-pro",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

