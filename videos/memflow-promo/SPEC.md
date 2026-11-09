# Memflow — film de présentation (SPEC)

GOAL:    En ~36 s, comprendre que Memflow range ses cours en cartes, fait s’entraîner activement (web et tablette) et planifie les révisions ; finir avec l’envie d’ouvrir app.memflow.one.
OUTPUT:  HyperFrames, 1920 × 1080, 30 fps, MP4 H.264.
TIME:    36.6 s × 30 = 1098 frames. Horloge = la voix (ElevenLabs, voix xgJyhAugJB6JKenNlaNw « Perle »), posée à 0.5 s ; mots horodatés dans audio/voiceover.words.json.
LOOK:    Fond crème #FAF6EF plein, sans texture. Encre #2B241D pour tout texte. Accent orange #D97B3F réservé à : le mot « revenant », l’anneau qui désigne un mode, « flow » du logotype, le bouton final. Pêche #F9E9DC pour la barre du navigateur.
         Titres Lora 600, 88 px (accroche) / 140 px (logotype), tracking −0.03 em. Texte secondaire Outfit 500, 28–40 px.
         Matériau : les vraies captures du produit (Chrome 2880×1800 et écran de la tablette 1320×2112), dans un cadre de navigateur clair et un boîtier de tablette sombre (#221D18, rayon 46 px, bordure 24 px).
         Ombres : 0 40 80 rgba(43,36,29,.16) + 0 8 20 rgba(43,36,29,.10). Pas de grain, pas de vignette.
OBJECTS: une fenêtre de navigateur (barre pêche, 3 pastilles, URL app.memflow.one) ; une tablette en portrait (Galaxy Tab, boîtier sombre) ; le pointeur réel enregistré dans Chrome ; des marques de toucher (disque encre 18 % + anneau blanc) aux instants exacts des vrais tapotements adb.
MOTION:  Caméra = un seul plateau (« one continuous take ») ; chaque déplacement 0.45–0.8 s en power2.inOut, les fouets 0.45 s en power3.inOut. Arrivées de texte expo.out 0.5 s. Sorties 40 % plus courtes. Anneau d’accent : déplacement 0.3 s power3.out.
SHOTS:
  0.0–2.8   Accroche : logo posé, « Un cours, ça se retient / en y revenant. » — chaque mot passe du gris (oublié) à l’encre au moment où la voix le dit. Le logo vole se poser à la place du logo de la barre latérale.
  2.8–7.5   Web : le navigateur se construit autour du logo ; défilement réel vers les collections (« par matière »), clic Biologie, clic Étudier.
  7.5–8.4   Recul large : la tablette entre à droite (« ou sur tablette »).
  8.4–12.7  Tablette : vraie session flashcard ; toucher « Révéler la réponse » (9.9 s), toucher « Correct » (12.45 s).
  12.7–16   Fouet vers le web : page de session, « La session suit le calendrier de révision » puis le panneau « Les cartes dues sont prioritaires » (« planifie… selon tes réponses »).
  16–19     Grille des modes web ; l’anneau suit QCM, Flashcard, Texte à trous sur les mots.
  19–22.2   Fouet vers la tablette : feuille « Mode de session », anneau sur Saisie libre puis QCM, toucher QCM, toucher « Le chloroplaste » → Bonne réponse.
  22.2–27.4 Web : clic Importer, Parcourir, aperçu des 5 cartes, survol de « Confirmer l’import » (jamais confirmé).
  27.4–29.6 Web : statistiques réelles, défilement vers les graphiques.
  29.6–31   Recul large sur les deux appareils, puis plongée dans le logo du navigateur.
  30.85–36.6 Carte de fin : logo + logotype Memflow, app.memflow.one, bouton « Ouvrir l’application ». Tenue ≥ 3.5 s.
BANNED:  vide sombre, lueurs, particules, dégradés violets/bleus, verre ; cartes en rangée de trois ; titre sur capture assombrie ; logo dans un coin ; texte qui bouge pendant qu’on le lit ; boucles de respiration ; rebond sur l’UI ; produit incliné en 3D ; gestes inventés (tout clic/toucher montré vient des enregistrements) ; identifiants du compte de test à l’écran ; bande ou bloc d’accent séparé.
QA:      0.2 (vignette non vide), 2.8 (raccord logo), 5.9 (clic Biologie lisible), 8.2 (deux appareils), 9.95 (réponse révélée), 12.5 (Correct), 14.0, 16.5, 17.3, 18.4 (anneau sur le bon mode), 19.5 (Saisie libre), 21.6 (Bonne réponse), 24.2 (aperçu), 26.4, 28.5, 30.2, 33.0, 36.5.
