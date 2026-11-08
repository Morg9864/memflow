import Image from "next/image";
import Link from "next/link";
import {
	ArrowDownRight,
	ArrowRight,
	BookOpen,
	Check,
	Clock3,
	FileSpreadsheet,
	Layers3,
	LineChart,
	RefreshCw,
} from "lucide-react";
import styles from "./site-content.module.css";

const appHref = "https://app.memflow.one";

function BrowserShot({
	src,
	alt,
	label,
	className = "",
}: {
	src: string;
	alt: string;
	label: string;
	className?: string;
}) {
	return (
		<figure className={`${styles.browser} ${className}`}>
			<div className={styles.browserTop}>
				<span className={styles.browserDot} aria-hidden="true" />
				<span className={styles.browserDot} aria-hidden="true" />
				<span className={styles.browserDot} aria-hidden="true" />
				<span className={styles.browserLabel}>{label}</span>
			</div>
			<div className={styles.browserImage}>
				<Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
			</div>
		</figure>
	);
}

export function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.heroCopy}>
				<p className={styles.kicker}>Memflow, l’espace d’étude sur le web</p>
				<h1>Apprends aujourd’hui. Retrouve-le demain.</h1>
				<p className={styles.heroLede}>
					Organise tes cours en cartes, entraîne-toi à les rappeler et reviens-y au
					bon moment. Memflow t’aide à faire tenir tes apprentissages dans la durée.
				</p>
				<div className={styles.actions}>
					<Link className={styles.primaryButton} href={appHref}>
						Ouvrir l’application <ArrowRight size={17} aria-hidden="true" />
					</Link>
					<a className={styles.textLink} href="#produit">
						Découvrir Memflow <ArrowDownRight size={16} aria-hidden="true" />
					</a>
				</div>
				<p className={styles.availability}>Application web disponible maintenant</p>
			</div>
			<div className={styles.heroVisual}>
				<BrowserShot
					src="/screenshots-web/home-data.png"
					alt="Tableau de bord web Memflow avec cartes à revoir, indicateurs et collections"
					label="Ton espace Memflow"
				/>
				<div className={styles.heroCaption}>
					<span className={styles.captionMark} aria-hidden="true"><Check size={15} /></span>
					<span>Ton espace de révision, directement dans le navigateur.</span>
				</div>
			</div>
		</section>
	);
}

export function ProductShowcase() {
	return (
		<section className={`${styles.section} ${styles.product}`} id="produit">
			<div className={styles.sectionIntro}>
				<p className={styles.kicker}>Tes cours, bien rangés</p>
				<h2>Une place pour chaque sujet. Un fil pour avancer.</h2>
				<p>
					Rassemble tes matières dans des collections, puis découpe-les en decks.
					Retrouve tes cartes, celles à revoir et ta progression dans le même espace web.
				</p>
			</div>
			<div className={styles.productGrid}>
				<BrowserShot
					src="/screenshots-web/home-data.png"
					alt="Collections de cartes organisées sur le tableau de bord Memflow"
					label="Collections et progression"
					className={styles.productShot}
				/>
				<div className={styles.productNotes}>
					<div className={styles.note}>
						<span className={styles.noteIcon}><Layers3 size={19} /></span>
						<div><h3>Collections et decks</h3><p>Organise tes cartes par matière, chapitre ou thème.</p></div>
					</div>
					<div className={styles.note}>
						<span className={styles.noteIcon}><RefreshCw size={19} /></span>
						<div><h3>Un rythme qui suit tes réponses</h3><p>Après chaque carte, indique si elle était difficile, correcte ou facile.</p></div>
					</div>
					<div className={styles.note}>
						<span className={styles.noteIcon}><BookOpen size={19} /></span>
						<div><h3>Un accès à tes révisions</h3><p>Retrouve ce qui t’attend aujourd’hui et ouvre une session depuis le web.</p></div>
					</div>
				</div>
			</div>
		</section>
	);
}

const studyModes = [
	["QCM", "Choisis une réponse parmi plusieurs propositions."],
	["Flashcards", "Révèle la réponse, puis évalue toi-même ta maîtrise."],
	["Flashcards inversées", "Repars de la réponse pour retrouver la question."],
	["Texte à trous", "Complète une phrase avec les mots attendus."],
	["Saisie libre", "Formule ta réponse avant de voir la correction."],
	["Vrai ou faux", "Évalue une proposition et vérifie ton raisonnement."],
];

export function StudyModes() {
	return (
		<section className={`${styles.section} ${styles.study}`} id="modes">
			<div className={styles.studyIntro}>
				<p className={styles.kicker}>Se tester pour mieux retenir</p>
				<h2>Six façons de faire revenir une idée.</h2>
				<p>
					Passe de la reconnaissance au rappel actif. Les modes disponibles dépendent
					des informations présentes dans tes cartes.
				</p>
				<BrowserShot
					src="/screenshots-web/study-qcm.png"
					alt="Question de biologie en mode QCM dans la session d’étude Memflow"
					label="Session d’étude · QCM"
					className={styles.studyShot}
				/>
			</div>
			<div className={styles.modeList}>
				{studyModes.map(([title, description], index) => (
					<div className={styles.modeRow} key={title}>
						<span className={styles.modeNumber}>{String(index + 1).padStart(2, "0")}</span>
						<div><h3>{title}</h3><p>{description}</p></div>
					</div>
				))}
			</div>
		</section>
	);
}

