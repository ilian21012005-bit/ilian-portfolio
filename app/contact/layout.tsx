import type { Metadata } from "next";

/** Évite le cache statique pour que le prochain déploiement mette à jour l’identité / contact. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

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

