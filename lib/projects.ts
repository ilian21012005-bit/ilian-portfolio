type ProjectLinks = {
  repo?: string;
  demo?: string;
};

type Project = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  links?: ProjectLinks;
  highlights?: string[];
  architectureBullets?: string[];
  securityBullets?: string[];
  roleBullets?: string[];
  decisionsBullets?: string[];
  tradeOffsBullets?: string[];
  interviewChecklistBullets?: string[];
  summary30sBullets?: string[];
  learnedBullets?: string[];
  futureImprovementsBullets?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "guess-the-like",
    title: "Guess The Like",
    description:
      "Jeu multi-joueurs en temps réel : devine qui a liké le TikTok. Node.js, PostgreSQL, WebSocket ; récupération des likes via Playwright sur une session navigateur utilisateur (projet personnel, usage responsable des données). Déployé sur Render.",
    techStack: ["Node.js", "PostgreSQL", "WebSocket", "Playwright", "JavaScript", "HTML/CSS"],
    links: {
      repo: "https://github.com/ilian21012005-bit/guess-the-like",
      demo: "https://guess-the-like-eu.onrender.com/",
    },
    highlights: [
      "Multijoueur en temps réel (sessions, synchronisation état partie).",
      "Persistences et historique via PostgreSQL.",
      "Scraping automatisé via Playwright sur une session utilisateur (explication conformité/usage responsable).",
      "Récupération des likes uniquement au moment du lancement (« Prêt ») pour limiter l’exposition des données.",
    ],
    architectureBullets: [
      "Serveur : logique partie + stockage (PostgreSQL).",
      "Temps réel : WebSocket pour l’échange état/événements.",
      "Récupération likes : automatisation navigateur (Playwright) via session légitime.",
      "Front : UI jeu (PC/mobile) et gestion des rounds.",
    ],
    securityBullets: [
      "Usage responsable : pas de présentation “commerciale”, cadrage du projet comme technique/perso.",
      "Vie privée : réduire le temps d’accès aux données (clic “Prêt”), limiter l’exposition côté UI.",
      "Hygiène dev : variables d’environnement, pas de secrets commités.",
    ],
    roleBullets: [
      "Conception architecture client-serveur temps réel.",
      "Intégration persistance et flux de jeu (lobby, rounds, scoring).",
      "Mise en place du pipeline Playwright (robustesse session).",
    ],
    decisionsBullets: [
      "Découplage logique jeu (serveur) et interface (front) via WebSocket.",
      "Récupération des likes déclenchée uniquement au moment du lancement (“Prêt”) pour limiter l’exposition des données.",
      "Automatisation via Playwright basée sur une session utilisateur légitime (éviter la “double session” fragile).",
      "Whitelisting/validation côté serveur des paramètres de jeu pour éviter des états incohérents.",
    ],
    tradeOffsBullets: [
      "Précision et stabilité de l’extraction (Playwright) vs contraintes de temps d’attente (robustesse session).",
      "Persistance PostgreSQL vs mode mémoire : plus fiable pour historique, mais plus d’opérations serveur.",
      "Simplicité des messages WebSocket vs granularité fine des “diffs” (payload vs complexité).",
    ],
    interviewChecklistBullets: [
      "Expliquer pourquoi WebSocket plutôt que HTTP polling (temps réel, latence).",
      "Décrire le flux “lobby → Prêt → récupération likes → rounds → scoring”.",
      "Comment gérer les erreurs d’automatisation (timeouts, session expirée) proprement côté back/front.",
      "Sécurité by design : validation entrées, réduction exposition données, gestion des secrets via .env.",
    ],
    summary30sBullets: [
      "Jeu temps réel : synchronisation état via WebSocket et serveur Node.js.",
      "Persistance (PostgreSQL) pour historique/parties, et récupération déclenchée sur action explicite (“Prêt”).",
      "Automatisation Playwright basée sur une session utilisateur légitime (usage responsable).",
    ],
    learnedBullets: [
      "Pourquoi “authoritative server” réduit les états incohérents en temps réel.",
      "Comment fiabiliser un pipeline Playwright (timeouts, robustesse session, retries).",
      "L’importance de la validation/whitelisting côté serveur pour éviter des bugs de synchro.",
    ],
    futureImprovementsBullets: [
      "Passer à des mises à jour incrémentales (diffs) plutôt qu’un broadcast complet si besoin perf.",
      "Renforcer la gestion des erreurs UI (messages actionnables quand la session navigateur expire).",
      "Ajouter une couche d’observabilité plus riche (logs structurés + métriques jeu).",
    ],
  },
  {
    slug: "zero-strike",
    title: "ZeroStrike",
    description:
      "Jeu de tir tactique multijoueur LAN (jusqu'à 40 joueurs) : grand écran Phaser 3 + smartphones en manettes. Serveur Node.js autoritaire (~60 TPS), Socket.io, modes Search & Destroy et Deathmatch, vote de map, SQLite (sql.js) pour le classement. Docker, CI GitHub Actions, déploiement Render.",
    techStack: [
      "Node.js",
      "Socket.io",
      "Express",
      "Phaser 3",
      "SQLite",
      "sql.js",
      "Docker",
      "GitHub Actions",
    ],
    links: {
      repo: "https://github.com/ilian21012005-bit/ZeroStrike",
      demo: "https://zerostrike.onrender.com/mobile/",
    },
    highlights: [
      "Serveur authoritative : état de partie (physique, scores) centralisé côté serveur.",
      "Expérience salle/LAN party : hub web + grands écrans + mobiles en manettes.",
      "Vote de map + profils de partie (Fun / Compétitif / Démo).",
      "Classement persistant : SQLite via sql.js.",
    ],
    architectureBullets: [
      "Client-serveur : logique métier + boucle ~60 TPS côté serveur Node.js.",
      "Display : Phaser 3 (scènes Lobby/Game, HUD, effets).",
      "Mobile : manette tactile (HTML/CSS/JS + nipple.js).",
      "Design serveur MVC (controllers/services/models) + séparation Display/Mobile.",
    ],
    securityBullets: [
      "CORS HTTP + origines Socket.io pilotées par `ALLOWED_ORIGINS` (durcissement).",
      "Rate limiting sur endpoints (via express-rate-limit) et endpoints protégés (ex. métriques).",
      "Validation/whitelisting des entrées API (ex. limite/ordre classement, parsing paramètres).",
      "Observabilité/config via `.env.example` et bonnes pratiques de déploiement (DB_PATH).",
    ],
    roleBullets: [
      "Conception architecture réseau et synchronisation état temps réel.",
      "Mise en place des flux lobby/jeu, classement et persistance.",
      "Documentation technique (installation, maintenance, audit sécurité).",
    ],
    decisionsBullets: [
      "Serveur authoritative pour éliminer la triche : l’état (physique, scores, rounds) n’est jamais “décidé” par le client.",
      "Boucle temps réel côté serveur (~60 TPS) + rendu séparé (Phaser display, client mobile).",
      "Persistance de classement en SQLite (sql.js) pour être autonome sans dépendance MongoDB.",
      "Hardening réseau : CORS + origines Socket.io, rate limiting, validation/whitelisting des entrées API.",
    ],
    tradeOffsBullets: [
      "Équilibre fluidité vs bande passante : broadcast d’état complet plus simple, mais payload plus gros (optimisations possibles en delta).",
      "Déploiement “LAN-first” vs ouverture internet : protocole/URLs plus stricts côté production.",
      "SQLite embarqué (sql.js) vs DB externe : plus simple à déployer, mais limites en charge très forte.",
    ],
    interviewChecklistBullets: [
      "Expliquer la séparation Display/Mobile/Serveur et le rôle du GameService (MVC).",
      "Comment tu gères la machine à états des rounds et la synchronisation (authoritative).",
      "Pourquoi CORS + ALLOWED_ORIGINS + express-rate-limit ?",
      "Comment tu traites les entrées (whitelisting, parsing) pour éviter des états invalides.",
    ],
    summary30sBullets: [
      "LAN multijoueur (jusqu’à 40) avec serveur Node.js autoritaire.",
      "Affichage grand écran via Phaser 3 et manettes smartphones (HTML5 + nipple.js).",
      "Classement persistant SQLite via sql.js + déploiement (Docker/CI).",
    ],
    learnedBullets: [
      "Construire une machine à états de rounds propre (Buy/Action/RoundEnd) et testable.",
      "Gérer efficacement l’update temps réel sans exploser la bande passante.",
      "Appliquer sécurité by design : CORS/Socket.io, validation entrées, rate limiting.",
    ],
    futureImprovementsBullets: [
      "Optimiser le broadcast d’état (delta vs payload complet) si le nombre de joueurs augmente.",
      "Améliorer le modèle de sauvegarde classement (éviter writeFileSync trop fréquent).",
      "Renforcer davantage l’observabilité (traces par round, latence WS).",
    ],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description:
      "Ce site : portfolio développeur fullstack & étudiant Systèmes/Réseaux. Next.js 16 (App Router), design Dark Engineering, Framer Motion, SEO (sitemap, Open Graph) et accessibilité. URL de production définie par NEXT_PUBLIC_SITE_URL.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Lucide"],
    links: {
      repo: "https://github.com/ilian21012005-bit/ilian-portfolio",
    },
    highlights: [
      "Navigation et structure pensés pour recruteur/stage (sections claires, contenu actionnable).",
      "SEO : `robots`, `sitemap`, metadata par page.",
      "Accessibilité : focus/skip-link, rendu sémantique et contraste.",
      "Composants réutilisables (Hero, cards, badges, timeline Git).",
    ],
    architectureBullets: [
      "App Router Next.js + composants UI (composants client côté interactions).",
      "Données centralisées : projets/compétences dans `lib/`.",
      "Déploiement : variables `NEXT_PUBLIC_*` pour liens/contact/SEO.",
    ],
    roleBullets: [
      "Conception UX + code front (animation, layout, composants).",
      "Structuration des données pour rendre les fiches “Projets” maintenables.",
    ],
    decisionsBullets: [
      "Centralisation des données de projets et compétences dans `lib/` pour éviter la duplication.",
      "SEO : metadata, `robots`, `sitemap`, Open Graph, URLs cohérentes via `NEXT_PUBLIC_SITE_URL`.",
      "Accessibilité : focus visible et skip link, navigation clavier-friendly.",
      "Animations contrôlées et respect des préférences utilisateur (réduction des animations).",
    ],
    tradeOffsBullets: [
      "Animations Framer Motion : effet “premium” vs coût perf (mitigation via reduced motion).",
      "Static prerender vs pages dynamiques (certaines SSR/edge) pour conserver SEO et UX.",
      "Tailwind pour vitesse d’itération vs risque de classes longues (mitigation via composants).",
    ],
    interviewChecklistBullets: [
      "Comment tu gères le SEO Next.js (metadata/opengraph/sitemap/robots) ?",
      "Pourquoi App Router et comment tu organises tes pages/composants ?",
      "Comment tu t’assures de l’accessibilité (focus/skip link) ?",
      "Performance : comment tu as pensé aux animations et au rendu ?",
    ],
    summary30sBullets: [
      "Portfolio recruteur en Next.js 16 : contenu structuré et navigation claire.",
      "Fiches projets : architecture, sécurité/réseaux, rôle et décisions techniques.",
      "SEO + accessibilité + animations contrôlées (respect reduced motion).",
    ],
    learnedBullets: [
      "Comment centraliser les données dans `lib/` pour éviter la duplication.",
      "Pourquoi les pages dynamiques doivent rester propres côté metadata/links.",
      "L’impact UX : micro-interactions, lisibilité et hiérarchie visuelle.",
    ],
    futureImprovementsBullets: [
      "Ajouter des exports “resume” par projet (PDF/texte) pour entretien.",
      "Optimiser les composants interactifs pour perf (bundle/SSR constraints).",
      "Ajouter une page “Simulateur réseau” plus pédagogique avec un guide d’exercices.",
    ],
  },
  {
    slug: "plateforme-universitaire-sae-s3",
    title: "Plateforme universitaire (SAE S3)",
    description:
      "Application web PHP (MVC) et desktop Java avec algorithmes de constitution automatique de groupes TD/TP, gestion multi-rôles (responsables, enseignants, étudiants), import CSV notes, sondages, contraintes (niveau, genre, covoiturage). Architecture via API REST.",
    techStack: ["PHP", "Java", "MySQL", "API REST", "JavaScript", "Bootstrap", "Algorithmes"],
    links: {
      repo: "https://git.iut-orsay.fr/hdasil3/s3projet",
    },
    highlights: [
      "Rôles multiples et contrôle d’accès fonctionnel via API REST.",
      "Import/traitement de données (CSV) et contraintes de groupe.",
      "Conception UML et intégration avec IHM.",
    ],
    architectureBullets: [
      "Briques web (PHP MVC) + IHM desktop (Java).",
      "Couplage par API REST (séparation responsabilités).",
      "Moteur d’algorithmes pour groupes TD/TP.",
    ],
    roleBullets: [
      "Participation à la conception et au raccordement web/desktop.",
      "Cadrage des contraintes et validation des résultats de constitution.",
    ],
  },
  {
    slug: "application-medias-sae-s2",
    title: "Application médias (SAE S2)",
    description:
      "Application type Letterboxd : gestion de sa collection de films et séries, listes personnalisées, notation et avis, suivi d'utilisateurs. Conception UML, Java (modèles + IHM Swing), tests unitaires, maquettes IHM.",
    techStack: ["Java", "Swing", "UML", "JUnit", "Git", "Factory pattern"],
    links: {
      repo: "https://git.iut-orsay.fr/lsukarn/s2-sae-dev-app-ef4",
    },
    highlights: [
      "Conception orientée objet (UML + patterns).",
      "IHM Swing et maquettes intégrées au projet.",
      "Tests unitaires (JUnit) pour la logique applicative.",
    ],
    roleBullets: ["Participation à la conception UML et à l’implémentation orientée objet."],
  },
  {
    slug: "reseau-securise-entreprise",
    title: "Réseau sécurisé entreprise",
    description:
      "Mise en place d'un réseau sécurisé pour une entreprise fictive en équipe. Administration du réseau avec Wireshark et Marionnet, programmation en langage C.",
    techStack: ["C", "Wireshark", "Marionnet", "Réseau"],
    links: {
      demo: "/simulateur",
    },
    highlights: ["Analyse trafic (Wireshark), observation et réglages réseau.", "Mise en pratique notions sécurité réseau."],
    architectureBullets: ["Simulation réseau et observation des flux (capture/diagnostic)."],
    roleBullets: ["Déploiement & tests en environnement simulé (Marionnet)."],
  },
  {
    slug: "postes-linux",
    title: "Postes Linux",
    description:
      "Installation et configuration de postes de travail sous Linux en équipe. Manipulation du système de fichiers, comptes et groupes, droits, commandes de base. Contexte : TP BUT 1 ; livrables réalisés en direct (pas de dépôt en ligne).",
    techStack: ["Linux", "Administration système"],
    roleBullets: ["Administration de base : utilisateurs, permissions, fichiers et commandes."],
    highlights: ["Pratique des commandes et bonnes pratiques de droits.", "Apprentissage du diagnostic bas niveau."],
  },
  {
    slug: "applications-gestion",
    title: "Applications de gestion",
    description:
      "Création d'applications de gestion en équipe : Cité universitaire Paris, Jeux Olympiques 2024. Utilisation UML, IHM, JavaScript via modèle MVC. Résultat : maquettes, diagrammes et code livrés en séance (pas de dépôt public).",
    techStack: ["JavaScript", "UML", "MVC", "IHM"],
    highlights: ["Conception UML et séparation responsabilité front/back.", "Modèle MVC côté IHM web."],
    roleBullets: ["Contribution à l’architecture et au raccordement des écrans."],
  },
  {
    slug: "sites-web-fictifs",
    title: "Sites web fictifs",
    description:
      "Création de plusieurs sites web fictifs en autonomie. Conception complète front et back avec technologies web modernes. Contexte : projets réalisés en direct, sans dépôt en ligne.",
    techStack: ["HTML", "CSS", "PHP", "JavaScript"],
    highlights: ["Conception fullstack (front/back) en autonomie.", "Projet “TP” : livraison en séance."],
    roleBullets: ["Développement front & back selon maquettes."],
  },
  {
    slug: "jeu-video-cpp",
    title: "Jeu vidéo C++",
    description:
      "Développement d'un jeu vidéo en C++ avec bibliothèques open source. Architecture modulaire, gestion du rendu et des entités. Projet réalisé en formation (pas de démo en ligne).",
    techStack: ["C++", "OpenGL", "Game Design"],
    highlights: ["Architecture modulaire et gestion entités.", "Intégration bibliothèques graphiques open source."],
    roleBullets: ["Conception et implémentation de modules de jeu (rendu/entités)."],
  },
];

