# Memflow — film de présentation : notes de livraison

## Ce que contient le film (36,6 s, 1920×1080, 30 fps)

Un seul plateau crème : une fenêtre de navigateur (app.memflow.one) et la tablette en portrait, côte à côte. Une caméra voyage de l’une à l’autre au rythme de la narration. Toutes les images d’interface sont de vrais enregistrements :

- **Web** (`assets/web/film.mp4`, `statsfilm.mp4`) : Chrome réel à 2880×1800, compte public de test, piloté par `capture/record-web.mjs`. Les gestes ont été chorégraphiés sur la narration (`take film`). Le pointeur est le vrai pointeur, dessiné dans la page. **Toutes les écritures vers la base Memflow ont été interceptées** : le compte de test n’a pas été modifié par le web, et l’import n’a jamais été confirmé.
- **Tablette** (`assets/tablet/*.mp4`) : Galaxy Tab S10 Lite branchée en USB, application Memflow réelle, `adb screenrecord` et vrais tapotements `adb input tap` (`capture/record-tablet.sh`). Les marques de toucher apparaissent aux positions et aux instants exacts journalisés dans `capture/tablet/*.events.json` (décalage d’horloge mesuré : 0,66 s).
- **Voix** : ElevenLabs, voix `xgJyhAugJB6JKenNlaNw` (« Perle – Premium French Professional »), `eleven_multilingual_v2`. Texte : `audio/script.txt` ; mots horodatés : `audio/voiceover.words.json`.
- **Musique** : ElevenLabs Music (`audio/music-elevenlabs.py`, prompt dans `audio/music.json`).
- **Bruitages** : clic doux et souffle de la bibliothèque HyperFrames ; « Light Taps » de Luis0413 (CC0, freesound 716245) pour les touchers.

## Choix créatifs

- Accroche : chaque mot de « Un cours, ça se retient en y revenant » passe du gris à l’encre quand la voix le dit (l’idée revient en mémoire). Le logo s’envole pour se poser exactement sur le logo de la barre latérale de l’app, autour duquel le navigateur se construit.
- La liste « QCM, flashcards, texte à trous… » est montrée par un anneau orange qui suit les vraies tuiles de mode du web, puis « Saisie libre » sur la feuille de modes de la tablette (le web n’affiche pas ce mode pour cette collection).
- « Memflow planifie tes prochaines révisions » : on montre le texte réel de la page de session (« La session suit le calendrier de révision de Memflow », « Les cartes dues sont prioritaires »), sans données inventées. L’écran « Échéances » de la tablette n’a pas été utilisé : il affiche « Prochaine révision : now » (non traduit).
- Mention discrète « Version tablette : disponibilité publique prévue courant été 2027 » pendant la scène tablette, reprise du site, pour ne pas laisser croire que l’app tablette est publique aujourd’hui. Supprimable dans `compositions/stage.html` (`#st-note`).
- Le texte de la narration est celui du brief, avec une virgule ajoutée (« Tes cartes et ta progression, au même endroit »).

## Mesuré / vérifié

- `hyperframes check` : 0 erreur. Avertissements gardés volontairement : contraste des mots gris de l’accroche (effet voulu, frame 0 lisible), orange de marque sur « flow » (2,84:1, très grand texte), `nested_media_start_basis_ambiguous` (temps bien locaux à la scène).
- Planches aux instants QA du SPEC, raccords accroche→web et plongée→carte de fin, planche téléphone.
- Narration normalisée à −17 LUFS ; musique à volume 0,2 (≈ −12 dB sous la voix). **Le son a été mesuré, pas écouté.**

## Points faibles / à reprendre avec plus de temps

- Le chargement réel de la page de session web reste visible un instant dans le plan large (≈ 8,2 s).
- Les écrans de la tablette sont à ~0,7× de leur résolution native dans les plans serrés : nets, mais le texte d’interface tablette reste petit dans le plan large.
- Le compte de test a reçu quelques révisions depuis la tablette (impossible d’intercepter le réseau de l’app Android) : 2–3 cartes notées « Correct » en Biologie.
