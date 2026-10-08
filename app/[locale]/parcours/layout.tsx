import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours",
  description: "Parcours professionnel et scolaire — expérience et formation.",
  alternates: { canonical: "/parcours" },
  openGraph: {
    title: "Parcours — Portfolio Ilian",
    description: "Parcours professionnel et scolaire : expérience et formation.",
    url: "/parcours",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

