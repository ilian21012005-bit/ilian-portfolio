import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arsenal",
  description:
    "Compétences techniques : systèmes & réseaux, développement, bases de données, cybersécurité, gestion de projet.",
  alternates: { canonical: "/arsenal" },
  openGraph: {
    title: "Arsenal — Compétences",
    description:
      "Systèmes & réseaux, développement, bases de données, cybersécurité et gestion de projet.",
    url: "/arsenal",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

