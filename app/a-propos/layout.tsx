import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Présentation d'Ilian El Bouazzaoui Prieur : profil, localisation et objectif de stage Avril–Juillet 2026.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos — Ilian EBP",
    description:
      "Profil, localisation et objectif de stage Avril–Juillet 2026 (systèmes, réseaux, développement).",
    url: "/a-propos",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

