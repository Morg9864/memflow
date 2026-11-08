import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GAnalytics } from "@/components/analytics";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieBanner } from "@/components/cookie-banner";

const lora = localFont({
	src: [
		{ path: "../public/fonts/lora-regular.ttf", weight: "400", style: "normal" },
		{ path: "../public/fonts/lora-semibold.ttf", weight: "600", style: "normal" },
	],
	variable: "--font-lora",
	display: "swap",
});

const outfit = localFont({
	src: [
		{ path: "../public/fonts/outfit-regular.ttf", weight: "400", style: "normal" },
		{ path: "../public/fonts/outfit-medium.ttf", weight: "500", style: "normal" },
		{ path: "../public/fonts/outfit-semibold.ttf", weight: "600", style: "normal" },
	],
	variable: "--font-outfit",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://memflow.one"),
	title: "Memflow — Apprends aujourd’hui. Retrouve-le demain.",
	description:
		"Organise tes cours, entraîne-toi avec six modes d’étude et suis tes progrès avec Memflow, l’application web de flashcards et de révision espacée.",
	openGraph: {
		title: "Memflow — Apprends aujourd’hui. Retrouve-le demain.",
		description: "Organise tes cours, révise activement et suis tes progrès sur le web.",
		url: "https://memflow.one",
		siteName: "MemFlow",
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Memflow — Apprends aujourd’hui. Retrouve-le demain.",
		description: "Organise tes cours, révise activement et suis tes progrès sur le web.",
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
			className={`${lora.variable} ${outfit.variable}`}
		>
			<body>
				{children}
				<GAnalytics />
				<CookieBanner />
			</body>
		</html>
	);
}
