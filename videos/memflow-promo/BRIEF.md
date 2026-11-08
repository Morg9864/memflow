# Prompt pour Claude — vidéo de présentation Memflow

Tu travailles dans le dépôt du site Memflow. Réalise et rends une vidéo de présentation en français, d’environ **30 à 45 secondes**, qui montre clairement l’application **sur le web et sur tablette**.

## Objectif

Faire comprendre en quelques secondes que Memflow aide à organiser ses cours en cartes, à s’entraîner activement et à revoir les notions au bon moment. La vidéo doit donner envie d’ouvrir l’application à l’adresse **https://app.memflow.one**.

## Commence par examiner le projet

- Lis les `AGENTS.md` présents, le contenu de la landing page et les consignes ou compétences vidéo disponibles dans l’environnement. Respecte les choix déjà faits dans le dépôt.
- Repère les ressources existantes, en particulier `public/logo.png`, `public/screenshots-web/`, `public/screenshots/` et `public/launch-video.html`. Les captures web incluent `home-data.png`, `study-qcm.png`, `study.png`, `import-preview.png` et `stats.png`. Il existe aussi des captures tablette et des mockups de tablette dans `public/screenshots/`.
- La tablette est connectée à l’ordinateur. Détecte le moyen disponible pour la piloter ou capturer son écran, puis réalise une capture vidéo de vrais gestes dans l’application tablette. Utilise la tablette réelle dans la vidéo, en plus de la version web. Ne remplace pas cette partie par un mockup immobile ou par une simple image d’écran. Si l’accès à la tablette échoue, explique le blocage et utilise les captures tablette déjà présentes en animant leur cadrage.
- Inspecte l’ancienne vidéo pour comprendre ce qui existe déjà; ne la réutilise pas comme unique contenu ni ne l’écrase sans raison.

## Direction créative

Rendu soigné, vivant et chaleureux, fidèle au produit. Utilise les couleurs du site : crème `#FAF6EF`, encre `#2B241D`, orange `#D97B3F`, orange foncé `#C4652E` et pêche `#F9E9DC`. Les polices locales sont Outfit et Lora; le logo se trouve dans `public/logo.png`.

Fais du mouvement une partie essentielle du récit : anime les captures réelles avec des travellings, recadrages, zooms mesurés, défilements et transitions guidées par l’action. Montre aussi de vraies interactions enregistrées : déplacer le pointeur, ouvrir une collection, répondre à une carte, révéler la réponse, évaluer sa maîtrise et toucher l’écran de la tablette. Les accents graphiques peuvent souligner un élément précis, mais ne crée jamais de bande, rayure, encoche ou bloc d’accent nettement séparé. Évite les plans de captures fixes qui durent, les animations décoratives gratuites et les gestes fictifs qui feraient croire à une fonctionnalité inexistante. Préserve la lisibilité de l’interface pendant les mouvements.

Fais un film horizontal **16:9, 1920 × 1080**, avec montage rythmé mais calme, transitions nettes et musique discrète si disponible. Garde le logo et les textes importants dans les marges de sécurité. N’affiche aucune donnée personnelle ni les identifiants du compte de test visibles sur le site.

## Narration et voix

Génère la narration avec **ElevenLabs**, voix d’identifiant exact **`xgJyhAugJB6JKenNlaNw`**. La langue est le français. Ne substitue pas une autre voix si cet identifiant est inaccessible : signale le problème clairement et poursuis le montage avec une piste de narration temporaire seulement si nécessaire pour préparer un aperçu.

Proposition de texte, à ajuster légèrement pour le rythme sans ajouter de promesse produit :

> Un cours, ça se retient en y revenant. Avec Memflow, rassemble tes cartes par matière, puis lance une session sur le web ou sur tablette. Réponds, révèle la réponse et évalue ce que tu maîtrises. Memflow planifie tes prochaines révisions selon tes réponses. QCM, flashcards, texte à trous ou saisie libre : choisis ta façon de t’entraîner. Tu as déjà un fichier ? Importe-le, vérifie l’aperçu, puis commence. Tes cartes et ta progression au même endroit. Memflow, ton espace d’étude sur le web. Ouvre l’application et commence dès aujourd’hui.

## Déroulé suggéré — environ 38 secondes

1. **0–4 s — Accroche :** logo Memflow et phrase courte autour du fait de retrouver une idée au bon moment. Entrée animée du logo, sans écran titre prolongé.
2. **4–11 s — Version web :** capture réelle du tableau de bord. Mouvement de caméra dans le navigateur vers une collection, ses cartes et les éléments de progression.
3. **11–20 s — Étude web et tablette :** ouvrir une carte, répondre puis révéler la réponse. Transition motivée par le geste vers une vraie session sur la tablette; montrer l’écran tactile et le changement de format.
4. **20–28 s — Révision active :** montrer un QCM ou une flashcard, l’autoévaluation et le retour d’une carte. Utiliser un mouvement ou une transition pour visualiser le rythme de révision, sans inventer de données.
5. **28–34 s — Import et progrès :** mouvement court dans l’aperçu d’import CSV/TXT, puis recadrage animé sur les statistiques.
6. **34–38 s — Conclusion :** logo, phrase de clôture et adresse `app.memflow.one`. Fin propre, suffisamment tenue pour lire l’appel à l’action.

Adapte les durées à la narration et aux meilleures captures disponibles. Le web et la tablette doivent tous deux être immédiatement reconnaissables et avoir chacun un moment d’action à l’écran.

## Production et livraison

- Utilise le flux vidéo et les outils déjà disponibles dans l’environnement; si HyperFrames est installé ou recommandé par le projet, construis le montage dans ce flux afin que les scènes et mouvements restent modifiables.
- Enregistre les sources, le projet de montage, la narration et les exports dans un dossier dédié, par exemple `videos/memflow-promo/`. Ne modifie pas le contenu du site pour les besoins du film.
- Rends un MP4 H.264 final, en 16:9, avec voix et musique correctement mixées. Conserve aussi le script final, les références des captures, les fichiers de projet et un aperçu consultable.
- Vérifie le rendu à plusieurs moments, notamment les transitions web/tablette, la lisibilité des textes et la synchronisation entre gestes et narration. Corrige les défauts visibles avant de livrer.
- Termine en indiquant le chemin du MP4, la durée exacte, les éléments sources utilisés et tout blocage éventuel concernant la tablette ou ElevenLabs.

UTILISE BIEN HYPERFRAMES POUR LE MOTION, MOTION DESIGN, LES TRANSITIONS ET LA SYNCHRONISATION DE LA VOIX. NE FAIS PAS DE MONTAGE STATIQUE OU D’ANIMATION SANS LIEN AVEC L’ACTION RÉELLE.