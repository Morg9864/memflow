import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GAnalytics } from "@/components/analytics";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieBanner } from "@/components/cookie-banner";

const lora = Lora({
	subsets: ["latin"],
	variable: "--font-lora",
	display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plus-jakarta",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://memflow.one"),
	title: "MemFlow: Flashcards, révision espacée et apprentissage actif",
	description:
		"MemFlow aide les étudiants à créer, organiser et réviser leurs cartes avec la révision espacée, l'active recall, l'import CSV, plusieurs modes d'étude et des statistiques de progression.",
	openGraph: {
		title: "MemFlow: Flashcards, révision espacée et apprentissage actif",
		description:
			"MemFlow aide les étudiants à créer, organiser et réviser leurs cartes avec la révision espacée, l'active recall, l'import CSV, plusieurs modes d'étude et des statistiques de progression.",
		url: "https://memflow.one",
		siteName: "MemFlow",
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "MemFlow: Flashcards, révision espacée et apprentissage actif",
		description:
			"MemFlow aide les étudiants à créer, organiser et réviser leurs cartes avec la révision espacée, l'active recall, l'import CSV, plusieurs modes d'étude et des statistiques de progression.",
	},
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{
				url: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
		other: [
			{
				rel: "manifest",
				url: "/site.webmanifest",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="fr"
			className={`${lora.variable} ${plusJakartaSans.variable}`}
		>
			<body>
				{children}
				<GAnalytics />
				<CookieBanner />
			</body>
		</html>
	);
}
