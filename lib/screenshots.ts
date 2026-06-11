export const screenshots = {
  dashboard: {
    src: "/screenshots/Screenshot_20260611_173306_Chrome.jpg",
    alt: "Tableau de bord MemFlow — vue d'ensemble des collections",
    width: 1320,
    height: 2112,
  },
  collectionDetail: {
    src: "/screenshots/Screenshot_20260611_173315_Chrome.jpg",
    alt: "Détail d'une collection — Biologie, cartes et progression",
    width: 1320,
    height: 2112,
  },
  qcmCorrect: {
    src: "/screenshots/Screenshot_20260611_173325_Chrome.jpg",
    alt: "Mode QCM — réponse correcte sur une carte ADN",
    width: 1320,
    height: 2112,
  },
  qcmWrong: {
    src: "/screenshots/Screenshot_20260611_173335_Chrome.jpg",
    alt: "Mode QCM — mauvaise réponse avec correction, carte sur les allèles",
    width: 1320,
    height: 2112,
  },
  vraiFaux: {
    src: "/screenshots/Screenshot_20260611_173403_Chrome.jpg",
    alt: "Mode Vrai / Faux — question de biologie",
    width: 1320,
    height: 2112,
  },
  saisieLibreBigO: {
    src: "/screenshots/Screenshot_20260611_173548_Chrome.jpg",
    alt: "Mode saisie libre — question sur la notation Big O",
    width: 1320,
    height: 2112,
  },
  saisieLibreQueue: {
    src: "/screenshots/Screenshot_20260611_173619_Chrome.jpg",
    alt: "Mode saisie libre — question sur la structure de file (Queue)",
    width: 1320,
    height: 2112,
  },
  flashcardReveal: {
    src: "/screenshots/Screenshot_20260611_173624_Chrome.jpg",
    alt: "Flashcard révélée — table de hachage, recto verso",
    width: 1320,
    height: 2112,
  },
  texteATrous: {
    src: "/screenshots/Screenshot_20260611_173710_Chrome.jpg",
    alt: "Mode texte à trous avec banque de mots à glisser-déposer",
    width: 1320,
    height: 2112,
  },
  statistiques: {
    src: "/screenshots/Screenshot_20260611_173738_Chrome.jpg",
    alt: "Statistiques de progression — graphiques et métriques de révision",
    width: 1320,
    height: 2112,
  },
  importCsvWorkflow: {
    src: "/screenshots/Screenshot_20260611_173742_Chrome.jpg",
    alt: "Import CSV — étapes du flux d'importation",
    width: 1320,
    height: 2112,
  },
  importCsvPromptAi: {
    src: "/screenshots/Screenshot_20260611_173748_Chrome.jpg",
    alt: "Import CSV — prompt de génération par intelligence artificielle",
    width: 1320,
    height: 2112,
  },
  importCsvPreview: {
    src: "/screenshots/Screenshot_20260611_173758_Chrome.jpg",
    alt: "Import CSV — prévisualisation des cartes avant importation",
    width: 1320,
    height: 2112,
  },
  profilThemeClair: {
    src: "/screenshots/Screenshot_20260611_173807_Chrome.jpg",
    alt: "Profil utilisateur — thème clair",
    width: 1320,
    height: 2112,
  },
  profilThemeSombre: {
    src: "/screenshots/Screenshot_20260611_173816_Chrome.jpg",
    alt: "Profil utilisateur — thème sombre",
    width: 1320,
    height: 2112,
  },
  profilThemeVivid: {
    src: "/screenshots/Screenshot_20260611_173820_Chrome.jpg",
    alt: "Profil utilisateur — thème vivid (couleurs vives)",
    width: 1320,
    height: 2112,
  },
} as const;

export type ScreenshotKey = keyof typeof screenshots;
