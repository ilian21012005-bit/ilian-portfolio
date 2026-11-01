# Portfolio Ilian

Portfolio professionnel d’Ilian El Bouazzaoui Prieur : systèmes, réseaux, cybersécurité, logiciels et automatisation. Next.js 16, TypeScript, next-intl (français et anglais), Tailwind CSS.

## Démarrer

```sh
npm install
npm run dev
```

Ouvrir http://localhost:3000/fr. Pour la version de production :

```sh
npm run build
npm run start -- --port 3100
```

## Vérifier

```sh
npx tsc --noEmit
npm run build
# Sur un serveur de production lancé au port 3100 :
node scripts/check-site.mjs
```

Le contrôle HTTP parcourt les pages du sitemap, les variantes de langue, les métadonnées, les redirections, les fichiers publics et les rejets du formulaire. Il n’envoie aucun message. Autre adresse de test : variable `TEST_SITE_URL`.

## Contenu

- `lib/projects.ts` : catalogue historique.
- `lib/additional-projects.ts` : Karu, Dreamshift Bureau, COPY GLITCH! et automatisations.
- `lib/project-presentation.ts` : catégories, contextes et résumés bilingues.
- `app/[locale]/page.tsx` : sélection éditoriale de l’accueil.
- `lib/contact.ts` : coordonnées et CV.
- `lib/site.ts` : URL de production et alternates des langues.
- `docs/RECHERCHE-PORTFOLIO.md` : recherche sourcée, décisions et provenance du contenu.

Les bots sont présentés à partir de leurs sources inspectées en lecture seule ; aucun secret, contact prospect ou contenu de candidature n’est publié. Les schémas sont explicitement des schémas de principe. La capture Dreamshift provient du projet réel.

## Configuration

Voir `.env.example`. Définir `NEXT_PUBLIC_SITE_URL` sur le domaine final pour les URL canoniques, les images de partage et le sitemap.

CV : `public/CV-Ilian-Stage-SOC-Reseau.pdf` et `public/CV-Ilian-Internship-SOC-Network.pdf`.

Formulaire : définir `FORMSPREE_ID` côté serveur pour utiliser Formspree ; sinon FormSubmit relaie vers l’email public configuré. La réception réelle dépend de l’activation et de la configuration du prestataire. Le lien email reste toujours disponible.

L’ancien chemin `/fr/projets/clip-buffer` redirige vers Karu, et les anciennes pages de la v1 conservent leurs redirections. La v1 reste sur la branche `v1` et le tag `v1.0`.
