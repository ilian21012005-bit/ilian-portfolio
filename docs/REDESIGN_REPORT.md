# Rapport de refonte — 1er novembre 2026

## État initial

Dépôt Next.js 16 / TypeScript / next-intl, travail non commité déjà présent sur `main` ; branche `codex/portfolio-refonte` créée sans effacer les modifications. Site initial : grands titres serif, accent doré, numérotation et espacements importants. Le catalogue, le formulaire, les données FR/EN et les captures authentiques existaient déjà. `npm run lint` utilisait une commande supprimée de Next 16 ; aucune CI n’était présente. GitHub connecté, CLI Vercel absente et aucun projet `.vercel` lié localement.

## Changements

Accueil réorganisé autour du nom, de la formation, de l’objectif de stage, d’une sélection courte, de l’expérience Data-Tricks et des compétences. La capture réelle du lab GNS3 est prioritaire ; les projets d’analyse, supervision, logiciel et automatisation restent accessibles. Palette ardoise et bleu discret, IBM Plex Sans, textes agrandis, fin des grands titres serif/dorés et de la numérotation dans le catalogue et À propos. Menu, filtres, contacts et toutes les fiches sont conservés. Aucun logo d’outil ajouté.

La page projets utilise un titre plus court pour éviter une coupure sur petit écran ; les filtres ont été agrandis. Page À propos, Contact et fiches existantes reçoivent les nouveaux styles, mais leur structure de contenu reste proche de la version précédente. SEO et URLs FR/EN conservés, image de partage et favicon recolorés. Passage à la convention Next `proxy.ts`, configuration ESLint 9 et CI GitHub Actions. Aucun secret ni service payant ajouté.

## Validation effectuée

- `npm run build` et TypeScript réussis.
- `npm run lint` réussi avec six avertissements préexistants dans le simulateur réseau non exposé par la navigation.
- `node scripts/check-site.mjs` : 46 pages FR/EN, canonicals, hreflang, h1, images, CV, redirections, 404 et validation du formulaire. Pas de message réellement envoyé.
- Deux passes navigateur : captures et contrôle des débordements de l’accueil à 320, 390, 768, 1024 et 1440 px ; autres pages clés à 320 px. Correction de la coupure du titre et de la taille des filtres ; filtre bots, état vide et fermeture Échap vérifiés.
- Lighthouse 12.8.2, Chrome headless, build local de production, profil mobile simulé : Performance 97, Accessibilité 100, Bonnes pratiques 100, SEO 92 ; LCP 2,6 s, CLS 0, TBT 10 ms. Une mesure de laboratoire, pas des données terrain ni une garantie de conformité WCAG. Le SEO local signale la canonique car elle pointe légitimement vers le domaine de production plutôt que localhost.
- Une erreur HMR Turbopack a été observée sur le serveur de développement utilisé en parallèle du build ; aucun constat analogue n’a été établi sur le build de production. La console de ce dernier n’a pas bénéficié d’un audit indépendant complet.

## Captures

Avant : `docs/qa/accueil-desktop.jpg`. Après : `docs/qa/redesign/accueil-1440.jpg`, `accueil-390.jpg`, `projets-320.jpg`. Résultat Lighthouse brut : `docs/qa/redesign/lighthouse-mobile.json`.

## Limites et suite

La délivrabilité réelle du formulaire dépend de l’activation et de la configuration de FormSubmit ou Formspree et reste à tester par le propriétaire. Build : avertissements `metadataBase` sur routes hors layout localisé et données Browserslist anciennes. Certaines règles CSS historiques restent présentes sous les styles de refonte ; une consolidation serait utile. Les fiches de plusieurs projets privés manquent de captures réelles : fournir une capture expurgée de Karu, un tableau de supervision sans informations sensibles, et éventuellement un exemple anonymisé de rapport de détection. Aucun chiffre d’usage réel ni score Lighthouse avant refonte n’est disponible.

La publication en production reste soumise à validation explicite. L’état Git, la CI distante et le déploiement Preview doivent être vérifiés après l’envoi de la branche.
