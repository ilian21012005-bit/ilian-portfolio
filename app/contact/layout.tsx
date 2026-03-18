import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter Ilian El Bouazzaoui Prieur pour un stage Avril–Juillet 2026 (systèmes, réseaux, développement).",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Ilian EBP",
    description:
      "Contact et disponibilité pour stage Avril–Juillet 2026.",
    url: "/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

