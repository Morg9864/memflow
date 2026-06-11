<p align="center">
  <img src="memflow.png" alt="MemFlow icon" width="88" />
</p>

<h1 align="center">MemFlow</h1>

<p align="center">
  Application Flutter de flashcards pour le web et le mobile.
  <br />
  Révision espacée, comptes Supabase, import/export CSV, statistiques et thèmes clair/sombre.
</p>

<p align="center">
  <a href="https://www.memflow.one">www.memflow.one</a>
</p>

<p align="center">
  <img src="design/C%20_%20Greeting%20_%20masonry.png" alt="Écran d'accueil MemFlow" width="320" />
</p>

<p align="center">
  <code>Flutter</code>
  <code>Riverpod</code>
  <code>go_router</code>
  <code>Supabase</code>
  <code>Drift</code>
</p>

## Aperçu

MemFlow organise les révisions en collections, decks et cartes. Chaque session adapte le prochain passage d'une carte avec un algorithme de révision espacée, puis fait évoluer le mode de test selon les données disponibles et les résultats précédents.

L'application actuelle utilise Supabase pour l'authentification, la persistance utilisateur et les flux de données. Le dossier `lib/data/local` contient encore une base Drift/SQLite, mais le repository actif passe par Supabase et le démarrage requiert `SUPABASE_URL` et `SUPABASE_ANON_KEY`.

## Points forts

- Authentification email/mot de passe avec inscription, connexion, réinitialisation et édition du profil.
- Collections, decks et cartes avec suppression, échéances de révision et decks désactivables.
- Révision espacée avec les résultats `Encore`, `Difficile`, `Correct` et `Facile`.
- Modes d'étude : QCM, flashcard, flashcard inversée, saisie libre, texte à trous et vrai/faux quand les données le permettent.
- Sélection manuelle du mode d'étude ou rotation automatique.
- Import CSV avec prévisualisation, validation des lignes et prompt IA intégré.
- Export CSV complet depuis le profil.
- Statistiques de progression, activité récente, objectif quotidien et limite de cartes par session.
- Thèmes système, clair et sombre.
- Pages légales, demande de suppression de compte et écran 404.

## Interface

<table>
  <tr>
    <td align="center">
      <img src="design/C%20_%20Greeting%20_%20masonry.png" alt="Accueil" width="210" /><br />
      <sub>Accueil</sub>
    </td>
    <td align="center">
      <img src="design/02%20_%20Collection%20detail.png" alt="Détail d'une collection" width="210" /><br />
      <sub>Collection & decks</sub>
    </td>
    <td align="center">
      <img src="design/QCM%20_%20choix%20unique.png" alt="Mode QCM" width="210" /><br />
      <sub>Mode QCM</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="design/Light%20_%20Study%20_back_.png" alt="Flashcard avec réponse révélée" width="210" /><br />
      <sub>Flashcard révélée</sub>
    </td>
    <td align="center">
      <img src="design/Texte%20_%20trous.png" alt="Mode texte à trous" width="210" /><br />
      <sub>Texte à trous</sub>
    </td>
    <td align="center">
      <img src="design/05%20_%20Statistics.png" alt="Écran de statistiques" width="210" /><br />
      <sub>Statistiques</sub>
    </td>
  </tr>
</table>

## Stack technique

- `Flutter` + `Dart`
- `flutter_riverpod` pour l'état et l'injection de dépendances
- `go_router` pour les routes protégées et les pages profondes
- `supabase_flutter` pour Auth, PostgREST et Realtime
- `csv` + `file_picker` pour l'import/export
- `shared_preferences` pour le thème, l'objectif quotidien et les réglages légers
- `Drift` + `SQLite` présents dans `lib/data/local` pour la couche locale

## Démarrage rapide

### Prérequis

- Flutter SDK stable compatible avec Dart `^3.11.4`
- Android Studio et/ou Xcode pour les cibles mobiles
- Un navigateur moderne pour la cible web
- Un projet Supabase avec Auth email activé

Vérifier l'environnement Flutter :

```bash
flutter doctor
```

Installer les dépendances :

```bash
flutter pub get
```

Préparer les variables d'environnement :

```bash
cp .env.example .env
```

Renseigner ensuite :

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

Lancer en web :

```bash
flutter run -d chrome --dart-define-from-file=.env
```

Lancer sur mobile :

```bash
flutter run --dart-define-from-file=.env
```

## Configuration Supabase

Les variables Supabase sont obligatoires au démarrage. Sans elles, `main.dart` lève une erreur avant `runApp`.

Étapes recommandées :

1. Créer un projet Supabase.
2. Activer l'authentification email/mot de passe.
3. Appliquer les migrations dans `supabase/migrations/`.
4. Renseigner `.env` avec l'URL du projet et la clé anon.
5. Ajouter les URL de redirection nécessaires dans Supabase pour le reset de mot de passe.

Avec la CLI Supabase :

