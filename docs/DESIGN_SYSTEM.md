# Design du portfolio — Editorial Swiss Tech

La direction artistique retenue est **Editorial Swiss Tech** : une base éditoriale claire et chaleureuse ponctuée de plaques techniques carbone à fort contraste et d’un accent vermillon signal.

## Palette et contrastes

- **Surfaces papier** : fond `#f3f1ea`, surface élevée `#eae6dc`, survol `#e1ddd1`, carte `#faf8f3`, filet `#d4cfc3`, bordure de contrôle `#7a766c`.
- **Encres sur clair** : texte principal `#131311`, texte secondaire `#55534d`, secondaire soutenu `#3a3934`, accent vermillon `#b8320f` (survol `#99280b`).
- **Plaques techniques carbone** : fond `#131416`, surface `#1c1e21`, bordure `#2d3136`, texte `#f3f1ea`, secondaire `#a8a59d`, accent `#ff5a2e`.
- Tous les tokens sont définis dans `app/globals.css` et les styles propres à À propos dans `app/[locale]/a-propos/about.module.css`.

## Typographie & visuels

- Trio `next/font/google` : **Plus Jakarta Sans** (titres & UI), **Instrument Serif** (italique éditorial ponctuel), **IBM Plex Mono** (repères, métadonnées et indices tabulaires).
- Les captures réelles (`lab-gns3.png`, `dreamshift-bureau.jpg`) conservent leur cadrage authentique sur plaque carbone.
- Les projets phares sans capture disposent de schémas vectoriels SVG dans `components/ProjectDiagram.tsx`, explicitement légendés comme schémas d’architecture et fidèles aux faits de `lib/projects.ts`.
- Les transitions CSS pures respectent strictement `prefers-reduced-motion`.

## Contrôles

Exécuter `npm run check:palettes` et `node scripts/audit-slop.mjs --strict` lors de chaque changement visuel, puis vérifier les pages desktop et mobile en FR/EN.
