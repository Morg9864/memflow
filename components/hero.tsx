"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DeviceFrame } from "@/components/device-frame";
import { screenshots } from "@/lib/screenshots";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------- floating mini-card primitives ---------- */

interface FloatCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yRange?: number;
  duration?: number;
  style?: React.CSSProperties;
}

function FloatCard({ children, className, delay = 0, yRange = 8, duration = 3.5, style }: FloatCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduce
          ? {}
          : {
              y: [0, -yRange, 0],
              transition: {
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className={cn(
        "absolute rounded-2xl border px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-sm",
        "border-border-warm bg-card/90",
        className
      )}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */

export function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream pt-20 pb-16 md:pt-28 md:pb-24">
      {/* subtle radial peach glow in upper right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, var(--color-peach) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left column: copy + CTAs ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-start"
          >
            {/* Eyebrow pill */}
            <motion.div variants={fadeUp}>
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-warm bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink-soft shadow-sm backdrop-blur-sm"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Flashcards · Répétition espacée · Active recall
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight text-ink md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Retenir plus.{" "}
              <br className="hidden sm:block" />
              <em
                className="not-italic"
                style={{ color: "var(--color-orange)", fontStyle: "italic" }}
              >
                Réviser moins.
              </em>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              className="mb-8 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Transforme tes cours en sessions actives en quelques secondes. MemFlow
              programme chaque carte au bon moment, ni trop tôt, ni trop tard, pour
              ancrer tes connaissances durablement.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <a
                href="https://demo.memflow.one"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-6 py-3",
                  "bg-orange text-card font-semibold text-sm shadow-md",
                  "transition-all duration-200 hover:bg-orange-deep hover:shadow-lg",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                )}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Essayer la démo
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>

              <a
                href="https://app.memflow.one"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3",
                  "border border-border-warm bg-card/60 text-ink font-semibold text-sm",
                  "backdrop-blur-sm transition-all duration-200 hover:bg-peach hover:border-peach",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                )}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Ouvrir l'app
              </a>
            </motion.div>

            {/* Micro-label */}
            <motion.p
              variants={fadeUp}
              className="mt-3 text-xs text-ink-soft/70"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sans inscription · Données de démo préremplies
            </motion.p>
          </motion.div>

          {/* ── Right column: device frame + floating cards ── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex lg:justify-center"
          >
            {/* Peach glow behind device */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[3rem]"
              style={{
                background:
                  "radial-gradient(ellipse 85% 80% at 50% 55%, var(--color-peach) 0%, transparent 70%)",
                filter: "blur(32px)",
                transform: "scale(1.15)",
              }}
            />

            {/* Device frame */}
            <div
              className="relative z-10"
              style={{
                transform: "perspective(900px) rotateY(-6deg) rotateX(2deg)",
                width: "clamp(220px, 28vw, 320px)",
              }}
            >
              <DeviceFrame
                src={screenshots.dashboard.src}
                alt={screenshots.dashboard.alt}
                priority
                className="w-full shadow-2xl"
              />

              {/* Floating card: QCM ADN */}
              <FloatCard
                delay={0}
                duration={3.8}
                yRange={7}
                className="left-[-4.5rem] top-[14%] max-w-[10rem]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: "var(--color-sage)",
                      color: "var(--color-sage-deep)",
                    }}
                  >
                    ✓
                  </span>
                  <span className="font-semibold text-ink">ADN</span>
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: "var(--color-sage)",
                      color: "var(--color-sage-deep)",
                    }}
                  >
                    QCM
                  </span>
                </div>
              </FloatCard>

              {/* Floating card: rating strip */}
              <FloatCard
                delay={0.8}
                duration={4.2}
                yRange={9}
                className="right-[-3.5rem] top-[35%]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft/70">
                  Évaluer
                </p>
                <div className="flex gap-1">
                  {(
                    [
                      { label: "Encore", bg: "var(--color-blush)", color: "var(--color-blush-deep)" },
                      { label: "Difficile", bg: "var(--color-peach)", color: "var(--color-orange-deep)" },
                      { label: "Correct", bg: "var(--color-sage)", color: "var(--color-sage-deep)" },
                      { label: "Facile", bg: "var(--color-sky)", color: "var(--color-sky-deep)" },
                    ] as { label: string; bg: string; color: string }[]
                  ).map((c) => (
                    <span
                      key={c.label}
                      className="rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                      style={{ background: c.bg, color: c.color }}
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              </FloatCard>

              {/* Floating card: streak */}
              <FloatCard
                delay={0.4}
                duration={3.5}
                yRange={6}
                className="left-[-3rem] bottom-[25%]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="text-sm">🔥</span>{" "}
                <span className="font-bold text-ink">14 j</span>{" "}
                <span className="text-xs text-ink-soft">de série</span>
              </FloatCard>

              {/* Floating card: cards due today */}
              <FloatCard
                delay={1.2}
                duration={4.6}
                yRange={8}
                className="right-[-2.5rem] bottom-[12%]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <p className="text-xs text-ink-soft">Aujourd'hui</p>
                <p className="font-bold text-ink">
                  6 cartes{" "}
                  <span
                    className="font-normal"
                    style={{ color: "var(--color-orange)" }}
                  >
                    à revoir
                  </span>
                </p>
              </FloatCard>
            </div>
          </motion.div>

          {/* ── Mobile: screenshot below CTAs ── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:hidden"
          >
            <DeviceFrame
              src={screenshots.dashboard.src}
              alt={screenshots.dashboard.alt}
              priority
              className="w-full max-w-xs shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
