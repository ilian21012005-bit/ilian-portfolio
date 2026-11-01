import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "About" : "À propos";
  const description =
    locale === "en"
      ? "Ilian’s background, experience and technical skills. Computer Science student at Paris-Saclay."
      : "Parcours, expérience et compétences d’Ilian, étudiant en BUT Informatique à Paris-Saclay.";
  return pageMetadata(locale, "/a-propos", title, description);
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
