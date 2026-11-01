import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";
export async function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-width">
        <p>© {new Date().getFullYear()} Ilian El Bouazzaoui Prieur</p>
        <div className="footer-links">
          <a href={CONTACT.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowUpRight size={11} />
          </a>
          <a
            href={CONTACT.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight size={11} />
          </a>
          <a href={`mailto:${CONTACT.email}`}>
            Email
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
