# Portfolio Ilian

Portfolio v2 : admin systèmes & réseaux, labs Windows / AD, analyse cyber (MITRE, Suricata) et supervision. Dark contraste fort, IBM Plex Sans + Newsreader.

La v1 (HUD / Dark Engineering) est gelée sur la branche `v1` et le tag `v1.0`.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (FR par défaut, EN)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) (locale FR).

## Personnalisation

- **CV** : PDF FR et EN dans `public/` (`CV-Ilian-Stage-SOC-Reseau.pdf`, `CV-Ilian-Internship-SOC-Network.pdf`).
- **Variables** : voir `.env.example`. Reproduire sur Vercel.
- **Formulaire** : `NEXT_PUBLIC_FORMSPREE_ID` (optionnel).
- **Lien v1** : `NEXT_PUBLIC_V1_URL` (sinon le footer pointe vers la branche GitHub `v1`).

## Build

```bash
npm run build
npm start
```
