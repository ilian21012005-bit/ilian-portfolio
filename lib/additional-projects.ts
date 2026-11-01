import type { Project } from "./projects";

export const ADDITIONAL_PROJECTS: Project[] = [
  {
    slug: "copy-glitch",
    title: { fr: "COPY GLITCH!", en: "COPY GLITCH!" },
    status: "in-progress",
    description: {
      fr: "Prototype Roblox de laboratoire et de collection d’objets. Le travail actuel porte sur les règles Luau testables, les effets de gameplay et la traçabilité entre conception, code et validation. La boucle complète reste en développement.",
      en: "Roblox laboratory and object-collection prototype. Current work focuses on testable Luau rules, gameplay effects and traceability between design, code and validation. The complete gameplay loop remains in development.",
    },
    techStack: ["Roblox", "Luau", "Rojo", "Lune", "Blender"],
    highlights: {
      fr: [
        "Modules de règles pour les copies, les finitions, les garanties et les effets.",
        "Service de buffs séparé des règles partagées.",
        "Matrice reliant chaque fonctionnalité à sa règle, son code et sa validation.",
        "Distinction explicite entre le prototype existant et les fonctionnalités prévues.",
      ],
      en: [
        "Rule modules for copies, finishes, guarantees and effects.",
        "Buff service separated from shared rules.",
        "A matrix connecting each feature to its rules, code and validation.",
        "Explicit distinction between the existing prototype and planned features.",
      ],
    },
    architectureBullets: {
      fr: [
        "Règles partagées isolées dans des modules Luau et couvertes par des tests unitaires.",
        "Scripts serveur synchronisés par Rojo ; scène et code conservés séparément.",
      ],
      en: [
        "Shared rules isolated in Luau modules with unit tests.",
        "Server scripts synchronized with Rojo; scene and code stored separately.",
      ],
    },
    roleBullets: {
      fr: [
        "Conception du projet, structuration du prototype et développement des règles.",
        "Mise en place du suivi d’implémentation et des critères de validation.",
      ],
      en: [
        "Project design, prototype structure and rules development.",
        "Implementation tracking and validation criteria.",
      ],
    },
    learnedBullets: {
      fr: [
        "Une règle validée en test unitaire ne prouve pas que toute la boucle de jeu fonctionne dans le moteur.",
        "Relier conception et preuves d’implémentation évite de présenter une intention comme une fonctionnalité livrée.",
      ],
      en: [
        "A rule passing a unit test does not prove the entire gameplay loop works in-engine.",
        "Connecting design to implementation evidence prevents presenting intentions as shipped features.",
      ],
    },
  },
  {
    slug: "karu",
    title: { fr: "Karu", en: "Karu" },
    featured: true,
    description: {
      fr: "Application Windows de replay : capture des dernières minutes de jeu, encodage NVIDIA NVENC et sauvegarde au raccourci. Une bibliothèque locale permet de lire, classer et découper les clips.",
      en: "Windows replay app: capture the last minutes of gameplay, encode with NVIDIA NVENC and save with a hotkey. A local library lets you play, organize and trim clips.",
    },
    techStack: ["C#", ".NET", "NVENC", "FFmpeg", "LibVLC"],
    links: { repo: "https://github.com/ilian21012005-bit/karu" },
    highlights: {
      fr: [
        "Mémoire tampon circulaire, sauvegarde avec F9 ou un raccourci configurable.",
        "Capture de l’écran par Desktop Duplication, sans injection dans le jeu.",
        "Bibliothèque avec lecture LibVLC, dossiers, favoris, tags et découpe.",
        "Détection OCR du killfeed pour les clips automatiques, selon le pseudo et le focus du jeu.",
        "Installateur Inno Setup et workflow de publication Windows sur GitHub.",
      ],
      en: [
        "Circular replay buffer, saved with F9 or a configurable hotkey.",
        "Desktop Duplication screen capture without injecting into the game.",
        "Library with LibVLC playback, folders, favorites, tags and trimming.",
        "OCR killfeed detection for automatic clips, based on player name and game focus.",
        "Inno Setup installer and Windows release workflow on GitHub.",
      ],
    },
    architectureBullets: {
      fr: [
        "Application .NET avec FFmpeg pour la capture et l’encodage matériel.",
        "Configuration persistante et clips conservés sur le poste.",
        "Interface et icône de notification : fermer la fenêtre conserve le buffer actif.",
      ],
      en: [
        ".NET app using FFmpeg for capture and hardware encoding.",
        "Persistent configuration and locally stored clips.",
        "Window and system tray: closing the window keeps the buffer running.",
      ],
    },
    roleBullets: {
      fr: [
        "Conception de l’application, développement Windows et documentation.",
        "Intégration de la capture, de la bibliothèque et de la distribution.",
      ],
      en: [
        "Application design, Windows development and documentation.",
        "Integration of capture, library and distribution.",
      ],
    },
    learnedBullets: {
      fr: [
        "La capture, l’encodage et la lecture sont trois problèmes distincts à diagnostiquer.",
        "Le comportement dépend du GPU, des pilotes et du mode d’affichage ; aucun impact FPS chiffré n’a été mesuré ici.",
      ],
      en: [
        "Capture, encoding and playback are three separate problems to diagnose.",
        "Behavior depends on GPU, drivers and display mode; no quantified FPS impact is claimed here.",
      ],
    },
  },
  {
    slug: "dreamshift-bureau",
    title: { fr: "Dreamshift Bureau", en: "Dreamshift Bureau" },
    status: "in-progress",
    description: {
      fr: "Jeu d’horreur coopératif Roblox dans un environnement de bureaux, structuré en trois shifts. Code Luau séparé entre services serveur, contrôleurs client et modules partagés, avec une chaîne d’outils Rojo et Rokit.",
      en: "Cooperative Roblox horror game in an office setting, structured around three shifts. Luau code is split into server services, client controllers and shared modules, with Rojo and Rokit tooling.",
    },
    techStack: ["Roblox", "Luau", "Rojo", "Rokit", "Blender"],
    highlights: {
      fr: [
        "Organisation des services serveur, contrôleurs client et modules partagés.",
        "Le serveur valide les intentions du client ; dégâts et récompenses restent de son côté.",
        "Travail sur les environnements de bureaux OrbisCorp et les assets 3D.",
        "Versions d’outils épinglées et tests unitaires dans le dépôt.",
      ],
      en: [
        "Organized server services, client controllers and shared modules.",
        "The server validates client intent and retains control of damage and rewards.",
        "Work on OrbisCorp office environments and 3D assets.",
        "Pinned tool versions and unit tests in the repository.",
      ],
    },
    architectureBullets: {
      fr: [
        "Services serveur dans ServerScriptService, contrôleurs dans StarterPlayerScripts.",
        "Modules partagés dans ReplicatedStorage ; tests dans ServerStorage.",
        "La place Roblox conserve le DataModel ; Git versionne le code et le scaffold.",
      ],
      en: [
        "Server services in ServerScriptService, controllers in StarterPlayerScripts.",
        "Shared modules in ReplicatedStorage; tests in ServerStorage.",
        "The Roblox place holds the DataModel; Git versions the code and scaffold.",
      ],
    },
    roleBullets: {
      fr: [
        "Développement du jeu, structuration du code et création des environnements.",
        "Itérations sur les assets et les scènes avec Roblox Studio et Blender.",
      ],
      en: [
        "Game development, code structure and environment creation.",
        "Asset and scene iteration using Roblox Studio and Blender.",
      ],
    },
    learnedBullets: {
      fr: [
        "Une intention client doit être validée et normalisée avant toute conséquence de jeu.",
        "Le code versionné et la scène native demandent des vérifications distinctes. Le jeu reste en développement.",
      ],
      en: [
        "Client intent must be validated and normalized before changing game state.",
        "Versioned code and the native scene require separate checks. The game remains in development.",
      ],
    },
  },
  {
    slug: "bot-recherche-offres",
    title: {
      fr: "Veille d’offres & suivi de candidatures",
      en: "Job monitoring & application tracking",
    },
    description: {
      fr: "Bot Python qui rassemble les offres de France Travail, Adzuna, Jooble et PASS, filtre les annonces et prépare les dossiers. Une file persistante gère les candidatures et relances, avec un mode de simulation.",
      en: "Python bot aggregating France Travail, Adzuna, Jooble and PASS offers, filtering listings and preparing applications. A persistent queue tracks applications and follow-ups, with a dry-run mode.",
    },
    techStack: ["Python", "API REST", "SQLite", "SMTP", "unittest"],
    highlights: {
      fr: [
        "Sources séparées par connecteur et filtrage selon le profil recherché.",
        "Génération de documents et suivi des étapes de candidature.",
        "File d’attente et plafond quotidien pour les envois par mail.",
        "Les tentatives d’envoi interrompues restent suspendues jusqu’à vérification.",
      ],
      en: [
        "Separate source connectors and profile-based filtering.",
        "Document generation and application status tracking.",
        "Queue and daily cap for email submissions.",
        "Interrupted send attempts remain suspended pending verification.",
      ],
    },
    architectureBullets: {
      fr: [
        "Connecteurs d’offres → filtres → dossiers → suivi persistant.",
        "Séparation de la préparation et de l’envoi ; commandes de résolution pour les états incertains.",
      ],
      en: [
        "Source connectors → filters → application files → persistent tracking.",
        "Preparation and sending are separate, with resolution commands for uncertain states.",
      ],
    },
    roleBullets: {
      fr: [
        "Développement des connecteurs, du filtrage et du cycle de traitement.",
        "Ajout de tests locaux sur le suivi et la découverte d’offres.",
      ],
      en: [
        "Developed connectors, filtering and the processing cycle.",
        "Added local tests for tracking and offer discovery.",
      ],
    },
    learnedBullets: {
      fr: [
        "Un envoi interrompu n’est pas nécessairement un échec : il faut vérifier avant de réessayer.",
        "Un mode de simulation permet de contrôler les dossiers sans contacter de destinataire.",
      ],
      en: [
        "An interrupted send is not necessarily a failure: verify before retrying.",
        "Dry-run mode allows checking files without contacting recipients.",
      ],
    },
  },
  {
    slug: "copilote-hellowork",
    title: {
      fr: "Copilote de candidatures HelloWork",
      en: "HelloWork application assistant",
    },
    description: {
      fr: "Outil Python qui exploite les alertes mail et les liens d’offres pour classer les stages, préparer CV et lettres, et suivre les candidatures dans SQLite. Les formulaires directs compatibles sont gérés via Playwright.",
      en: "Python tool using email alerts and offer links to rank internships, prepare résumés and cover letters, and track applications in SQLite. Compatible direct application forms are handled with Playwright.",
    },
    techStack: ["Python", "SQLite", "Playwright", "lxml", "IMAP"],
    highlights: {
      fr: [
        "Score explicable selon le contrat, les compétences, le niveau, la date et la localisation.",
        "Géocodage et filtrage de distance Haversine, avec cache.",
        "File quotidienne cumulative : relancer ne crée pas une nouvelle candidature.",
        "Statuts distincts pour un envoi confirmé, en attente ou incertain.",
        "Tests sur un simulateur local de formulaire.",
      ],
      en: [
        "Explainable ranking by contract, skills, level, freshness and location.",
        "Geocoding and cached Haversine distance filtering.",
        "Cumulative daily queue: rerunning does not create another application.",
        "Separate states for confirmed, pending and uncertain submissions.",
        "Tests using a local form simulator.",
      ],
    },
    architectureBullets: {
      fr: [
        "Alertes IMAP / liens → lecture de fiche → score → préparation → suivi SQLite.",
        "Session navigateur dédiée ; arrêt face aux CAPTCHA, aux refus et aux ATS externes.",
        "La confirmation visible détermine le statut d’envoi, pas le seul clic.",
      ],
      en: [
        "IMAP alerts / links → offer parsing → ranking → preparation → SQLite tracking.",
        "Dedicated browser session; stops at CAPTCHAs, refusals and external ATS redirects.",
        "Submission status depends on visible confirmation, not just a click.",
      ],
    },
    roleBullets: {
      fr: [
        "Conception du cycle quotidien et de son stockage.",
        "Développement du classement, des rapports HTML et des tests de formulaires.",
      ],
      en: [
        "Designed the daily cycle and persistence.",
        "Developed ranking, HTML reports and form tests.",
      ],
    },
    learnedBullets: {
      fr: [
        "Les états intermédiaires évitent les doubles candidatures après une interruption.",
        "Une localisation ambiguë doit être signalée, pas transformée en distance supposée.",
      ],
      en: [
        "Intermediate states prevent duplicate applications after an interruption.",
        "An ambiguous location should be flagged, not converted to a guessed distance.",
      ],
    },
  },
  {
    slug: "sites-commerces",
    title: {
      fr: "I&K — prospection de commerces",
      en: "I&K — local business prospecting",
    },
    description: {
      fr: "Outil Python de qualification de commerces locaux pour une offre de sites vitrine. Il rassemble des pistes issues d’annuaires et d’OpenStreetMap, conserve leur source et suit les contacts, réponses et relances.",
      en: "Python tool qualifying local businesses for a showcase website service. It gathers leads from directories and OpenStreetMap, records their sources and tracks contacts, replies and follow-ups.",
    },
    techStack: ["Python", "OpenStreetMap", "JSON", "SMTP", "HTML"],
    highlights: {
      fr: [
        "Recherche locale et conservation de la provenance de chaque piste.",
        "Carnet de contacts persistant : statuts, envois et demandes d’arrêt.",
        "Préparation des files, qualification des pistes et rapports.",
        "Cadence d’envoi limitée et relances espacées, avec mode de simulation.",
      ],
      en: [
        "Local search and recorded provenance for every lead.",
        "Persistent contact book tracking statuses, sends and opt-outs.",
        "Queue preparation, lead qualification and reports.",
        "Limited sending cadence and spaced follow-ups, with dry-run mode.",
      ],
    },
    architectureBullets: {
      fr: [
        "Recherche → qualification → carnet JSON → préparation → suivi des réponses.",
        "Modules distincts pour la politique de contact, les offres, les métriques et les rapports.",
      ],
      en: [
        "Discovery → qualification → JSON contact book → preparation → reply tracking.",
        "Separate modules for contact policy, offers, metrics and reporting.",
      ],
    },
    roleBullets: {
      fr: [
        "Développement du cycle de prospection et des modules de qualification.",
        "Gestion de l’état persistant et de la reprise des traitements.",
      ],
      en: [
        "Developed the prospecting cycle and qualification modules.",
        "Managed persistent state and processing recovery.",
      ],
    },
    learnedBullets: {
      fr: [
        "Conserver une source fiable permet de personnaliser un message sans inventer de contexte.",
        "La qualité du carnet et la gestion des arrêts comptent autant que la découverte de nouvelles pistes.",
      ],
      en: [
        "Keeping reliable sources allows personalizing messages without inventing context.",
        "Contact data quality and opt-out handling matter as much as finding new leads.",
      ],
    },
  },
  {
    slug: "serveur-bots-fedora",
    title: { fr: "Serveur de bots Fedora", en: "Fedora bot server" },
    description: {
      fr: "Environnement Linux pour héberger les automatisations et basculer entre un usage serveur et un usage quotidien. Une interface en ligne de commande s’appuie sur systemd utilisateur pour gérer les processus.",
      en: "Linux environment hosting automations and switching between server and everyday use. A command-line interface uses user-level systemd to manage processes.",
    },
    techStack: ["Fedora", "Bash", "systemd", "SSH", "Docker"],
    highlights: {
      fr: [
        "Commandes bot-ctl pour ajouter, démarrer, arrêter et consulter les journaux.",
        "Services systemd utilisateur et redémarrage après incident.",
        "Bascule serveur / école pour lancer ou arrêter les bots.",
        "Gabarits pour bots Python, Node.js et Docker.",
      ],
      en: [
        "bot-ctl commands to add, start, stop and inspect logs.",
        "User-level systemd services and restart on failure.",
        "Server / school switch to start or stop bots.",
        "Templates for Python, Node.js and Docker bots.",
      ],
    },
    architectureBullets: {
      fr: [
        "Une commande de contrôle génère et pilote des unités systemd utilisateur.",
        "Accès d’administration par SSH ; séparation du cycle de vie et du code des bots.",
      ],
      en: [
        "A control command generates and manages user-level systemd units.",
        "SSH administration; process lifecycle is separated from bot code.",
      ],
    },
    roleBullets: {
      fr: [
        "Configuration de l’environnement Fedora et des commandes d’exploitation.",
        "Organisation des services et de leurs gabarits.",
      ],
      en: [
        "Configured the Fedora environment and operations commands.",
        "Organized services and templates.",
      ],
    },
    learnedBullets: {
      fr: [
        "Un bot doit pouvoir redémarrer, être observé et être arrêté proprement.",
        "La gestion des processus appartient au système de services plutôt qu’à une boucle artisanale.",
      ],
      en: [
        "A bot needs to restart, be observable and stop cleanly.",
        "Process management belongs in a service manager rather than a custom loop.",
      ],
    },
  },
];
