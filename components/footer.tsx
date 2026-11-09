import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

const productLinks = [
	{ label: "Produit", href: "#produit" },
	{ label: "Modes d’étude", href: "#modes" },
	{ label: "Importer des cartes", href: "#import" },
	{ label: "Statistiques", href: "#stats" },
];

const legalLinks = [
	{ label: "Confidentialité", href: "/politique-confidentialite" },
	{ label: "Conditions d’utilisation", href: "/conditions-utilisation" },
	{ label: "Mentions légales", href: "/mentions-legales" },
	{ label: "Cookies", href: "/politique-cookies" },
];

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerMain}>
				<div className={styles.brandBlock}>
					<Link href="/" className={styles.wordmark} aria-label="Memflow, accueil">
						<Image className={styles.logo} src="/logo.png" alt="" width={36} height={36} />
						<span><span>Mem</span><span>flow</span></span>
					</Link>
					<p>Des révisions plus régulières, directement sur le web.</p>
				</div>
				<div className={styles.linkColumn}>
					<h2>Memflow</h2>
					{productLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
					<a href="https://app.memflow.one">Ouvrir l’application</a>
				</div>
				<div className={styles.linkColumn}>
					<h2>Informations</h2>
					{legalLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
				</div>
			</div>
			<div className={styles.footerBottom}>
				<span>© 2026 Memflow</span>
				<span>Conçu pour apprendre un peu chaque jour.</span>
			</div>
		</footer>
	);
}
