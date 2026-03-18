import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours scolaire",
  description:
    "Formation académique : du baccalauréat au BUT 2 Informatique (Paris-Saclay).",
  alternates: { canonical: "/parcours-scolaire" },
  openGraph: {
    title: "Parcours scolaire — Ilian EBP",
    description:
      "Formation : du baccalauréat au BUT 2 Informatique (Paris-Saclay).",
    url: "/parcours-scolaire",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

