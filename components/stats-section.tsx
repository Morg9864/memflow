"use client";

import { useEffect, useRef } from "react";
import {
	motion,
	useReducedMotion,
	useInView,
	useMotionValue,
	useTransform,
	animate,
} from "framer-motion";
import { Flame, BookOpen, TrendingUp, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { DeviceFrame } from "@/components/device-frame";
import { screenshots } from "@/lib/screenshots";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// ── Counter card ──────────────────────────────────────────────────────────────

interface CounterCardProps {
	icon: React.ElementType;
	value: number;
	suffix?: string;
	label: string;
	bg: string;
	iconColor: string;
}

function CounterCard({
	icon: Icon,
	value,
	suffix = "",
	label,
	bg,
	iconColor,
}: CounterCardProps) {
	const shouldReduce = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10%" });
	const motionVal = useMotionValue(0);
	const rounded = useTransform(motionVal, v => Math.round(v));
	const displayVal = useTransform(rounded, v =>
		suffix === "%" ? `${v} %` : suffix === " j" ? `${v} j` : String(v),
	);

	useEffect(() => {
		if (shouldReduce || !inView) return;
		const controls = animate(motionVal, value, {
			duration: 1.4,
			ease: [0.22, 1, 0.36, 1],
		});
		return controls.stop;
	}, [inView, shouldReduce, motionVal, value]);

	return (
		<motion.div
			ref={ref}
			variants={fadeUp}
			className="rounded-2xl p-5 flex flex-col gap-3 border"
			style={{
				background: bg,
				borderColor: "var(--color-border-warm)",
			}}
		>
			<div
				className="w-9 h-9 rounded-xl flex items-center justify-center"
				style={{ background: "var(--color-card)" }}
			>
				<Icon size={17} style={{ color: iconColor }} />
			</div>
			<p
				className="text-3xl font-bold tracking-tight"
				style={{
					fontFamily: "var(--font-display)",
					color: "var(--color-ink)",
				}}
			>
				{shouldReduce ? (
					`${value}${suffix}`
				) : (
					<motion.span>{displayVal}</motion.span>
				)}
			</p>
			<p
				className="text-xs font-medium"
				style={{ color: "var(--color-ink-soft)" }}
			>
				{label}
			</p>
		</motion.div>
	);
}

// ── Bar chart ─────────────────────────────────────────────────────────────────

const BAR_HEIGHTS = [30, 55, 40, 70, 50, 35, 65, 45, 80, 60, 75, 55, 85, 100];

function ActivityChart() {
	const shouldReduce = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10%" });

	return (
		<div ref={ref} className="flex flex-col gap-3">
			<p
				className="text-xs font-semibold"
				style={{ color: "var(--color-ink-soft)" }}
			>
				Activité: 14 derniers jours
			</p>
			<div className="flex items-end gap-1.5 h-16">
				{BAR_HEIGHTS.map((h, i) => {
					const isLast = i === BAR_HEIGHTS.length - 1;
					return (
						<motion.div
							key={i}
							className="flex-1 rounded-t-sm"
							style={{
								background: isLast
									? "var(--color-orange)"
									: "var(--color-peach)",
								height: `${h}%`,
								transformOrigin: "bottom",
								scaleY: shouldReduce ? 1 : 0,
							}}
							animate={
								inView
									? { scaleY: 1 }
									: { scaleY: shouldReduce ? 1 : 0 }
							}
							transition={{
								duration: 0.5,
								delay: shouldReduce ? 0 : i * 0.04,
								ease: [0.22, 1, 0.36, 1],
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

// ── Progress row ──────────────────────────────────────────────────────────────

interface ProgressRowProps {
	label: string;
	pct: number;
	delay?: number;
}

function ProgressRow({ label, pct, delay = 0 }: ProgressRowProps) {
	const shouldReduce = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-10%" });

	return (
		<div ref={ref} className="flex flex-col gap-1.5">
			<div className="flex justify-between items-center">
				<span
					className="text-xs"
					style={{ color: "var(--color-ink-soft)" }}
				>
					{label}
				</span>
				<span
					className="text-xs font-semibold"
					style={{ color: "var(--color-orange)" }}
				>
					{pct} %
				</span>
			</div>
			<div
				className="h-1.5 rounded-full overflow-hidden"
				style={{ background: "var(--color-border-warm)" }}
			>
				<motion.div
					className="h-full rounded-full"
					style={{
						background: "var(--color-orange)",
						width: shouldReduce ? `${pct}%` : "0%",
					}}
					animate={
						inView
							? { width: `${pct}%` }
							: { width: shouldReduce ? `${pct}%` : "0%" }
					}
					transition={{
						duration: 0.9,
						delay: shouldReduce ? 0 : delay,
						ease: [0.22, 1, 0.36, 1],
					}}
				/>
			</div>
		</div>
	);
}

// ── Section ───────────────────────────────────────────────────────────────────

const STAT_CARDS: CounterCardProps[] = [
	{
		icon: Flame,
		value: 14,
		suffix: " j",
		label: "Jours de série",
		bg: "var(--color-peach-soft)",
		iconColor: "var(--color-orange-deep)",
	},
	{
		icon: BookOpen,
		value: 448,
		label: "Cartes vues",
		bg: "var(--color-card)",
		iconColor: "var(--color-sky-deep)",
	},
	{
		icon: TrendingUp,
		value: 83,
		suffix: "%",
		label: "Taux de réussite",
		bg: "var(--color-sage)",
		iconColor: "var(--color-sage-deep)",
	},
	{
		icon: Clock,
		value: 6,
		label: "À revoir aujourd'hui",
		bg: "var(--color-card)",
		iconColor: "var(--color-blush-deep)",
	},
];

export function StatsSection() {
	return (
		<section
			id="stats"
			className="py-24 px-4 scroll-mt-20"
			style={{ background: "var(--color-cream)" }}
		>
			<div className="max-w-6xl mx-auto flex flex-col gap-14">
				<FadeIn>
					<SectionHeading
						eyebrow="Statistiques"
						title="Mesure tes progrès sans te perdre dans les chiffres."
						align="center"
					/>
				</FadeIn>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					{/* Left column — stats + chart */}
					<div className="flex flex-col gap-6">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={viewportOnce}
							variants={stagger}
							className="grid grid-cols-2 gap-4"
						>
							{STAT_CARDS.map(card => (
								<CounterCard key={card.label} {...card} />
							))}
						</motion.div>

						<FadeIn delay={0.2}>
							<div
								className="rounded-2xl p-5 border flex flex-col gap-5"
								style={{
									background: "var(--color-card)",
									borderColor: "var(--color-border-warm)",
								}}
							>
								<ActivityChart />
								<div className="flex flex-col gap-3 pt-1">
									<ProgressRow
										label="Niv. 1: Basique"
										pct={72}
										delay={0.3}
									/>
									<ProgressRow
										label="Niv. 3: Actif"
										pct={48}
										delay={0.45}
									/>
								</div>
							</div>
						</FadeIn>
					</div>

					{/* Right column — real screenshot */}
					<FadeIn
						delay={0.15}
						className="flex justify-center lg:justify-end"
					>
						<DeviceFrame
							src={screenshots.statistiques.src}
							alt={screenshots.statistiques.alt}
							className="w-full max-w-[280px]"
						/>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}
