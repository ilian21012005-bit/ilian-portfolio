import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Contact";
  const description =
    locale === "en"
      ? "Contact Ilian about a cybersecurity, systems or networking internship, January–May 2027."
      : "Contacter Ilian pour un stage en cybersécurité, systèmes ou réseaux, de janvier à mai 2027.";
  return pageMetadata(locale, "/contact", title, description);
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
