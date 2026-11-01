# Portfolio : repères pour les prochaines modifications

Next.js 16 App Router, TypeScript, next-intl (fr/en), Tailwind et CSS global. `npm ci`, `npm run dev`, `npx tsc --noEmit`, `npm run lint`, `npm run build`. Le contrôle HTTP `node scripts/check-site.mjs` nécessite un serveur local au port 3100.

Les projets sont dans `lib/projects.ts` et `lib/additional-projects.ts` ; leurs catégories dans `lib/project-presentation.ts`. Préserver les URLs et les variantes FR/EN. Utiliser les composants serveur par défaut et limiter les dépendances et scripts client.

Design : fond ardoise, accent bleu discret, IBM Plex Sans, tailles lisibles, structure simple et responsive. Ne pas multiplier les effets décoratifs ni les logos d’outils. Utiliser les vraies captures ou un schéma explicitement identifié.

Ne pas inventer d’expérience, de certification, de résultat, d’image de produit ou de disponibilité. Distinguer prototype et réalisation ; ne pas publier de données confidentielles. Respecter la réduction des animations, les labels, le clavier et le contraste.

Avant livraison : typecheck, lint, build, tests HTTP quand le serveur est disponible, revue navigateur desktop/mobile et FR/EN. Documenter les limitations et ne pas déclarer de mesure non effectuée.

Préserver les modifications existantes ; travailler sur une branche dédiée, jamais pousser directement sur main. Les previews Vercel sont préférables à la production. Toute publication en production nécessite l’accord explicite de l’utilisateur.
