import { Link } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";
export function PageHeader({
  title,
  subtitle,
  locale = "fr",
}: {
  title: string;
  subtitle?: string;
  locale?: string;
}) {
  return (
    <header className="page-heading page-width">
      <Link href="/" className="back-link">
        <ArrowLeft size={13} />
        {locale === "en" ? "Home" : "Accueil"}
      </Link>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
