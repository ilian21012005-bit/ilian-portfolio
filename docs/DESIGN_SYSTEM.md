# Design du portfolio

La direction choisie est Graphite Monochrome : fond `#111315`, surface `#1d2023`, survol `#262a2e`, bordure `#33383d`, texte `#f4f4f1`, texte secondaire `#a6adb2` et accent `#e6e8e7`. Les tokens sont définis dans `app/globals.css` et les styles propres à À propos dans `app/[locale]/a-propos/about.module.css`.

IBM Plex Sans est utilisé pour les titres et le texte. Les sections gardent des espacements adaptés à leur contenu. Les captures montrent les projets réels, sans filtre ; les liens et les boutons possèdent des états de survol et de focus visibles. Les animations respectent `prefers-reduced-motion`.

La capture GNS3 conserve son cadrage complet et renvoie à l’étude de cas. Vérifier sa lisibilité sur mobile, le contraste réel des contrôles et les pages FR/EN lors de chaque changement visuel. Exécuter `node scripts/check-palettes.mjs` pour les contrastes des principales combinaisons graphite ; cela ne remplace pas un audit visuel ni un audit WCAG complet.
