type ProjectLinks = {
  repo?: string;
  demo?: string;
};

export type Localized<T = string> = { fr: T; en: T };

export function loc<T>(value: Localized<T>, locale: string): T {
  return locale.startsWith("en") ? value.en : value.fr;
}

export type Project = {
  slug: string;
  title: Localized;
  description: Localized;
  techStack: string[];
  featured?: boolean;
  status?: "in-progress" | "done";
  links?: ProjectLinks;
  highlights?: Localized<string[]>;
  architectureBullets?: Localized<string[]>;
  roleBullets?: Localized<string[]>;
  learnedBullets?: Localized<string[]>;
};

export type ResolvedProject = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  featured?: boolean;
  status?: "in-progress" | "done";
  links?: ProjectLinks;
  highlights?: string[];
  architectureBullets?: string[];
  roleBullets?: string[];
  learnedBullets?: string[];
};

export function resolveProject(project: Project, locale: string): ResolvedProject {
  return {
    slug: project.slug,
    title: loc(project.title, locale),
    description: loc(project.description, locale),
    techStack: project.techStack,
    featured: project.featured,
    status: project.status,
    links: project.links,
    highlights: project.highlights ? loc(project.highlights, locale) : undefined,
    architectureBullets: project.architectureBullets
      ? loc(project.architectureBullets, locale)
      : undefined,
    roleBullets: project.roleBullets ? loc(project.roleBullets, locale) : undefined,
    learnedBullets: project.learnedBullets ? loc(project.learnedBullets, locale) : undefined,
  };
}

