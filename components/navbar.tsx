"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import styles from "./navbar.module.css";

const navLinks = [
	{ label: "Produit", href: "#produit" },
	{ label: "Modes d’étude", href: "#modes" },
	{ label: "Import", href: "#import" },
	{ label: "Progression", href: "#stats" },
];

export function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className={styles.header}>
			<nav className={styles.nav} aria-label="Navigation principale">
				<Link className={styles.wordmark} href="/" aria-label="Memflow, accueil">
					<Image className={styles.logo} src="/logo.png" alt="" width={36} height={36} priority />
					<span>Mem</span><span className={styles.wordmarkAccent}>flow</span>
				</Link>
				<div className={styles.desktopLinks}>
					{navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
				</div>
				<a className={styles.appLink} href="https://app.memflow.one">
					Ouvrir l’application <ArrowRight size={15} aria-hidden="true" />
				</a>
				<button
					className={styles.menuButton}
					type="button"
					aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
					aria-expanded={menuOpen}
					aria-controls="mobile-navigation"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <X size={21} /> : <Menu size={21} />}
				</button>
			</nav>
			{menuOpen && (
				<div className={styles.mobileMenu} id="mobile-navigation">
					{navLinks.map((link) => (
						<a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
					))}
					<a className={styles.mobileAppLink} href="https://app.memflow.one" onClick={() => setMenuOpen(false)}>
						Ouvrir l’application <ArrowRight size={16} />
					</a>
				</div>
			)}
		</header>
	);
}
