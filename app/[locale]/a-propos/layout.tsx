import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Ilian El Bouazzaoui Prieur — BUT 3 Informatique, parcours B. Admin systèmes et réseaux, labs Active Directory, cybersécurité côté analyse.",
  alternates: { canonical: "/a-propos" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