/* Fiche « Analyse d’attaques / MITRE » volontairement absente : après le CR TP2 R5B09 uniquement. */
export const PROJECTS: Project[] = [
  {
    slug: "lab-gns3-data-tricks",
    title: {
      fr: "Lab GNS3 multi-sites (Data-Tricks)",
      en: "Multi-site GNS3 lab (Data-Tricks)",
    },
    featured: true,
    description: {
      fr: "Stage infrastructure & sécurité en fintech : laboratoire GNS3 multi-sites (France, Tunisie, Cloud). Segmentation VLAN, Zero Trust, VPN IPsec IKEv2 sur MikroTik CHR, inventaire GLPI.",
      en: "Infrastructure & security internship in fintech: multi-site GNS3 lab (France, Tunisia, Cloud). VLAN segmentation, Zero Trust, IPsec IKEv2 VPN on MikroTik CHR, GLPI inventory.",
    },
    techStack: ["GNS3", "MikroTik / RouterOS", "VLAN", "VPN IPsec", "Docker", "GLPI"],
    highlights: {
      fr: [
        "Topologie multi-sites : France, Tunisie et Cloud, simulée sous GNS3.",
        "Segmentation VLAN et isolation du VLAN Management et du RH (pratiques ANSSI).",
        "Tunnels VPN IPsec IKEv2 sur MikroTik CHR — 14 tests / 14 conformes.",
        "Lab GLPI sous Docker : procédure d’inventaire et d’agent.",
      ],
      en: [
        "Multi-site topology: France, Tunisia and Cloud, simulated in GNS3.",
        "VLAN segmentation and isolation of the Management and HR VLANs (ANSSI practices).",
        "IPsec IKEv2 VPN tunnels on MikroTik CHR — 14 / 14 tests passed.",
        "GLPI lab on Docker: inventory and agent procedure.",
      ],
    },
    architectureBullets: {
      fr: [
        "Sites interconnectés dans GNS3, pas un réseau plat unique.",
        "Politique Zero Trust : chaque flux est un choix, pas un « tout ouvert » entre sites.",
        "Configurations RouterOS documentées et versionnées sous Git.",
      ],
      en: [
        "Sites interconnected in GNS3, not one flat network.",
        "Zero Trust policy: every flow is a choice, not an open path between sites.",
        "RouterOS configurations documented and versioned in Git.",
      ],
    },
    roleBullets: {
      fr: [
        "Conception et tests de la topologie, des VLAN et des tunnels.",
        "Documentation des configs et des procédures (Draw.io, Git).",
        "Mise en place du lab GLPI et échanges en anglais.",
      ],
      en: [
        "Design and tests of the topology, VLANs and tunnels.",
        "Documentation of configs and procedures (Draw.io, Git).",
        "GLPI lab setup and work in English.",
      ],
    },
    learnedBullets: {
      fr: [
        "Un VPN qui « monte » ne suffit pas : il faut un plan de tests (les 14 contrôles).",
        "L’isolation RH / management se décide dans le plan d’adressage, pas après coup.",
      ],
      en: [
        "A VPN that comes up is not enough: you need a test plan (the 14 checks).",
        "HR / management isolation is decided in the addressing plan, not afterwards.",
      ],
    },
  },
  {
    slug: "lab-active-directory",
    title: {
      fr: "Lab Active Directory / LDAP",
      en: "Active Directory / LDAP lab",
    },
    featured: true,
    status: "in-progress",
    description: {
      fr: "Mini-infrastructure d’entreprise en lab : Windows Server 2022 (contrôleur de domaine) et poste Windows 11. Mise en place d’un annuaire LDAP via AD DS, jointure au domaine, OU, groupes et GPO. En cours.",
      en: "Small enterprise lab: Windows Server 2022 (domain controller) and a Windows 11 client. LDAP directory via AD DS, domain join, OUs, groups and GPOs. In progress.",
    },
    techStack: ["Windows Server 2022", "Active Directory", "LDAP", "GPO", "DNS", "VirtualBox"],
    highlights: {
      fr: [
        "Topologie isolée : serveur 192.168.100.10, client 192.168.100.20, domaine de lab.",
        "Rôle AD DS, promotion en contrôleur de domaine, DNS intégré.",
        "Arborescence d’OU (départements, services), groupes et comptes de test.",
        "GPO (mots de passe, partages, restrictions) et délégation — en cours de finalisation.",
      ],
      en: [
        "Isolated topology: server 192.168.100.10, client 192.168.100.20, lab domain.",
        "AD DS role, promotion to domain controller, integrated DNS.",
        "OU tree (departments, services), groups and test accounts.",
        "GPOs (passwords, shares, restrictions) and delegation — still being finished.",
      ],
    },
    architectureBullets: {
      fr: [
        "Deux VM VirtualBox sur réseau interne de lab.",
        "Le serveur fait autorité sur l’annuaire et le DNS du domaine.",
        "Le poste client s’authentifie auprès de l’annuaire (LDAP / AD).",
      ],
      en: [
        "Two VirtualBox VMs on an internal lab network.",
        "The server is authoritative for the directory and domain DNS.",
        "The client authenticates against the directory (LDAP / AD).",
      ],
    },
    roleBullets: {
      fr: [
        "Conception de la topologie, adressage et résolution DNS.",
        "Installation AD DS, création de la forêt, jointure du client.",
        "Structuration des identités (OU, groupes, utilisateurs) avant durcissement GPO.",
      ],
      en: [
        "Topology, addressing and DNS design.",
        "AD DS install, forest creation, client join.",
        "Identity structure (OUs, groups, users) before GPO hardening.",
      ],
    },
    learnedBullets: {
      fr: [
        "Un domaine n’est pas « le login Windows » : il faut vérifier LDAP réellement (port, DNS, jointure).",
        "Les GPO et la délégation se pensent par OU, pas par machine isolée.",
      ],
      en: [
        "A domain is not just “Windows login”: LDAP has to be checked for real (port, DNS, join).",
        "GPOs and delegation are thought per OU, not per isolated machine.",
      ],
    },
  },
  {
    slug: "reseau-securise-entreprise",
    title: {
      fr: "Réseau sécurisé entreprise",
      en: "Secure enterprise network",
    },
    featured: true,
    description: {
      fr: "Lab d’équipe : réseau d’entreprise fictif, observation du trafic (Wireshark), simulation Marionnet, programmation C.",
      en: "Team lab: fictional enterprise network, traffic observation (Wireshark), Marionnet simulation, C programming.",
    },
    techStack: ["C", "Wireshark", "Marionnet", "Réseau"],
    highlights: {
      fr: ["Analyse de trafic et réglages réseau en environnement simulé."],
      en: ["Traffic analysis and network setup in a simulated environment."],
    },
    roleBullets: {
      fr: ["Déploiement et tests en lab simulé."],
      en: ["Deployment and tests in the simulated lab."],
    },
  },
  {
    slug: "taskbar-clear",
    title: { fr: "TaskbarClear", en: "TaskbarClear" },
    description: {
      fr: "Barre des tâches Windows 11 vraiment transparente : DLL dans Explorer, aucun processus résident. Alternative légère aux outils trop lourds.",
      en: "A truly transparent Windows 11 taskbar: a DLL in Explorer, no resident process. A light alternative to heavier tools.",
    },
    techStack: ["C++", "Win32", "XAML", "Windows 11", "Explorer"],
    links: {
      repo: "https://github.com/ilian21012005-bit/taskbar-clear",
    },
    highlights: {
      fr: [
        "Injection minimale dans Explorer, pas de service en fond.",
        "Cible uniquement le fond de la barre (BackgroundFill).",
        "Open source, sans télémétrie ni réseau.",
      ],
      en: [
        "Minimal injection into Explorer, no background service.",
        "Only the taskbar background (BackgroundFill) is targeted.",
        "Open source, no telemetry, no network.",
      ],
    },
    architectureBullets: {
      fr: [
        "Injecteur + DLL TAP pour agir sur l’arbre XAML d’Explorer.",
        "Scope volontairement étroit : un élément visuel, pas le shell entier.",
      ],
      en: [
        "Injector + TAP DLL acting on Explorer’s XAML tree.",
        "Narrow scope on purpose: one visual element, not the whole shell.",
      ],
    },
    roleBullets: {
      fr: ["Conception, implémentation native et documentation du repo public."],
      en: ["Design, native implementation and public repo documentation."],
    },
  },
  {
    slug: "zero-strike",
    title: { fr: "ZeroStrike", en: "ZeroStrike" },
    description: {
      fr: "Jeu de tir tactique LAN : grand écran Phaser 3, smartphones en manettes, jusqu’à 40 joueurs. Serveur Node.js autoritaire, Socket.io, classement SQLite. Docker et Render.",
      en: "Tactical LAN shooter: Phaser 3 big screen, phones as controllers, up to 40 players. Authoritative Node.js server, Socket.io, SQLite leaderboard. Docker and Render.",
    },
    techStack: ["Node.js", "Socket.io", "Phaser 3", "SQLite", "Docker"],
    links: {
      repo: "https://github.com/ilian21012005-bit/ZeroStrike",
      demo: "https://zerostrike.onrender.com/mobile/",
    },
    highlights: {
      fr: [
        "Serveur authoritative (~60 TPS) : l’état de partie n’est pas décidé par le client.",
        "Hub LAN : display + manettes mobiles.",
        "CORS, origines Socket.io, rate limiting, validation des entrées.",
      ],
      en: [
        "Authoritative server (~60 TPS): game state is not decided by the client.",
        "LAN hub: display + mobile controllers.",
        "CORS, Socket.io origins, rate limiting, input validation.",
      ],
    },
    architectureBullets: {
      fr: [
        "Séparation Display / Mobile / Serveur (MVC côté Node).",
        "Persistance classement via SQLite (sql.js).",
      ],
      en: [
        "Display / Mobile / Server split (MVC on Node).",
        "Leaderboard persistence via SQLite (sql.js).",
      ],
    },
    roleBullets: {
      fr: ["Architecture réseau temps réel, flux lobby/jeu, docs technique et déploiement."],
      en: ["Realtime network architecture, lobby/game flow, technical docs and deploy."],
    },
  },
  {
    slug: "guess-the-like",
    title: { fr: "Guess The Like", en: "Guess The Like" },
    description: {
      fr: "Jeu multi-joueurs en temps réel : deviner qui a liké un TikTok. Node.js, PostgreSQL, WebSocket. Déployé sur Render.",
      en: "Realtime multiplayer game: guess who liked a TikTok. Node.js, PostgreSQL, WebSocket. Deployed on Render.",
    },
    techStack: ["Node.js", "PostgreSQL", "WebSocket", "Playwright"],
    links: {
      repo: "https://github.com/ilian21012005-bit/guess-the-like",
      demo: "https://guess-the-like-eu.onrender.com/",
    },
    highlights: {
      fr: [
        "Synchronisation d’état via WebSocket, serveur autoritaire.",
        "Récupération des likes déclenchée uniquement au lancement de partie.",
        "Secrets hors git, usage personnel / responsable des données.",
      ],
      en: [
        "State sync over WebSocket, authoritative server.",
        "Likes are fetched only when a game starts.",
        "Secrets kept out of git, personal / responsible data use.",
      ],
    },
    architectureBullets: {
      fr: [
        "Logique de partie côté serveur + persistance PostgreSQL.",
        "Automatisation navigateur (Playwright) sur une session utilisateur légitime.",
      ],
      en: [
        "Game logic on the server + PostgreSQL persistence.",
        "Browser automation (Playwright) on a legitimate user session.",
      ],
    },
    roleBullets: {
      fr: ["Conception client-serveur, flux lobby / rounds / scoring."],
      en: ["Client-server design, lobby / rounds / scoring flow."],
    },
  },
  {
    slug: "plateforme-universitaire-sae-s3",
    title: {
      fr: "Plateforme universitaire (SAE S3)",
      en: "University platform (SAE S3)",
    },
    description: {
      fr: "Application web PHP (MVC) et desktop Java : constitution automatique de groupes TD/TP, rôles multiples, import CSV, API REST.",
      en: "PHP web app (MVC) and Java desktop: automatic TD/TP group building, multiple roles, CSV import, REST API.",
    },
    techStack: ["PHP", "Java", "MySQL", "API REST"],
    links: {
      repo: "https://git.iut-orsay.fr/hdasil3/s3projet",
    },
    highlights: {
      fr: [
        "Contrôle d’accès multi-rôles via API REST.",
        "Moteur de contraintes pour les groupes.",
      ],
      en: [
        "Multi-role access control via REST API.",
        "Constraint engine for group building.",
      ],
    },
    roleBullets: {
      fr: ["Conception et raccordement web / desktop, cadrage des contraintes."],
      en: ["Web / desktop design and wiring, constraint scoping."],
    },
  },
  {
    slug: "application-medias-sae-s2",
    title: {
      fr: "Application médias (SAE S2)",
      en: "Media app (SAE S2)",
    },
    description: {
      fr: "Application type Letterboxd : collection films/séries, listes, notes. Java, Swing, UML, tests JUnit.",
      en: "Letterboxd-style app: films/series collection, lists, ratings. Java, Swing, UML, JUnit tests.",
    },
    techStack: ["Java", "Swing", "UML", "JUnit"],
    links: {
      repo: "https://git.iut-orsay.fr/lsukarn/s2-sae-dev-app-ef4",
    },
    highlights: {
      fr: ["Conception OO (UML + patterns), IHM Swing, tests unitaires."],
      en: ["OO design (UML + patterns), Swing UI, unit tests."],
    },
    roleBullets: {
      fr: ["Participation à la conception UML et à l’implémentation."],
      en: ["Work on the UML design and the implementation."],
    },
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const SECONDARY_PROJECTS = PROJECTS.filter((p) => !p.featured);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
