# Portfolio — recherche et décisions de refonte

Date : 1er novembre 2026. Objectif : présenter un profil BUT 3 systèmes, réseaux, cybersécurité et développement à un recruteur, tout en donnant accès aux projets personnels.

## 1. Contenu : des preuves plutôt que des adjectifs

La recherche NN/g sur les portfolios porte sur le recrutement UX, et non directement sur l’administration système. J’en transpose le principe de présentation : expliquer le contexte, le rôle personnel, le travail effectué et les décisions. Ce choix est une adaptation au profil d’Ilian, pas la promesse d’un résultat de recrutement.

Application : quatre projets sélectionnés sur l’accueil, catalogue complet filtrable, fiches avec points clés, contribution, architecture et enseignements. Aucun témoignage, nombre de clients, pourcentage d’expertise ou gain de performance inventé. Le statut « en cours » distingue les prototypes des réalisations terminées. Les démos sont des liens explicites, sans iframe imposée au visiteur.

Source : [NN/g — 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/).

## 2. Direction visuelle

Choix éditorial propre au projet : fond charbon légèrement olive, texte ivoire et accent sable, Newsreader pour les titres et IBM Plex Sans pour la lecture. Une grille, des filets et des espacements structurent le contenu. Pas de faux terminal, de défilement contrôlé, de curseur spécial ou d’animation d’introduction. Les diagrammes représentent des flux documentés ; la carte Dreamshift utilise une véritable capture du projet.

Ce parti pris esthétique n’est pas une règle universelle issue d’une étude. La lisibilité, les longueurs de ligne et la hiérarchie sont les contraintes qui l’encadrent.

