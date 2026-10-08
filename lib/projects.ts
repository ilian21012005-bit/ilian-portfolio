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
    slug: "analyse-attaques-mitre",
    title: {
      fr: "Analyse d’attaques — MITRE, Wireshark, Suricata",
      en: "Attack analysis — MITRE, Wireshark, Suricata",
    },
    featured: true,
    description: {
      fr: "UE R5B09 (BUT 3) : cartographie ATT&CK, analyse de captures réseau (scans, force brute, C2, exfiltration) et écriture de règles Suricata. Méthode d’analyste, pas un titre SOC.",
      en: "R5B09 course (BUT 3): ATT&CK mapping, network capture analysis (scans, brute force, C2, exfiltration) and Suricata rules. Analyst method — not a SOC job title.",
    },
    techStack: ["Wireshark", "MITRE ATT&CK", "Suricata", "CTI", "pcap"],
    highlights: {
      fr: [
        "TP1 : mapping de techniques d’attaque avec ATT&CK Navigator.",
        "TP2 : lecture de captures — balayage ARP (T1046), force brute FTP, backdoor vsFTPd, bot IRC / flood ICMP.",
        "Distinction activité légitime vs anormale : un scan seul ne prouve pas l’intention.",
        "TP3 : règles Suricata pour la détection d’intrusion.",
        "Indicateurs de compromission (hôte infecté, serveurs C2) et reco (SFTP/FTPS, pare-feu, fail2ban).",
      ],
      en: [
        "Lab 1: attack technique mapping with ATT&CK Navigator.",
        "Lab 2: packet reads — ARP sweep (T1046), FTP brute force, vsFTPd backdoor, IRC bot / ICMP flood.",
        "Legitimate vs abnormal activity: a scan alone does not prove intent.",
        "Lab 3: Suricata rules for intrusion detection.",
        "IOCs (infected host, C2 servers) and hardening notes (SFTP/FTPS, firewall, fail2ban).",
      ],
    },
    architectureBullets: {
      fr: [
        "Chaîne d’analyse : observation (pcap) → hypothèse → technique ATT&CK → action / durcissement.",
        "Couche détection : Suricata en complément de l’analyse manuelle Wireshark.",
      ],
      en: [
        "Analysis chain: observe (pcap) → hypothesis → ATT&CK technique → action / hardening.",
        "Detection layer: Suricata alongside manual Wireshark analysis.",
      ],
    },
    roleBullets: {
      fr: [
        "Comptes-rendus TP1–TP3 (ATT&CK, analyse de trafic, règles Suricata).",
        "Formalisation des IOC et des recommandations sans exposer les sujets de TP.",
      ],
      en: [
        "Labs 1–3 write-ups (ATT&CK, traffic analysis, Suricata rules).",
        "IOC and recommendations formalized without publishing lab materials.",
      ],
    },
    learnedBullets: {
      fr: [
        "Un scan ou un flood se lit dans le trafic ; le contexte décide si c’est légitime.",
        "Le mapping ATT&CK sert à parler clairement d’une technique, pas à coller des labels au hasard.",
      ],
      en: [
        "A scan or flood shows up in traffic; context decides if it is legitimate.",
        "ATT&CK mapping is for clear technique language, not random labels.",
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
      fr: "UE R5B06 Services complexes : mini-infrastructure Windows Server 2022 (AD DS / LDAP) et poste Windows 11. Jointure au domaine, OU, groupes, GPO ; suite TP2 notions avancées. WLAN / VPN au programme du cours.",
      en: "R5B06 Complex services: Windows Server 2022 mini-infra (AD DS / LDAP) and Windows 11 client. Domain join, OUs, groups, GPOs; lab 2 advanced topics. WLAN / VPN covered in the course.",
    },
    techStack: ["Windows Server 2022", "Active Directory", "LDAP", "GPO", "DNS", "VirtualBox"],
    highlights: {
      fr: [
        "TP1 : topologie isolée (serveur + client), rôle AD DS, promotion DC, DNS intégré.",
        "Arborescence d’OU, groupes et comptes de test ; jointure du poste au domaine.",
        "GPO (mots de passe, partages, restrictions) et délégation — finalisation en cours (TP2).",
        "Cours associé : WLAN et VPN (complément réseau / accès).",
      ],
      en: [
        "Lab 1: isolated topology (server + client), AD DS role, DC promotion, integrated DNS.",
        "OU tree, groups and test accounts; client domain join.",
        "GPOs (passwords, shares, restrictions) and delegation — finishing in lab 2.",
        "Related course topics: WLAN and VPN (network / access complement).",
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
    slug: "continuite-supervision",
    title: {
      fr: "Continuité de service & supervision",
      en: "Business continuity & monitoring",
    },
    featured: true,
    description: {
      fr: "UE R5B08 : analyse de risques (RTO/RPO) puis stack de supervision Prometheus, Grafana, node_exporter et Nagios — alertes CPU et débit pour détecter une exfiltration avant chiffrement.",
      en: "R5B08: risk analysis (RTO/RPO) then Prometheus, Grafana, node_exporter and Nagios monitoring — CPU and bandwidth alerts to catch exfiltration before encryption.",
    },
    techStack: ["Prometheus", "Grafana", "Nagios", "node_exporter", "PromQL"],
    highlights: {
      fr: [
        "Cartographie d’actifs et risques (physique, matériel, cyber) avec priorisation.",
        "RTO / RPO et plan de traitement pour un scénario type entreprise.",
        "Dashboard Grafana (CPU, mémoire, disque, débit eth0) alimenté par Prometheus.",
        "Alertes : CPU utilisateur > 70 % et débit sortant élevé — utiles contre une copie nocturne de données.",
        "Constats : Nagios reste vert si les services répondent ; les métriques voient l’exfiltration.",
      ],
      en: [
        "Asset and risk map (physical, hardware, cyber) with prioritization.",
        "RTO / RPO and treatment plan for an enterprise-style scenario.",
        "Grafana dashboard (CPU, memory, disk, eth0 throughput) fed by Prometheus.",
        "Alerts: user CPU > 70% and high egress — useful against overnight data copy.",
        "Finding: Nagios stays green if services reply; metrics see exfiltration.",
      ],
    },
    architectureBullets: {
      fr: [
        "node_exporter → Prometheus (scraping + alert_rules) → Grafana (dashboards).",
        "Nagios en complément pour la disponibilité des services, pas le volume de trafic.",
      ],
      en: [
        "node_exporter → Prometheus (scraping + alert_rules) → Grafana (dashboards).",
        "Nagios for service uptime, not traffic volume.",
      ],
    },
    roleBullets: {
      fr: [
        "Rédaction du TP risques et du module supervision (binôme).",
        "Écriture des règles d’alerte et validation sous charge (stress-ng).",
      ],
      en: [
        "Risk lab and monitoring module write-ups (pair work).",
        "Alert rules and load validation (stress-ng).",
      ],
    },
    learnedBullets: {
      fr: [
        "La disponibilité ≠ l’absence d’attaque : il faut regarder le débit et le disque.",
        "Un délai `for: 1m` évite les fausses alertes sur un pic de deux secondes.",
      ],
      en: [
        "Uptime ≠ no attack: watch bandwidth and disk.",
        "A `for: 1m` delay avoids false alerts on a two-second spike.",
      ],
    },
  },
  {
    slug: "lab-kubernetes-minikube",
    title: {
      fr: "Lab Kubernetes (Minikube)",
      en: "Kubernetes lab (Minikube)",
    },
    description: {
      fr: "UE R5A09 Virtualisation avancée : déploiement nginx sous Minikube, Service NodePort, scale de pods, notions Deployment / ReplicaSet.",
      en: "R5A09 Advanced virtualization: nginx on Minikube, NodePort Service, pod scaling, Deployment / ReplicaSet basics.",
    },
    techStack: ["Kubernetes", "Minikube", "Docker", "kubectl", "nginx"],
    highlights: {
      fr: [
        "Cluster Minikube local : Deployment, ReplicaSet et Pod pour une image nginx versionnée.",
        "Exposition NodePort et scale à plusieurs replicas.",
        "Lecture claire de la chaîne objet Kubernetes (create deployment → ReplicaSet → Pod).",
      ],
      en: [
        "Local Minikube cluster: Deployment, ReplicaSet and Pod for a pinned nginx image.",
        "NodePort exposure and scale to multiple replicas.",
        "Clear read of the Kubernetes object chain (create deployment → ReplicaSet → Pod).",
      ],
    },
    roleBullets: {
      fr: ["Compte-rendu TP2 Kubernetes (découverte cluster, expose, scale)."],
      en: ["Lab 2 Kubernetes write-up (cluster discovery, expose, scale)."],
    },
    learnedBullets: {
      fr: [
        "Un Deployment ne lance pas « juste un conteneur » : ReplicaSet et Pod sont la mécanique réelle.",
        "Figer le tag d’image évite les surprises entre TP et prod.",
      ],
      en: [
        "A Deployment does not “just start a container”: ReplicaSet and Pod are the real machinery.",
        "Pinning the image tag avoids surprises between lab and prod.",
      ],
    },
  },
  {
    slug: "enfer-au-paradis-sae-s5",
    title: {
      fr: "De l’Enfer au Paradis (SAE S5)",
      en: "From Hell to Paradise (SAE S5)",
    },
    status: "in-progress",
    description: {
      fr: "Projet d’équipe Unity 6 : aventure coopérative 2 joueurs (Enfer → Purgatoire → Paradis), multijoueur Unity Relay, énigmes synchronisées. Option B — jeu multi-joueurs.",
      en: "Team Unity 6 project: 2-player co-op adventure (Hell → Purgatory → Paradise), Unity Relay multiplayer, synced puzzles. Option B — multiplayer game.",
    },
    techStack: ["Unity 6", "C#", "Netcode", "Unity Relay", "URP"],
    links: {
      repo: "https://git.iut-orsay.fr/ametin/projet-unity-s5",
    },
    highlights: {
      fr: [
        "Trois mondes + dimension « Chaîne », portails et progression par énigmes coop.",
        "Multijoueur sans ouverture de port : Relay, code salon, sync joueurs / puzzles.",
        "Salles d’énigmes modulaires (labyrinthe, fluide, objets cachés, etc.).",
        "Équipe ~10, GitLab IUT, build Windows pour démo en salle.",
      ],
      en: [
        "Three worlds + “Chain” dimension, portals and co-op puzzle progression.",
        "Multiplayer without port forwarding: Relay, lobby code, player / puzzle sync.",
        "Modular puzzle rooms (maze, fluid network, hidden objects, etc.).",
        "Team of ~10, IUT GitLab, Windows build for classroom demos.",
      ],
    },
    roleBullets: {
      fr: [
        "Contributions gameplay / réseau / outils Editor selon branches d’équipe.",
        "Travail collaboratif versionné (Git LFS, vérifs avant push).",
      ],
      en: [
        "Gameplay / networking / Editor tooling contributions per team branches.",
        "Versioned teamwork (Git LFS, pre-push checks).",
      ],
    },
  },
  {
    slug: "reseau-securise-entreprise",
    title: {
      fr: "Réseau sécurisé entreprise",
      en: "Secure enterprise network",
    },
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
    slug: "clip-buffer",
    title: { fr: "Clip Buffer", en: "Clip Buffer" },
    description: {
      fr: "Replay buffer léger pour Windows (style Medal / ShadowPlay) : capture écran Desktop Duplication, encode NVIDIA NVENC, raccourci pour sauver les N dernières minutes. Sans overlay, sans cloud.",
      en: "Lightweight Windows replay buffer (Medal / ShadowPlay style): Desktop Duplication capture, NVIDIA NVENC encode, hotkey to save the last N minutes. No overlay, no cloud.",
    },
    techStack: ["C#", ".NET", "NVENC", "FFmpeg", "Windows"],
    links: {
      repo: "https://github.com/ilian21012005-bit/clip-buffer",
    },
    highlights: {
      fr: [
        "Buffer circulaire des N dernières minutes (défaut 5 min), sauvé au raccourci (F9).",
        "Encodeur NVENC dédié : impact FPS faible (cible ShadowPlay), pas d’injection dans le jeu.",
        "Capture écran Desktop Duplication — compatible anti-cheat type Vanguard.",
        "Tray Windows, config persistante, clips dans Vidéos\\ClipBuffer.",
      ],
      en: [
        "Circular buffer of the last N minutes (default 5), saved on hotkey (F9).",
        "Dedicated NVENC encode: low FPS impact (ShadowPlay-like), no game injection.",
        "Desktop Duplication screen capture — Vanguard-friendly approach.",
        "System tray, persistent config, clips under Videos\\ClipBuffer.",
      ],
    },
    architectureBullets: {
      fr: [
        "App .NET + FFmpeg bundlé ; buffer temporaire sous LocalAppData.",
        "Scope volontairement étroit : replay local, zéro télémetrie / cloud.",
      ],
      en: [
        ".NET app + bundled FFmpeg; temp buffer under LocalAppData.",
        "Narrow scope on purpose: local replay, zero telemetry / cloud.",
      ],
    },
    roleBullets: {
      fr: ["Conception, implémentation native Windows et repo public."],
      en: ["Design, native Windows implementation and public repo."],
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
