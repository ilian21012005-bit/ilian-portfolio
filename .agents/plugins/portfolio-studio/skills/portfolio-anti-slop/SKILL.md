---
name: portfolio-anti-slop
description: >-
  Audits and refines UI, CSS, copywriting, and component hygiene for this Next.js
  portfolio. Use when removing AI-slop effects or dead code, enforcing the Graphite
  Monochrome design system, or tightening recruiter-ready FR/EN copy.
---

# Portfolio Anti-Slop & Design Discipline

Appliquer cette procédure pour toute refonte visuelle, nettoyage technique ou réécriture éditoriale.

## 1. Discipline visuelle (Graphite Monochrome)

1. Respecter les tokens définis dans `app/globals.css` et `docs/DESIGN_SYSTEM.md` (`#111315`, `#1d2023`, `#262a2e`, `#33383d`, `#f4f4f1`, `#a6adb2`, `#e6e8e7`) et la police unique **IBM Plex Sans** (`--font-sans`).
2. Privilégier les composants serveur par défaut ; réserver `"use client"` aux interactions réelles (menu mobile, filtrage catalogue, formulaire contact).
3. Supprimer les composants décoratifs ou effets gadgets non justifiés (`BootIntro`, `GlitchText`, `DecryptText`, `KineticText`, `AuroraBg`, `RadarScan`, `NetworkMesh`, `TiltCard3d`, `Oscilloscope`, `InfiniteMarquee`) ainsi que les styles CSS/Tailwind morts associés.
4. Garantir des états de survol, `:focus-visible`, contrastes WCAG AA et respect strict de `prefers-reduced-motion`.

## 2. Copywriting crédible recruteur (SOC / Systèmes / Réseau)

1. Employer un ton sobre, factuel et professionnel (vouvoiement en français sur `/contact` et les messages système).
2. Distinguer explicitement lab, prototype, TP et mise en production ; nommer les technologies précises (ex. *segmentation inter-VLAN*, *filtrage par moindre privilège*) plutôt que des termes génériques ou galvaudés.
3. Rédiger en texte brut propre dans les listes de fiches projets (sans syntaxe Markdown non rendue comme des backticks littéraux).
4. Maintenir la parité de sens et de registre entre `messages/fr.json`, `messages/en.json` et les données `lib/`.

## 3. Critères de vérification

Exécuter dans l’ordre après modification :
1. `npm run audit:slop` (zéro régression sur les compteurs de code mort, couleurs hors palette, clichés et parité i18n).
2. `npm run check:palettes` (tous les ratios de contraste `OK`).
3. Revue visuelle sur desktop (`1440x900`) et mobile (`390x844`) en `/fr` et `/en`.
