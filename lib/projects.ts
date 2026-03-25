export const PROJECTS = [
  {
    title: "Guess The Like",
    description:
      "Jeu multi-joueurs en temps réel : devine qui a liké le TikTok. Node.js, PostgreSQL, WebSocket ; récupération des likes via Playwright sur une session navigateur utilisateur (projet personnel, usage responsable des données). Déployé sur Render.",
    techStack: ["Node.js", "PostgreSQL", "WebSocket", "Playwright", "JavaScript", "HTML/CSS"],
    links: {
      repo: "https://github.com/ilian21012005-bit/guess-the-like",
      demo: "https://guess-the-like-eu.onrender.com/",
    },
  },
  {
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
  },
  {
    title: "Portfolio",
    description:
      "Ce site : portfolio développeur fullstack & étudiant Systèmes/Réseaux. Next.js 16 (App Router), design Dark Engineering, Framer Motion, SEO (sitemap, Open Graph) et accessibilité. URL de production définie par NEXT_PUBLIC_SITE_URL.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Lucide"],
    links: {
      repo: "https://github.com/ilian21012005-bit/ilian-portfolio",
      demo: "",
    },
  },
  {
    title: "Plateforme universitaire (SAE S3)",
    description:
      "Application web PHP (MVC) et desktop Java avec algorithmes de constitution automatique de groupes TD/TP, gestion multi-rôles (responsables, enseignants, étudiants), import CSV notes, sondages, contraintes (niveau, genre, covoiturage). Architecture via API REST.",
    techStack: ["PHP", "Java", "MySQL", "API REST", "JavaScript", "Bootstrap", "Algorithmes"],
    links: {
      repo: "https://git.iut-orsay.fr/hdasil3/s3projet",
      demo: "",
    },
  },
  {
    title: "Application médias (SAE S2)",
    description:
      "Application type Letterboxd : gestion de sa collection de films et séries, listes personnalisées, notation et avis, suivi d'utilisateurs. Conception UML, Java (modèles + IHM Swing), tests unitaires, maquettes IHM.",
    techStack: ["Java", "Swing", "UML", "JUnit", "Git", "Factory pattern"],
    links: {
      repo: "https://git.iut-orsay.fr/lsukarn/s2-sae-dev-app-ef4",
      demo: "",
    },
  },
  {
    title: "Réseau sécurisé entreprise",
    description:
      "Mise en place d'un réseau sécurisé pour une entreprise fictive en équipe. Administration du réseau avec Wireshark et Marionnet, programmation en langage C.",
    techStack: ["C", "Wireshark", "Marionnet", "Réseau"],
    links: {
      repo: "",
      demo: "/simulateur",
    },
  },
  {
    title: "Postes Linux",
    description:
      "Installation et configuration de postes de travail sous Linux en équipe. Manipulation du système de fichiers, comptes et groupes, droits, commandes de base. Contexte : TP BUT 1 ; livrables réalisés en direct (pas de dépôt en ligne).",
    techStack: ["Linux", "Administration système"],
    links: {
      repo: "",
      demo: "",
    },
  },
  {
    title: "Applications de gestion",
    description:
      "Création d'applications de gestion en équipe : Cité universitaire Paris, Jeux Olympiques 2024. Utilisation UML, IHM, JavaScript via modèle MVC. Résultat : maquettes, diagrammes et code livrés en séance (pas de dépôt public).",
    techStack: ["JavaScript", "UML", "MVC", "IHM"],
    links: {
      repo: "",
      demo: "",
    },
  },
  {
    title: "Sites web fictifs",
    description:
      "Création de plusieurs sites web fictifs en autonomie. Conception complète front et back avec technologies web modernes. Contexte : projets réalisés en direct, sans dépôt en ligne.",
    techStack: ["HTML", "CSS", "PHP", "JavaScript"],
    links: {
      repo: "",
      demo: "",
    },
  },
  {
    title: "Jeu vidéo C++",
    description:
      "Développement d'un jeu vidéo en C++ avec bibliothèques open source. Architecture modulaire, gestion du rendu et des entités. Projet réalisé en formation (pas de démo en ligne).",
    techStack: ["C++", "OpenGL", "Game Design"],
    links: {
      repo: "",
      demo: "",
    },
  },
];

