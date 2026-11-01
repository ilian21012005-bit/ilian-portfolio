import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Projects" : "Projets";
  const description =
    locale === "en"
      ? "Networking labs, cybersecurity, Windows apps, bots and multiplayer games by Ilian."
      : "Labs réseau, cybersécurité, applications Windows, bots et jeux multijoueurs réalisés par Ilian.";
  return pageMetadata(locale, "/projets", title, description);
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