```bash
supabase db push
```

Ou appliquer les fichiers SQL dans l'ordre depuis l'éditeur SQL Supabase :

```text
supabase/migrations/
```

Le modèle de sécurité repose sur `user_id`, `auth.uid()` et des politiques RLS par utilisateur. Le détail est documenté dans [supabase/README.md](supabase/README.md).

## Import et export CSV

L'écran `Import CSV` permet :

- d'importer un fichier `.csv` ou `.txt` ;
- de détecter les séparateurs `;`, `,` et tabulation ;
- de lire un fichier avec ou sans header ;
- de prévisualiser les cartes détectées et les lignes invalides ;
- de télécharger le template CSV ;
- de copier ou télécharger le prompt IA `prompt_csv_memflow_neutre.md`.

L'export CSV est disponible depuis l'écran `Profil`.

### Format recommandé

```text
collection;deck;question;correct_answer;wrong_answer_1;wrong_answer_2;wrong_answer_3;hint;explanation;level;difficulty;tags;source;cloze_text;accepted_answers;cloze_answers;cloze_word_bank
```

Colonnes obligatoires :

- `collection`
- `deck`
- `question`
- `correct_answer`
- `wrong_answer_1`, `wrong_answer_2`, `wrong_answer_3`
- `level` entre `1` et `4`

`difficulty` est recommandée et accepte `facile`, `moyen`, `avance` ou `avancé`. Si elle est vide, l'import utilise `facile`.

Rappels :

- `accepted_answers` active le mode `saisie libre`.
- `cloze_text`, `cloze_answers` et `cloze_word_bank` activent le mode `texte à trous`.
- `cloze_text` utilise des trous au format `{{réponse}}`.
- Les valeurs multiples utilisent `|`.

Exemple :

```text
React & Hooks;Hooks de base;Quel hook React retourne une valeur et une fonction de mise à jour ?;useState;useEffect;useMemo;useRef;-;useState retourne une valeur actuelle et une fonction pour la modifier.;1;facile;react|hooks;Cours React;React, le hook {{useState}} retourne une valeur actuelle et une fonction pour la {{modifier}}.;useState|use state;useState|modifier;useState|useEffect|afficher|modifier
```

## Structure du projet

```text
lib/
  app/        bootstrap, providers globaux, routeur, préférences
  data/       repositories Supabase et couche locale Drift
  domain/     modèles et services métier
  features/   auth, home, collections, study, import, stats, profile, legal
  theme/      thème Material 3 custom et contrôleur d'apparence
  widgets/    composants UI partagés
supabase/
  migrations/ schéma SQL, RLS et évolutions cloud
test/
  services/   tests métier
  features/   tests de contrôleurs et d'écrans
```

Quelques dossiers historiques existent encore sous `lib/` (`models`, `providers`, `repositories`, `screens`, `services`, `utils`). Le code principal est organisé autour de `app`, `data`, `domain` et `features`.

## Routes principales

- `/auth` : connexion et création de compte
- `/reset-password` : nouveau mot de passe
- `/` : accueil
- `/collection/:collectionId` : détail d'une collection
- `/collection/:collectionId/due-cards` : échéances d'une collection
- `/deck/:deckId/cards` : cartes d'un deck
- `/study` et `/study/:deckId` : session de révision
- `/session-summary` : résumé de session
- `/stats` : statistiques
- `/import` : import CSV
- `/profile` : profil, thème et export
- `/settings` : paramètres du compte et de révision
- `/legal/:doc` : documents légaux

## Génération Drift

Si le schéma Drift local est modifié, régénérer les fichiers générés :

```bash
dart run build_runner build --delete-conflicting-outputs
```

Mode watch :

```bash
dart run build_runner watch --delete-conflicting-outputs
```

## Tests et qualité

Lancer l'analyse statique :

```bash
flutter analyze
```

Lancer toute la suite de tests :

```bash
flutter test
```

Tests ciblés utiles :

```bash
flutter test test/services/spaced_repetition_service_test.dart
flutter test test/services/card_mode_service_test.dart
flutter test test/services/csv_import_service_test.dart
flutter test test/features/study/study_controller_test.dart
flutter test test/features/study/study_screen_test.dart
```

## Build et déploiement

Build web local :

```bash
flutter build web --dart-define-from-file=.env
```

Build Android debug :

```bash
flutter build apk --debug --dart-define-from-file=.env
```

Build iOS debug :

```bash
flutter build ios --debug --dart-define-from-file=.env
```

Le déploiement web utilise [vercel.json](vercel.json) et [build.sh](build.sh). Sur Vercel, définir `SUPABASE_URL` et `SUPABASE_ANON_KEY` dans les variables d'environnement du projet.

## Commandes utiles

```bash
flutter clean
flutter pub get
flutter analyze
flutter test
dart format lib test
```

## Licence

MIT License - voir [LICENSE.txt](LICENSE.txt).
