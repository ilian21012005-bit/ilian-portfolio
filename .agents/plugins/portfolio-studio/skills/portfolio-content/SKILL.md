---
name: portfolio-content
description: >-
  Guides adding or editing portfolio projects, case studies, bilingual FR/EN copy,
  and real screenshots while preserving URLs, SEO metadata, and factual accuracy.
---

# Portfolio Content & Case Studies

Appliquer cette procédure pour tout ajout, retrait ou mise à jour de projet, d’expérience ou de traduction.

## 1. Sources de vérité

- Projets principaux : `lib/projects.ts`
- Projets complémentaires : `lib/additional-projects.ts`
- Catégories et présentation : `lib/project-presentation.ts`
- Traductions UI : `messages/fr.json` et `messages/en.json`
- Métadonnées et URLs canoniques : `lib/site.ts` et `next.config.js`

## 2. Règles éditoriales et URLs

1. Préserver tous les slugs existants et les redirections 308 définies dans `next.config.js` lors d’un renommage.
2. Maintenir une parité stricte des clés entre `messages/fr.json` et `messages/en.json`, sans champs vides ni texte résiduel d’anciennes versions.
3. Utiliser uniquement des faits, dates, périmètres et résultats vérifiables (distinguer TP/lab, prototype et production ; exclure toute donnée confidentielle ou interne).
4. Associer uniquement des captures réelles placées dans `public/project-images/` ou un schéma explicitement identifié comme tel.

## 3. Validation après édition

1. Exécuter `npm run audit:slop` pour vérifier la parité FR/EN et détecter tout cliché rédactionnel.
2. Exécuter `npm run verify` pour valider le typage, le lint et le build statique/dynamique.
3. Vérifier toutes les routes générées dans le sitemap via `scripts/check-site.mjs` (chaque page doit exposer `canonical`, `hreflang`, un unique `<h1>` et `og:image`).
