import { ArrowLeft } from "lucide-react";
import { Link } from "@/lib/navigation";

export function PageHeader({
	title,
	subtitle,
	kicker,
	locale = "fr",
}: {
	title: string;
	subtitle?: string;
	kicker?: string;
	locale?: string;
}) {
	return (
		<header className="page-heading page-width swiss-enter">
			<Link href="/" className="back-link">
				<ArrowLeft size={13} aria-hidden="true" />
				{locale === "en" ? "Home" : "Accueil"}
			</Link>
			{kicker && <p className="intro-kicker page-heading-kicker">{kicker}</p>}
			<h1>{title}</h1>
			{subtitle && <p>{subtitle}</p>}
		</header>
	);
}
