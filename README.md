# Portfolio — Ilian El Bouazzaoui Prieur

Portfolio développeur fullstack & étudiant Systèmes/Réseaux. Design **Dark Engineering** avec glassmorphism, grille parallax et animations Framer Motion.

## Stack technique

- **Next.js 16** (App Router)
- **TypeScript**
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
├── app/                 # App Router (pages, layouts, SEO)
│   ├── layout.tsx       # Layout principal, metadata, skip link
│   ├── page.tsx         # Accueil (Hero, projets, pourquoi moi, liens)
│   ├── robots.ts        # robots.txt
│   ├── sitemap.ts       # sitemap.xml
│   ├── not-found.tsx    # Page 404
│   ├── a-propos/        # Parcours, Arsenal, Projets, Contact, etc.
│   └── simulateur/      # Démo réseau (lazy load)
├── components/          # Composants réutilisables
├── lib/                 # Données (projects.ts, skills.ts, contact.ts, whyMe.ts)
└── public/              # Statiques — ajouter cv.pdf pour le lien CV
```

## Personnalisation

- **CV** : déposer ton PDF dans `public/` (nom attendu : `CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf`, voir `public/README-CV.md`).
- **Variables d’environnement** : `.env.local` est fourni avec l’URL Vercel et les contact. Pour la production, ajoute les **mêmes variables** dans le dashboard Vercel (Settings → Environment Variables) pour que le site en ligne affiche les bons liens et le canonical.
- **Formulaire de contact (optionnel)** : crée un formulaire sur [Formspree](https://formspree.io), récupère l’ID, puis ajoute `NEXT_PUBLIC_FORMSPREE_ID=ton_id` dans `.env.local` et sur Vercel. Le bloc « SEND_MESSAGE » apparaîtra sur la page Contact.

## Build production

```bash
npm run build
npm start
```

---

## Checklist avant mise en ligne / stage

| Action | Statut |
|--------|--------|
| `.env.local` créé avec `NEXT_PUBLIC_SITE_URL` (Vercel) et contact | ✓ Fait |
| Ajouter les **mêmes variables** sur Vercel (Settings → Environment Variables) | À faire |
| Mettre ton CV en PDF dans `public/` → `CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf` | À faire |
| Vérifier le lien CV (Footer / Contact) après déploiement | À faire |
| Optionnel : Formspree → `NEXT_PUBLIC_FORMSPREE_ID` pour le formulaire Contact | Optionnel |
| Tests manuels : mobile, tous les liens (Repo, Demo, CV), simulateur | Recommandé |
