import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { PageLayout } from "@/components/PageLayout";
import { CONTACT } from "@/lib/contact";
import { getProject, resolveProject, loc } from "@/lib/projects";
import { localizedAlternates } from "@/lib/site";
import { presentationFor } from "@/lib/project-presentation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Ilian — Systems, networks & software" : "Ilian — Systèmes, réseaux & développement", alternates: localizedAlternates(locale) };
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const projects = ["analyse-attaques-mitre", "continuite-supervision", "karu", "copilote-hellowork"].map(slug => resolveProject(getProject(slug)!, locale));
  return <PageLayout flush>
    <section className="intro page-width">
      <div className="intro-copy"><p className="intro-kicker">{en ? "Third-year computer science student · Paris-Saclay" : "Étudiant en BUT 3 informatique · Paris-Saclay"}</p><h1>Ilian El Bouazzaoui Prieur</h1><p className="intro-lead">{en ? "Systems, networks and cybersecurity, through hands-on projects." : "Systèmes, réseaux et cybersécurité, par la pratique."}</p><p>{en ? "I build and test infrastructure labs, investigate network traffic and develop tools to solve practical problems." : "Je conçois et teste des infrastructures, j’analyse le trafic réseau et je développe des outils pour répondre à des besoins concrets."}</p><div className="intro-actions"><Link href="/projets" className="button-primary">{en ? "Explore projects" : "Voir les projets"}</Link><a href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl} className="text-link" target="_blank" rel="noopener noreferrer">{en ? "Download résumé (PDF)" : "Consulter mon CV (PDF)"}</a></div></div>
      <aside className="intro-status"><span className="status-dot"/><div><strong>{en ? "Seeking an internship" : "Recherche de stage"}</strong><p>{en ? "18 January – 14 May 2027" : "18 janvier – 14 mai 2027"}<br/>{en ? "SOC, systems or network security" : "SOC, systèmes ou sécurité réseau"}<br/>Île-de-France</p><Link href="/contact">{en ? "Contact me" : "Me contacter"}</Link></div></aside>
    </section>
    <section className="selected-work page-width" id="selection"><div className="section-heading"><div><h2>{en ? "Selected projects" : "Projets sélectionnés"}</h2><p>{en ? "Professional, academic and personal work." : "En entreprise, en formation et sur mon temps personnel."}</p></div><Link href="/projets" className="text-link">{en ? "All projects" : "Tous les projets"}</Link></div>
      <article className="featured-case"><Link href="/projets/lab-gns3-data-tricks" className="case-image" tabIndex={-1} aria-hidden="true"><Image src="/project-images/lab-gns3.png" alt="" width={1920} height={1080} sizes="(max-width: 760px) 100vw, 55vw"/></Link><div className="case-copy"><p className="case-context">Data-Tricks · {en ? "Internship, 2026" : "Stage, 2026"}</p><h3><Link href="/projets/lab-gns3-data-tricks">{en ? "Connecting three sites in a GNS3 lab" : "Relier trois sites dans un lab GNS3"}</Link></h3><p>{en ? "I modeled a multi-site network, segmented VLANs and tested IPsec tunnels between France, Tunisia and a cloud environment." : "J’ai modélisé un réseau multi-sites, segmenté les VLAN et testé les tunnels IPsec entre la France, la Tunisie et un environnement cloud."}</p><p className="case-evidence">{en ? "14 VPN checks completed · RouterOS · GLPI" : "14 contrôles VPN conformes · RouterOS · GLPI"}</p><Link href="/projets/lab-gns3-data-tricks" className="case-link">{en ? "View project" : "Voir le projet"}</Link></div></article>
      <div className="project-list">{projects.map(project => { const info = presentationFor(project.slug); return <article key={project.slug}><div><p className="case-context">{loc(info.context,locale)}</p><h3><Link href={`/projets/${project.slug}`}>{project.title}</Link></h3><p>{loc(info.outcome,locale)}</p></div><p className="project-technologies">{project.techStack.slice(0,3).join(" · ")}</p></article>; })}</div>
    </section>
    <section className="experience-strip page-width"><div><p className="section-label">{en ? "Experience" : "Expérience"}</p><h2>Data-Tricks</h2><p>{en ? "Infrastructure and security intern · May–July 2026" : "Stagiaire infrastructure et sécurité · Mai–juillet 2026"}</p></div><div><p>{en ? "A multi-site network lab, segmentation, VPN testing and a GLPI inventory environment. Configurations and procedures documented throughout the internship." : "Un lab réseau multi-sites, de la segmentation, des tests VPN et un environnement d’inventaire GLPI. Les configurations et procédures ont été documentées pendant le stage."}</p><Link href="/a-propos" className="case-link">{en ? "More about my background" : "En savoir plus sur mon parcours"}</Link></div></section>
    <section className="expertise page-width"><div className="section-heading"><div><h2>{en ? "Areas of practice" : "Domaines de pratique"}</h2><p>{en ? "Skills grounded in coursework and hands-on projects." : "Des compétences mises en pratique en formation et en projet."}</p></div></div><div className="expertise-grid"><div><h3>{en ? "Systems & networks" : "Systèmes et réseaux"}</h3><p>Linux, Windows Server, Active Directory, VLAN, VPN IPsec, GNS3.</p></div><div><h3>{en ? "Security & monitoring" : "Sécurité et supervision"}</h3><p>Wireshark, MITRE ATT&amp;CK, Suricata, Prometheus, Grafana.</p></div><div><h3>{en ? "Development & automation" : "Développement et automatisation"}</h3><p>Python, C#, Node.js, Git, Docker, Kubernetes.</p></div></div></section>
    <section className="final-contact page-width"><div><h2>{en ? "Let’s talk about your team." : "Parlons de votre équipe."}</h2><p>{en ? "Looking for an internship from January to May 2027." : "Je recherche un stage de janvier à mai 2027."}</p></div><Link href="/contact" className="button-primary">{en ? "Contact" : "Me contacter"}</Link></section>
  </PageLayout>;
}
