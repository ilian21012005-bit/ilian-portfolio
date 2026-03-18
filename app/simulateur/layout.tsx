import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur réseau",
  description:
    "Démo interactive : topologie réseau, terminaux simulés et commandes (ip, dhclient, ping, traceroute).",
  alternates: { canonical: "/simulateur" },
  openGraph: {
    title: "Simulateur réseau — Démo interactive",
    description:
      "Explore une topologie réseau et teste la connectivité via un terminal simulé.",
    url: "/simulateur",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

