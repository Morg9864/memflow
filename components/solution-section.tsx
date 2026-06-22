"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FolderOpen, Brain, Clock, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Step {
	number: string;
	icon: LucideIcon;
	title: string;
	body: string;
	iconBg: string;
	iconColor: string;
}

const STEPS: Step[] = [
	{
		number: "01",
		icon: FolderOpen,
		title: "Organise tes connaissances",
		body: "Crée des collections, divise-les en decks thématiques, et ajoute tes cartes recto/verso. Importe un CSV ou laisse l'IA générer tes cartes depuis tes notes.",
		iconBg: "var(--color-peach)",
		iconColor: "var(--color-orange-deep)",
	},
	{
		number: "02",
		icon: Brain,
		title: "Révise avec l'active recall",
		body: "Six modes d'étude: QCM, vrai/faux, saisie libre, texte à trous, flashcard, et flashcard inversée. Pour ancrer chaque concept par l'effort de récupération.",
		iconBg: "var(--color-blush)",
		iconColor: "var(--color-blush-deep)",
	},
	{
		number: "03",
		icon: Clock,
		title: "Reviens au bon moment",
		body: "L'algorithme de répétition espacée calcule la prochaine révision de chaque carte selon ta performance. Ni trop tôt, ni trop tard.",
		iconBg: "var(--color-sky)",
		iconColor: "var(--color-sky-deep)",
	},
	{
		number: "04",
		icon: TrendingUp,
		title: "Suis tes progrès",
		body: "Graphiques de rétention, taux de réussite par deck, séries quotidiennes: vois concrètement ton cerveau s'améliorer au fil des sessions.",
		iconBg: "var(--color-sage)",
		iconColor: "var(--color-sage-deep)",
	},
];

export function SolutionSection() {
	const shouldReduce = useReducedMotion();

	return (
		<section id="methode" className="bg-cream py-16 md:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section heading */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={stagger}
					className="mb-16"
				>
					<motion.div variants={fadeUp}>
						<SectionHeading
							eyebrow="La boucle MemFlow"
							title="Une méthode simple qui tourne en boucle."
							lede="Quatre étapes qui se répètent, jour après jour, jusqu'à ce que le savoir soit gravé durablement."
							align="center"
						/>
					</motion.div>
				</motion.div>

				{/* Steps */}
				<div className="relative">
					{/* ── Desktop: horizontal connector line ── */}
					<div
						aria-hidden
						className="absolute top-[1.375rem] left-0 right-0 hidden h-px lg:block"
						style={{ background: "var(--color-border-warm)" }}
					>
						{/* Animated fill */}
						<motion.div
							className="h-full origin-left"
							style={{
								background: "var(--color-orange)",
								opacity: 0.5,
							}}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={viewportOnce}
							transition={
								shouldReduce
									? { duration: 0.01 }
									: {
											duration: 1.2,
											delay: 0.2,
											ease: [0.22, 1, 0.36, 1],
										}
							}
						/>
					</div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={viewportOnce}
						variants={stagger}
						className="relative grid gap-8 md:gap-10 lg:grid-cols-4"
					>
						{STEPS.map((step, i) => {
							const Icon = step.icon;
							return (
								<motion.div
									key={step.number}
									variants={fadeUp}
									className={cn(
										"relative flex gap-5 lg:flex-col lg:gap-5",
										/* Mobile/tablet: vertical list with left connector */
										"lg:items-start",
									)}
								>
									{/* Mobile vertical connector */}
									{i < STEPS.length - 1 && (
										<div
											aria-hidden
											className="absolute left-[1.625rem] top-[3.5rem] bottom-[-2rem] w-px lg:hidden"
											style={{
												background:
													"var(--color-border-warm)",
											}}
										/>
									)}

									{/* Icon tile (also acts as connector node on desktop) */}
									<div className="relative z-10 shrink-0">
										<div
											className="flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
											style={{ background: step.iconBg }}
										>
											<Icon
												size={20}
												style={{
													color: step.iconColor,
												}}
												aria-hidden
											/>
										</div>
									</div>

									{/* Text */}
									<div className="flex flex-col gap-2 pt-0.5 lg:pt-0">
										<p
											className="text-xs font-bold tracking-widest uppercase"
											style={{
												color: "var(--color-orange)",
												fontFamily: "var(--font-sans)",
											}}
										>
											Étape {step.number}
										</p>
										<h3
											className="text-lg font-bold leading-snug text-ink md:text-xl"
											style={{
												fontFamily:
													"var(--font-display)",
											}}
										>
											{step.title}
										</h3>
										<p
											className="text-sm leading-relaxed text-ink-soft md:text-base"
											style={{
												fontFamily: "var(--font-sans)",
											}}
										>
											{step.body}
										</p>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>

				{/* Bottom CTA teaser */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={fadeUp}
					className="mt-16 flex justify-center"
				>
					<div
						className={cn(
							"inline-flex items-center gap-3 rounded-2xl border border-border-warm px-6 py-4",
							"bg-card/60 backdrop-blur-sm shadow-sm",
						)}
						style={{ fontFamily: "var(--font-sans)" }}
					>
						<span
							className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm"
							style={{
								background: "var(--color-peach)",
								color: "var(--color-orange)",
							}}
						>
							∞
						</span>
						<p className="text-sm text-ink-soft">
							La boucle se relance automatiquement.{" "}
							<strong className="font-semibold text-ink">
								Tes révisions s'adaptent à ton rythme.
							</strong>
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
