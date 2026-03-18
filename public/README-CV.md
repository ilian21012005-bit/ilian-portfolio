# Fichier CV — obligatoire pour le lien « Télécharger CV »

Sans ce fichier, le bouton **Télécharger CV** mène vers une page 404.

1. Place **ton fichier PDF** de CV dans ce dossier (`public/`).
2. Nom du fichier **exact** : **`CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf`**  
   (même nom que dans `NEXT_PUBLIC_CONTACT_CV_URL`).
3. Commit + push pour que le site (Vercel) serve le PDF.

Si tu utilises un autre nom (ex. `mon-cv.pdf`), mets à jour `NEXT_PUBLIC_CONTACT_CV_URL` dans `.env.local` et sur Vercel (ex. `/mon-cv.pdf`).
