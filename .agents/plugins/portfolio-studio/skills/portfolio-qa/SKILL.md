---
name: portfolio-qa
description: >-
  Runs full pre-delivery verification for the portfolio: TypeScript, ESLint,
  palette contrast, anti-slop audit, Next.js build, HTTP route checks on port 3100,
  and live desktop/mobile browser QA in FR and EN.
---

# Portfolio QA & Pre-Delivery Verification

Exécuter cette séquence complète avant de déclarer une modification prête.

## 1. Chaîne déterministe locale

Exécuter :
```powershell
npm run verify
```
Cette commande enchaîne :
1. `npm run typecheck` (`next typegen && tsc --noEmit`)
2. `npm run lint` (`eslint .`)
3. `npm run check:palettes` (`node scripts/check-palettes.mjs`)
4. `npm run audit:slop` (`node scripts/audit-slop.mjs`)
5. `npm run build` (`next build`)

## 2. Contrôle HTTP sur le build (port 3100)

Sous Windows, démarrer le serveur, attendre que `/fr` réponde `200`, exécuter `npm run check:site` puis arrêter le serveur dans **la même commande** (`try / finally`) :

```powershell
$p = Start-Process -FilePath "npm.cmd" -ArgumentList "run","start","--","--port","3100" -PassThru -WindowStyle Hidden
try {
  for ($i = 0; $i -lt 30; $i++) {
    try {
      $r = Invoke-WebRequest -Uri "http://localhost:3100/fr" -UseBasicParsing -TimeoutSec 2
      if ($r.StatusCode -eq 200) { break }
    } catch { Start-Sleep -Seconds 1 }
  }
  node scripts/check-site.mjs
} finally {
  if ($p -and -not $p.HasExited) { Stop-Process -Id $p.Id -Force }
}
```

## 3. Revue navigateur live (`/browser`)

1. Vérifier `/fr` et `/en` (accueil, `/projets`, `/a-propos`, `/contact`, une fiche `/projets/[slug]`, et une route 404).
2. Tester deux viewports : desktop (`1440x900`) et mobile (`390x844`, menu hamburger, absence de débordement horizontal).
3. Contrôler navigation clavier (`Tab`, `:focus-visible`, `Escape` sur menu mobile), absence d’erreurs console/réseau et arrêt propre du serveur temporaire.

## 4. Rapport factuel

Indiquer précisément les commandes exécutées, leurs sorties réelles et toute vérification non réalisée ou bloquée par l’environnement.
