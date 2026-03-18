import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Projets réalisés durant le BUT : web (PHP MVC, API), Java, réseau, Linux, C/C++, etc.",
  alternates: { canonical: "/projets" },
  openGraph: {
    title: "Projets — Ilian EBP",
    description:
      "Sélection de projets : PHP MVC, Java, API REST, réseau, Linux, C/C++.",
    url: "/projets",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