Source : [web.dev — Typography](https://web.dev/learn/design/typography).

## 3. Navigation et parcours

Trois entrées principales : Projets, À propos, Contact. CV et changement de langue restent accessibles. L’accueil donne immédiatement le nom, les domaines techniques, la formation et la recherche de stage. Le catalogue contient une recherche insensible aux accents, cinq catégories, le nombre de résultats et un état vide réinitialisable. Le contact direct par email reste disponible en complément du formulaire.

Le menu mobile possède un nom accessible, un état ouvert/fermé, une association au panneau et une fermeture avec Échap. Les titres des projets sont de vrais liens ; les surfaces visuelles dupliquées sont retirées du parcours clavier.

## 4. Accessibilité

Cible de conception : critères pertinents WCAG 2.2 AA. Le W3C demande notamment un contraste de 4,5:1 pour le texte courant et de 3:1 pour le grand texte, avec exceptions définies par le standard. Les contrôles sont dimensionnés à 44 px lorsque possible, au-delà du minimum AA de 24 px sous conditions.

Application : lien d’évitement, un h1 par page, régions sémantiques, focus visible, labels associés aux champs, noms des boutons, résultat des filtres annoncé, retour d’envoi annoncé, alternative textuelle sur la capture informative et support de la préférence de réduction des mouvements. Les schémas décoratifs sont masqués aux lecteurs d’écran ; leur information essentielle est reprise dans le texte.

Ces dispositions et les contrôles locaux ne constituent pas un audit de conformité exhaustif : lecture avec lecteurs d’écran et tests utilisateurs restent distincts.

Sources : [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [contraste](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [notifications de formulaire](https://www.w3.org/WAI/tutorials/forms/notifications/), [préférence de mouvement](https://web.dev/articles/prefers-reduced-motion).

## 5. Performance

Les Core Web Vitals évaluent le chargement, la réactivité et la stabilité. Repères de bonne expérience : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, à évaluer au 75e percentile des visites réelles. Un build réussi ne mesure pas ces valeurs et un test local ne remplace pas les données terrain.

Application : pages principales rendues sur le serveur et pré-générées, polices servies par Next, schémas SVG et CSS légers, image de projet locale avec dimensions, sans vidéo de fond ni dépendance d’animation ajoutée. Le catalogue n’envoie au composant interactif que les champs nécessaires à son affichage et à sa recherche.

Source : [web.dev — Web Vitals](https://web.dev/articles/vitals).

## 6. Référencement et partage

Application : URL canonique propre à chaque page et langue, alternates FR/EN/x-default, sitemap comprenant toutes les fiches publiques dans les deux langues, descriptions localisées, métadonnées de partage et image Open Graph. L’ancien chemin Clip Buffer redirige vers Karu. Les anciennes routes historiques conservent leurs redirections.

L’URL de production est centralisée dans `lib/site.ts`, avec `NEXT_PUBLIC_SITE_URL` prioritaire. L’URL par défaut provient de la page d’accueil déclarée dans le dépôt GitHub public. Aucun classement Google n’est promis.

Sources : [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Next.js — generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

## 7. Formulaire, confidentialité et robustesse

Application : validation serveur des types, longueurs, email, JSON malformé et objets invalides ; rejet d’une origine différente ; champ piège ; délai maximal vers le prestataire ; erreur récupérable qui conserve le message. Le formulaire indique le service de transmission utilisé et propose toujours un mailto.

En-têtes : interdiction d’intégration en frame, nosniff, politique de référent et désactivation des permissions matérielles inutilisées. La CSP ajoutée couvre l’intégration, les objets et l’URL de base ; il ne s’agit pas d’une politique CSP complète à nonce. Aucun traceur publicitaire ni nouvel outil analytique ajouté.

Limites : la délivrabilité réelle dépend du prestataire et de l’activation de la boîte. Les vérifications de développement ne doivent pas envoyer de vrai message. Le formulaire n’est pas présenté comme résistant à tout spam distribué ; une limitation durable côté hébergeur peut être ajoutée en cas d’abus réel.

Source : [MDN — frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

## 8. Inventaire de contenu vérifié

Les projets déjà documentés dans le portfolio sont conservés. Nouveaux contenus issus de lectures du code et des README :

| Réalisation            | Éléments consultés                                         | Présentation retenue                                                                       |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Karu                   | Dépôt local, README, dépôt GitHub public                   | Remplace Clip Buffer ; replay NVENC, bibliothèque, OCR et distribution Windows             |
| Dreamshift Bureau      | README, organisation du dépôt et captures de développement | Jeu en cours ; architecture Luau et environnements OrbisCorp                               |
| COPY GLITCH!           | Matrice d’implémentation, conception, arborescence serveur | Prototype ; règles testables et service d’effets, sans prétendre la boucle complète livrée |
| Veille d’offres        | README distant, modules de sources et stockage SQLite      | Agrégation, filtrage, suivi, reprise des envois incertains                                 |
| Copilote HelloWork     | README distant et liste des modules/tests                  | Classement, dossiers, géocodage, suivi et formulaires directs compatibles                  |
| Sites commerces I&K    | README distant, modules de qualification et daemon         | Qualification de pistes, carnet persistant et suivi des contacts                           |
| Serveur de bots Fedora | README distant et source de bot-ctl                        | Exploitation systemd utilisateur, commandes et modèles de services                         |

Les trois dernières automatisations métier et l’infrastructure ont été inspectées par SSH, en lecture seule. Les fichiers de secrets, sessions navigateur, bases de contacts, mails et documents de candidature ne sont pas intégrés au site. Les bots n’ont pas été lancés pour cet inventaire. Aucune campagne, candidature ou relance n’a été envoyée.

Le dossier Training-soc décrit surtout un plan de travail ; il n’est pas transformé en SIEM déjà déployé. Le dossier deepseek-harness ne fournit pas ici de réalisation documentée : aucun projet n’a été inventé à partir de son seul nom.

## 9. Maintenance

Ajouter les données bilingues dans `lib/additional-projects.ts` ou `lib/projects.ts`, puis leur catégorie et leur contexte dans `lib/project-presentation.ts`. Les routes et le sitemap reprennent automatiquement le catalogue. Une liste de sélection courte dans l’accueil reste un choix éditorial indépendant.

Pour chaque mise à jour, distinguer : fonctionnalité implémentée, état du projet, résultat réellement mesuré, objectif et limitation. Conserver les dépôts privés sans lien fictif. Ne pas publier de capture de messagerie, de données de contacts ou de sessions.
