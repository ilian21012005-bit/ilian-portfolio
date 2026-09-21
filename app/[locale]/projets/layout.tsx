import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description: "Labs Active Directory, TaskbarClear, ZeroStrike, Guess The Like — et quelques SAE.",
  alternates: { canonical: "/projets" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
