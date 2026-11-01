# Comparaison des palettes

Les trois variantes utilisent la même page À propos et les mêmes contenus. Le sélecteur de comparaison apparaît uniquement en développement et dans les déploiements Preview Vercel ; la version de production reste graphite par défaut. Les captures authentiques conservent leurs couleurs.

- **Graphite monochrome** : fond #111315, surface #1d2023, texte #f4f4f1, secondaire #a6adb2 et accent #e6e8e7. Contraste très neutre, priorité aux images et au texte. Option recommandée selon le brief.
- **Graphite et sauge** : fond #141716, surface #202522 et accent #becfc1. Teinte végétale discrète ; contraste un peu plus doux tout en gardant les textes lisibles.
- **Noir et pierre** : fond #171615, surface #252321 et accent #dcd3c8. Neutres plus chauds, sans accent saturé.

`node scripts/check-palettes.mjs` calcule les contrastes des combinaisons de texte/fond, texte/surface, bouton et bordure de champ. Minimums calculés : texte normal 7,20:1, bordure de contrôle 5,06:1 sur surface. Les séparateurs décoratifs restent volontairement plus discrets. Ces calculs ne remplacent pas un audit complet des états rendus.

L’image Open Graph et le favicon utilisent les couleurs graphite fixes, car ce sont des images générées en dehors du CSS. Les assets et captures des projets ne sont pas recolorés.

Limite de vérification : le navigateur automatisé local est désactivé dans les réglages Work. Les captures Playwright et les tests interactifs desktop/mobile n’ont donc pas été réalisés dans cette session. Le sélecteur de la Preview permet de comparer les variantes sur la page réelle.
