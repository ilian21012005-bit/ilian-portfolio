# Vérifications de la refonte

Date : 1er novembre 2026.

- TypeScript : `npx tsc --noEmit`, réussi.
- Build de production : `npm run build`, réussi avec Next.js 16.2.0.
- Contrôle HTTP : `node scripts/check-site.mjs`, réussi sur **46 pages FR/EN**. Vérifie HTTP 200, une cible d’évitement, un h1, canonical, alternates FR/EN et image Open Graph.
- Autres contrôles HTTP : redirection Clip Buffer → Karu, pages inconnues en 404, PDF des CV, images de partage, capture Dreamshift et en-têtes de sécurité.
- Contact : JSON malformé, null, tableaux, types invalides, champs manquants, email invalide, message vide, corps trop long, origine différente et champ piège vérifiés sans transmission externe.
- Navigateur : filtre des trois bots, recherche sans résultat, réinitialisation, fermeture du menu mobile avec Échap et retour du focus au bouton.
- Responsive : accueil aux largeurs 320, 390, 768 et 1440 px ; contact anglais, à-propos et catalogue à 320 px. Un débordement du titre du catalogue a été corrigé puis revérifié : largeur du document égale à celle du viewport utilisable.
- Revue des visuels : schémas GNS3/Karu/analyse et véritable capture de développement Dreamshift.
- Console du navigateur : aucune erreur enregistrée lors de la revue finale.
- Contrastes calculés de la palette sur le fond principal : ivoire **15,56:1**, texte secondaire **7,70:1**, accent **9,23:1**. Cela ne constitue pas un audit exhaustif de tous les états.

## Captures

- `qa/accueil-desktop.jpg`
- `qa/selection-desktop.jpg`
- `qa/catalogue-mobile.jpg`

## Limites de vérification

Aucun vrai message n’a été envoyé : la délivrabilité de FormSubmit/Formspree n’est pas certifiée. Aucun chiffre Lighthouse ou Core Web Vitals terrain n’est annoncé. La conformité WCAG complète n’a pas été auditée avec des lecteurs d’écran.

Le build signale encore une base Browserslist ancienne, le comportement dynamique des images Edge et des avertissements metadataBase associés aux routes hors layout localisé. Les URL canoniques et images de partage des 46 pages du sitemap ont été vérifiées sur les réponses HTML réelles et utilisent le domaine de production.

Le résultat est enregistré dans le dépôt local. Il n’a pas été poussé ni déployé sur l’hébergement existant. Le serveur de vérification est arrêté après la revue ; `npm run dev` permet de relancer le site.
