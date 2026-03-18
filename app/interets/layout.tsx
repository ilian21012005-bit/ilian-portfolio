import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centres d'intérêt",
  description:
    "Centres d'intérêt et passions au quotidien (sport, cinéma, musique, jeux, manga).",
  alternates: { canonical: "/interets" },
  openGraph: {
    title: "Centres d'intérêt — Ilian EBP",
    description:
      "Sport, cinéma, musique, jeux et manga : ce qui me passionne au quotidien.",
    url: "/interets",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

