# Portfolio — Ilian El Bouazzaoui Prieur

Portfolio développeur fullstack & étudiant Systèmes/Réseaux. Design **Dark Engineering** avec glassmorphism, grille parallax et animations Framer Motion.

## Stack technique

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
├── app/
│   ├── globals.css      # Variables CSS, texture noise, styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil (sections Hero → Footer)
├── components/
│   ├── Badge.tsx        # Badge pour tech stack
│   ├── BentoCard.tsx    # Carte style Bento
│   ├── HeroSection.tsx  # Hero avec grille parallax
│   ├── MagneticButton.tsx  # Bouton effet magnétique
│   ├── ProjectCard.tsx  # Carte projet
│   └── TimelineItem.tsx # Élément timeline parcours
└── public/              # Fichiers statiques (ajouter cv.pdf)
```

## Personnalisation

- **CV** : ajouter votre `cv.pdf` dans `public/` et le lien sera actif
- **Liens sociaux** : modifier les URLs GitHub/LinkedIn dans `app/page.tsx`
- **Email** : remplacer `contact@ilian.dev` par votre adresse

## Build production

```bash
npm run build
npm start
```
