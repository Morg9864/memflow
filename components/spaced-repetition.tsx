"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Clock, Sparkles, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/* ─── Station data ──────────────────────────────────── */

const STATIONS = [
  { id: "encore", label: "Encore", interval: "10 min", color: "blush", deep: "blush-deep" },
  { id: "difficile", label: "Difficile", interval: "1 j", color: "peach", deep: "orange-deep" },
  { id: "correct", label: "Correct", interval: "4 j", color: "sage", deep: "sage-deep" },
  { id: "facile", label: "Facile", interval: "12 j", color: "sky", deep: "sky-deep" },
] as const;

type StationId = (typeof STATIONS)[number]["id"];

const STATION_COLORS: Record<StationId, { bg: string; text: string; border: string }> = {
  encore: {
    bg: "var(--color-blush)",
    text: "var(--color-blush-deep)",
    border: "var(--color-blush-deep)",
  },
  difficile: {
    bg: "var(--color-peach)",
    text: "var(--color-orange-deep)",
    border: "var(--color-orange-deep)",
  },
  correct: {
    bg: "var(--color-sage)",
    text: "var(--color-sage-deep)",
    border: "var(--color-sage-deep)",
  },
  facile: {
    bg: "var(--color-sky)",
    text: "var(--color-sky-deep)",
    border: "var(--color-sky-deep)",
  },
};

/* Visual gap weights per station (px) to convey growing intervals */
const GAP_WEIGHTS = [40, 72, 120];

/* ─── Animated timeline ─────────────────────────────── */

function Timeline({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, margin: "-20%" });
  const sequenceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced || !inView) return;

    let step = 0;
    const tick = () => {
      setActive(step % STATIONS.length);
      step++;
      sequenceRef.current = setTimeout(tick, step % STATIONS.length === 0 ? 600 : 900);
    };
    sequenceRef.current = setTimeout(tick, 400);

    return () => {
      if (sequenceRef.current) clearTimeout(sequenceRef.current);
    };
  }, [reduced, inView]);

  /* Static reduced-motion: all stations highlighted */
  if (reduced) {
    return (
      <div ref={containerRef} className="w-full">
        <StaticTimeline />
      </div>
    );
  }

  const colors = STATION_COLORS[STATIONS[active].id];
  const progress = active / (STATIONS.length - 1);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div className="w-full px-2 py-8">
        {/* Labels row — above the track */}
        <div className="flex justify-between mb-4 px-0">
          {STATIONS.map((station, i) => {
            const isActive = active === i;
            const isPast = i < active;
            const c = STATION_COLORS[station.id];
            return (
              <motion.span
                key={station.id}
                animate={{
                  color: isActive ? c.text : isPast ? c.text : "var(--color-ink-soft)",
                  opacity: isActive ? 1 : isPast ? 0.6 : 0.35,
                  scale: isActive ? 1.06 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-semibold whitespace-nowrap"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {station.label}
              </motion.span>
            );
          })}
        </div>

        {/* Track row */}
        <div className="relative h-1.5">
          {/* Base track */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "var(--color-border-warm)" }}
          />

          {/* Animated fill */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 rounded-full origin-left"
            animate={{
              width: `${progress * 100}%`,
              backgroundColor: colors.border,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Orb at leading edge */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-20"
            animate={{ left: `${progress * 100}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: "-50%" }}
          >
            <motion.div
              className="w-3.5 h-3.5 rounded-full shadow-sm"
              animate={{
                backgroundColor: colors.border,
                scale: [1, 1.25, 1],
              }}
              transition={{
                backgroundColor: { duration: 0.35 },
                scale: { repeat: Infinity, duration: 1.4, ease: "easeInOut" },
              }}
            />
          </motion.div>
        </div>

        {/* Interval labels row — below the track */}
        <div className="flex justify-between mt-4 px-0">
          {STATIONS.map((station, i) => {
            const isActive = active === i;
            const isPast = i < active;
            const c = STATION_COLORS[station.id];
            return (
              <motion.span
                key={station.id}
                animate={{
                  color: isActive ? c.text : isPast ? c.text : "var(--color-ink-soft)",
                  opacity: isActive ? 1 : isPast ? 0.5 : 0.3,
                }}
                transition={{ duration: 0.35 }}
                className="text-xs font-mono"
              >
                {station.interval}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Static version for reduced motion */
function StaticTimeline() {
  return (
    <div className="w-full px-2 py-8">
      <div className="flex justify-between mb-4">
        {STATIONS.map((station) => {
          const c = STATION_COLORS[station.id];
          return (
            <span key={station.id} className="text-xs font-semibold whitespace-nowrap" style={{ color: c.text }}>
              {station.label}
            </span>
          );
        })}
      </div>
      <div className="relative h-1.5">
        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "var(--color-border-warm)" }} />
        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "var(--color-sky-deep)", width: "100%" }} />
      </div>
      <div className="flex justify-between mt-4">
        {STATIONS.map((station) => {
          const c = STATION_COLORS[station.id];
          return (
            <span key={station.id} className="text-xs font-mono" style={{ color: c.text }}>
              {station.interval}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Benefits row ──────────────────────────────────── */

const BENEFITS = [
  {
    Icon: Clock,
    title: "Sache quoi réviser aujourd'hui",
    desc: "L'algorithme priorise automatiquement les cartes à fort risque d'oubli.",
  },
  {
    Icon: Sparkles,
    title: "Moins de répétitions inutiles",
    desc: "Tu ne revois que ce dont tu as besoin, au bon moment.",
  },
  {
    Icon: Zap,
    title: "Mémoire durable",
    desc: "Chaque session renforce les connexions pour un ancrage à long terme.",
  },
];

/* ─── Section ───────────────────────────────────────── */

export function SpacedRepetition() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="repetition-espacee"
      className="py-24 bg-noise"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Répétition espacée"
            title="Reviens juste avant d'oublier."
            lede="MemFlow re-présente chaque carte au moment où elle est sur le point de s'effacer, pas trop tôt, jamais trop tard."
          />
        </FadeIn>

        {/* Timeline card */}
        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-border-warm)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--color-orange)", fontFamily: "var(--font-sans)" }}
            >
              Parcours d'une carte
            </p>
            <Timeline reduced={reduced} />
            <p
              className="text-xs text-center mt-4"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Les intervalles s'allongent à mesure que la maîtrise s'installe.
            </p>
          </div>
        </FadeIn>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BENEFITS.map(({ Icon, title, desc }, i) => (
            <FadeIn key={title} delay={0.15 + i * 0.08}>
              <div
                className="flex flex-col gap-3 rounded-2xl border p-5"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border-warm)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-peach)" }}
                >
                  <Icon size={18} style={{ color: "var(--color-orange-deep)" }} />
                </div>
                <h4
                  className="font-semibold text-sm leading-snug"
                  style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
                >
                  {title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
