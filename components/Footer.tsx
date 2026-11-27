import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export async function Footer({ locale = "fr" }: { locale?: string }) {
	const en = locale.startsWith("en");
	return (
		<footer className="site-footer">
			<div className="footer-inner page-width">
				<div className="footer-meta">
					<p className="footer-copy">
						© {new Date().getFullYear()} Ilian El Bouazzaoui Prieur
					</p>
					<span className="footer-status">
						<span className="status-dot" aria-hidden="true" />
						{en
							? "Internship Jan–May 2027 · Paris area"
							: "Stage jan.–mai 2027 · Île-de-France"}
					</span>
				</div>
				<div className="footer-links">
					<a href={CONTACT.githubUrl} target="_blank" rel="noopener noreferrer">
						GitHub
						<ArrowUpRight size={12} aria-hidden="true" />
					</a>
					<a
						href={CONTACT.linkedinUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
						<ArrowUpRight size={12} aria-hidden="true" />
					</a>
					<a href={`mailto:${CONTACT.email}`}>
						Email
						<ArrowUpRight size={12} aria-hidden="true" />
					</a>
				</div>
			</div>
		</footer>
	);
}