export function SpacedRepetition() {
	return (
		<section className={`${styles.section} ${styles.repetition}`}>
			<div className={styles.repetitionCopy}>
				<p className={styles.kicker}>Revenir au bon moment</p>
				<h2>Une révision après l’autre, sans repartir de zéro.</h2>
				<p>
					Memflow tient compte de tes évaluations pour planifier les prochaines
					révisions. Les cartes difficiles reviennent plus tôt; celles que tu maîtrises
					peuvent attendre davantage.
				</p>
			</div>
			<div className={styles.repetitionSteps} aria-label="Comment Memflow organise les révisions">
				<div><span>Tu réponds</span><strong>Une carte à la fois</strong></div>
				<div><span>Tu t’évalues</span><strong>Encore · Difficile · Correct · Facile</strong></div>
				<div><span>Tu y reviens</span><strong>Selon ta maîtrise</strong></div>
			</div>
		</section>
	);
}

export function ImportSection() {
	return (
		<section className={`${styles.section} ${styles.import}`} id="import">
			<div className={styles.importVisual}>
				<BrowserShot
					src="/screenshots-web/import-preview.png"
					alt="Aperçu d’un import CSV Memflow avec cartes détectées et ligne invalide signalée"
					label="Importer des cartes"
				/>
			</div>
			<div className={styles.importCopy}>
				<p className={styles.kicker}>Commencer avec tes contenus</p>
				<h2>Ton fichier devient un jeu de cartes que tu peux vérifier.</h2>
				<p>
					Importe un fichier CSV ou TXT. Memflow détecte le séparateur et l’en-tête,
					te montre les cartes reconnues et signale les lignes à corriger avant
					l’import.
				</p>
				<div className={styles.importFacts}>
					<p><FileSpreadsheet size={18} /> Import et export CSV</p>
					<p><Check size={18} /> Aperçu avant confirmation</p>
					<p><BookOpen size={18} /> Prompt à copier pour préparer un fichier avec ton outil IA</p>
				</div>
				<a className={styles.textLink} href={appHref}>
					Ouvrir l’import dans Memflow <ArrowRight size={16} />
				</a>
			</div>
		</section>
	);
}

export function StatsSection() {
	return (
		<section className={`${styles.section} ${styles.stats}`} id="stats">
			<div className={styles.statsCopy}>
				<p className={styles.kicker}>Voir le chemin parcouru</p>
				<h2>Des repères pour comprendre tes progrès.</h2>
				<p>
					Suis ton activité, les cartes vues, ta réussite et la progression de tes
					collections. Les statistiques reflètent tes propres sessions d’étude.
				</p>
				<div className={styles.statLabels}>
					<span><Clock3 size={16} /> Jours d’étude</span>
					<span><BookOpen size={16} /> Cartes vues</span>
					<span><LineChart size={16} /> Réussite et progression</span>
				</div>
			</div>
			<BrowserShot
				src="/screenshots-web/stats.png"
				alt="Statistiques Memflow montrant activité, taux de réussite et progression par niveau"
				label="Statistiques"
				className={styles.statsShot}
			/>
		</section>
	);
}

export function UseCases() {
	return (
		<section className={`${styles.section} ${styles.subjects}`}>
			<div>
				<p className={styles.kicker}>Pour les sujets que tu veux garder en tête</p>
				<h2>Une matière, une langue ou une nouvelle compétence.</h2>
			</div>
			<p className={styles.subjectCopy}>
				Crée tes collections selon ta façon d’apprendre : biologie, histoire,
					informatique, vocabulaire, concours ou projets personnels.
			</p>
		</section>
	);
}

export function FinalCta() {
	return (
		<section className={`${styles.section} ${styles.access}`} id="acces">
			<div className={styles.accessIntro}>
				<p className={styles.kicker}>Entre dans Memflow</p>
				<h2>Tu peux ouvrir ton espace web dès maintenant.</h2>
				<p>Utilise ton compte ou explore avec le compte public de test.</p>
				<Link className={styles.primaryButton} href={appHref}>
					Ouvrir l’application <ArrowRight size={17} aria-hidden="true" />
				</Link>
			</div>
			<div className={styles.testAccount}>
				<div className={styles.accountHeading}>
					<span className={styles.noteIcon}><BookOpen size={19} /></span>
					<div><h3>Compte public de test</h3><p>Les identifiants sont accessibles à tous.</p></div>
				</div>
				<dl>
					<div><dt>Adresse e-mail</dt><dd><code>test@memflow.one</code></dd></div>
					<div><dt>Mot de passe</dt><dd><code>TestMemflow2026</code></dd></div>
				</dl>
				<a className={styles.accountLink} href={`${appHref}/auth`}>Se connecter au compte de test <ArrowRight size={16} /></a>
			</div>
			<div className={styles.platformNote}>
				<span className={styles.noteIcon}><Layers3 size={19} /></span>
				<p><strong>La version mobile et tablette est prête.</strong> Sa disponibilité publique est prévue plus tard, courant été 2027. Memflow est accessible sur le web dès maintenant.</p>
			</div>
		</section>
	);
}
