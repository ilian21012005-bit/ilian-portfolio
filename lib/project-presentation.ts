import type { Localized } from "./projects";
export type Category =
	| "infrastructure"
	| "security"
	| "software"
	| "automation"
	| "games";
export type ProjectPresentation = {
	category: Category;
	context: Localized;
	outcome: Localized;
	visual: "network" | "capture" | "analysis" | "game" | "system" | "dreamshift";
};
export const CATEGORIES: Record<Category, Localized> = {
	automation: { fr: "Bots & automatisation", en: "Bots & automation" },
	infrastructure: { fr: "Systèmes & réseaux", en: "Systems & networks" },
	security: { fr: "Cybersécurité", en: "Cybersecurity" },
	software: { fr: "Applications & outils", en: "Apps & tools" },
	games: { fr: "Jeux & temps réel", en: "Games & realtime" },
};
export const PRESENTATION: Record<string, ProjectPresentation> = {
	"copy-glitch": {
		category: "games",
		context: {
			fr: "Projet personnel · Prototype",
			en: "Personal project · Prototype",
		},
		outcome: {
			fr: "Un laboratoire Roblox, des règles isolées et une validation progressive.",
			en: "A Roblox laboratory with isolated rules and progressive validation.",
		},
		visual: "system",
	},
	"bot-recherche-offres": {
		category: "automation",
		context: {
			fr: "Projet personnel · Veille & candidatures",
			en: "Personal project · Job monitoring",
		},
		outcome: {
			fr: "Rassembler les offres et suivre chaque étape.",
			en: "Aggregate offers and track each step.",
		},
		visual: "system",
	},
	"copilote-hellowork": {
		category: "automation",
		context: {
			fr: "Projet personnel · Automatisation navigateur",
			en: "Personal project · Browser automation",
		},
		outcome: {
			fr: "Des alertes mail à une file de candidatures traçable.",
			en: "From email alerts to a traceable application queue.",
		},
		visual: "system",
	},
	"sites-commerces": {
		category: "automation",
		context: { fr: "Projet personnel · I&K", en: "Personal project · I&K" },
		outcome: {
			fr: "Qualifier les pistes et conserver la source de chaque contact.",
			en: "Qualify leads and retain each contact’s source.",
		},
		visual: "system",
	},
	"serveur-bots-fedora": {
		category: "infrastructure",
		context: {
			fr: "Infrastructure personnelle · Linux",
			en: "Personal infrastructure · Linux",
		},
		outcome: {
			fr: "Exploiter les bots avec systemd et une commande de contrôle.",
			en: "Operate bots with systemd and a control command.",
		},
		visual: "system",
	},
	"lab-gns3-data-tricks": {
		category: "infrastructure",
		context: {
			fr: "Stage infrastructure & sécurité · Data-Tricks · 2026",
			en: "Infrastructure & security internship · Data-Tricks · 2026",
		},
		outcome: {
			fr: "3 sites segmentés par VLAN sous GNS3, VPN IPsec IKEv2 validé par 14 contrôles.",
			en: "3 VLAN-segmented sites in GNS3, IPsec IKEv2 VPN validated across 14 checks.",
		},
		visual: "network",
	},
	"analyse-attaques-mitre": {
		category: "security",
		context: {
			fr: "UE Cybersécurité (R5B09) · BUT 3",
			en: "Cybersecurity coursework (R5B09) · Year 3",
		},
		outcome: {
			fr: "Qualification d’attaques sur captures pcap, mapping MITRE ATT&CK et règles Suricata.",
			en: "Attack triage from pcap captures, MITRE ATT&CK mapping and Suricata rules.",
		},
		visual: "analysis",
	},
	"lab-active-directory": {
		category: "infrastructure",
		context: {
			fr: "UE Services complexes (R5B06) · BUT 3",
			en: "Complex services lab (R5B06) · Year 3",
		},
		outcome: {
			fr: "Domaine Windows Server 2022 (AD DS, DNS, LDAP), structure d’OU et durcissement GPO.",
			en: "Windows Server 2022 domain (AD DS, DNS, LDAP), OU structure and GPO hardening.",
		},
		visual: "system",
	},
	"continuite-supervision": {
		category: "infrastructure",
		context: {
			fr: "UE Continuité & supervision (R5B08) · BUT 3",
			en: "Continuity & monitoring lab (R5B08) · Year 3",
		},
		outcome: {
			fr: "Analyse RTO/RPO et alertes Prometheus/Grafana sur le débit sortant pour détecter l’exfiltration.",
			en: "RTO/RPO risk analysis and Prometheus/Grafana egress alerts to detect exfiltration.",
		},
		visual: "system",
	},
	"lab-kubernetes-minikube": {
		category: "infrastructure",
		context: {
			fr: "UE Virtualisation avancée (R5A09) · BUT 3",
			en: "Advanced virtualization lab (R5A09) · Year 3",
		},
		outcome: {
			fr: "Déploiement nginx sous Minikube, exposition NodePort et mise à l’échelle par ReplicaSet.",
			en: "Nginx deployment on Minikube, NodePort exposure and ReplicaSet scaling.",
		},
		visual: "system",
	},
	karu: {
		category: "software",
		context: {
			fr: "Projet personnel · Windows",
			en: "Personal project · Windows",
		},
		outcome: {
			fr: "Enregistrer les dernières minutes de jeu avec un raccourci.",
			en: "Save the last minutes of gameplay with a hotkey.",
		},
		visual: "capture",
	},
	"taskbar-clear": {
		category: "software",
		context: {
			fr: "Projet personnel · Open source",
			en: "Personal project · Open source",
		},
		outcome: {
			fr: "Une barre des tâches transparente, sans processus résident.",
			en: "A transparent taskbar with no resident process.",
		},
		visual: "system",
	},
	"dreamshift-bureau": {
		category: "games",
		context: {
			fr: "Projet personnel · En développement",
			en: "Personal project · In development",
		},
		outcome: {
			fr: "Horreur coopérative sur Roblox, avec validation côté serveur.",
			en: "Cooperative Roblox horror with server-side validation.",
		},
		visual: "dreamshift",
	},
	"zero-strike": {
		category: "games",
		context: {
			fr: "Projet personnel · Multijoueur LAN",
			en: "Personal project · LAN multiplayer",
		},
		outcome: {
			fr: "Le grand écran devient le terrain. Les téléphones, les manettes.",
			en: "The big screen is the arena. Phones are controllers.",
		},
		visual: "game",
	},
	"guess-the-like": {
		category: "games",
		context: { fr: "Projet personnel · Web", en: "Personal project · Web" },
		outcome: {
			fr: "Un jeu de groupe synchronisé par WebSocket.",
			en: "A group game synchronized over WebSocket.",
		},
		visual: "game",
	},
	"enfer-au-paradis-sae-s5": {
		category: "games",
		context: { fr: "Projet d’équipe · SAE S5", en: "Team project · Year 3" },
		outcome: {
			fr: "Une aventure à deux, des énigmes et un état partagé.",
			en: "A two-player adventure with puzzles and shared state.",
		},
		visual: "game",
	},
	"reseau-securise-entreprise": {
		category: "infrastructure",
		context: {
			fr: "Projet académique en équipe · BUT",
			en: "Academic team project · Coursework",
		},
		outcome: {
			fr: "Simulation réseau d’entreprise sous Marionnet, inspection Wireshark et outillage C.",
			en: "Simulated enterprise network in Marionnet, Wireshark inspection and C tooling.",
		},
		visual: "network",
	},
	"plateforme-universitaire-sae-s3": {
		category: "software",
		context: { fr: "Projet d’équipe · SAE S3", en: "Team project · Year 2" },
		outcome: {
			fr: "Une API pour relier application web et client Java.",
			en: "An API connecting the web app and Java client.",
		},
		visual: "system",
	},
	"application-medias-sae-s2": {
		category: "software",
		context: { fr: "Projet d’équipe · SAE S2", en: "Team project · Year 1" },
		outcome: {
			fr: "Gérer sa collection de films et de séries en Java.",
			en: "Managing a film and TV collection in Java.",
		},
		visual: "system",
	},
};
export function presentationFor(slug: string): ProjectPresentation {
	return (
		PRESENTATION[slug] || {
			category: "software",
			context: { fr: "Projet personnel", en: "Personal project" },
			outcome: {
				fr: "Conception et développement.",
				en: "Design and development.",
			},
			visual: "system",
		}
	);
}
