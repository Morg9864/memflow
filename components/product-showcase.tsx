"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { DeviceFrame } from "@/components/device-frame";
import { screenshots } from "@/lib/screenshots";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    key: "dashboard" as const,
    index: "01",
    title: "Ton tableau de bord, ton plan du jour",
    body: "D'un coup d'œil, retrouve toutes tes collections et sache exactement quelles cartes t'attendent. Chaque session commence avec une intention claire.",
  },
  {
    key: "collectionDetail" as const,
    index: "02",
    title: "Des collections qui structurent tout",
    body: "Regroupe tes cartes par matière, chapitre ou projet. La progression s'affiche en temps réel pour que tu mesures l'effort qui reste.",
  },
  {
    key: "flashcardReveal" as const,
    index: "03",
    title: "Révèle, évalue, avance",
    body: "Retourne la carte, juge toi-même ta maîtrise. L'algorithme adapte la prochaine révision à ta réponse pour ancrer durablement.",
  },
  {
    key: "qcmCorrect" as const,
    index: "04",
    title: "Des questions qui te testent vraiment",
    body: "Le QCM génère des distracteurs crédibles à partir de tes propres cartes. Chaque erreur est une leçon, pas une punition.",
  },
  {
    key: "statistiques" as const,
    index: "05",
    title: "Des progrès que tu peux voir",
    body: "Courbes de rétention, taux de réussite, jours de série — les chiffres racontent l'histoire de ta progression semaine après semaine.",
  },
  {
    key: "importCsvPreview" as const,
    index: "06",
    title: "De ton CSV à tes cartes",
    body: "Importe un fichier, laisse l'IA structurer le contenu, prévisualise chaque carte avant de confirmer. Zéro saisie manuelle.",
  },
];

const AUTO_MS = 4000;

export function ProductShowcase() {
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    setCycleKey((k) => k + 1);
  }, []);

  const jumpTo = useCallback((i: number) => {
    setActiveIndex(i);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused || shouldReduce) return;
    const t = setTimeout(advance, AUTO_MS);
    return () => clearTimeout(t);
  }, [cycleKey, paused, shouldReduce, advance]);

  const activeSlide = SLIDES[activeIndex];
  const activeScreenshot = screenshots[activeSlide.key];

  return (
    <section id="produit" className="py-24 bg-cream scroll-mt-20">
      {/* ── DESKTOP: phone left + accordion right ── */}
      <div className="hidden lg:block max-w-6xl mx-auto px-6">
        <div
          className="flex gap-16 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left: phone */}
          <div className="w-[300px] shrink-0">
            <div className="relative w-full" style={{ aspectRatio: "1320/1922" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.key}
                  initial={shouldReduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduce ? undefined : { opacity: 0, y: -12, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <DeviceFrame
                    src={activeScreenshot.src}
                    alt={activeScreenshot.alt}
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex-1 flex flex-col">
            {SLIDES.map((slide, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={slide.key}
                  className="border-b border-border-warm last:border-0"
                >
                  <button
                    onClick={() => jumpTo(i)}
                    className={cn(
                      "w-full text-left flex items-center gap-4 py-5 transition-opacity duration-300",
                      !isActive && "opacity-35 hover:opacity-60"
                    )}
                  >
                    <span
                      className="text-xs font-semibold tracking-widest uppercase shrink-0"
                      style={{
                        color: "var(--color-orange)",
                        fontFamily: "var(--font-sans)",
                        width: "2rem",
                      }}
                    >
                      {slide.index}
                    </span>
                    <span
                      className="text-xl font-bold leading-snug flex-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-ink)",
                      }}
                    >
                      {slide.title}
                    </span>

                    {/* Progress bar */}
                    {isActive && !shouldReduce && (
                      <div
                        className="w-16 h-[2px] rounded-full overflow-hidden shrink-0"
                        style={{ backgroundColor: "var(--color-border-warm)" }}
                      >
                        <motion.div
                          key={cycleKey}
                          className="h-full rounded-full"
                          style={{ backgroundColor: "var(--color-orange)" }}
                          initial={{ width: "0%" }}
                          animate={paused ? undefined : { width: "100%" }}
                          transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                        />
                      </div>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-base leading-relaxed pb-5 pl-10 max-w-md"
                          style={{ color: "var(--color-ink-soft)" }}
                        >
                          {slide.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE: horizontal snap-scroll carousel ── */}
      <div className="lg:hidden">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-6"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {SLIDES.map((slide) => {
            const shot = screenshots[slide.key];
            return (
              <div
                key={slide.key}
                className="snap-center shrink-0 w-[78vw] max-w-[300px] flex flex-col gap-4"
              >
                <div
                  className="relative w-full rounded-[2.5rem] overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-ink)",
                    padding: "3px",
                  }}
                >
                  <div
                    className="rounded-[2.3rem] overflow-hidden relative"
                    style={{ aspectRatio: "1320/1922" }}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="80vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </div>
                <div>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-1 block"
                    style={{ color: "var(--color-orange)" }}
                  >
                    {slide.index}
                  </span>
                  <h3
                    className="text-lg font-bold leading-snug mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-ink)",
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    {slide.body}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="shrink-0 w-1" />
        </div>
      </div>
    </section>
  );
}
