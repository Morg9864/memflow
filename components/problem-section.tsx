"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STICKY_NOTES: { quote: string; author: string; rotate: string; delay: number }[] = [
  {
    quote: "J'ai relu mon cours trois fois… mais impossible de m'en souvenir à l'examen.",
    author: "Lara C., M2 Droit",
    rotate: "-2deg",
    delay: 0,
  },
  {
    quote: "J'avais tout compris le soir. Trois jours après, c'était comme si je n'avais jamais révisé.",
    author: "Mohamed S., B2 Économie",
    rotate: "1.5deg",
    delay: 0.1,
  },
  {
    quote: "Je ne sais jamais quoi réviser en priorité. Je reprends tout depuis le début.",
    author: "Léa P., B3 Histoire",
    rotate: "-1deg",
    delay: 0.2,
  },
  {
    quote: "Je révise au hasard, dans le désordre, sans savoir si ça sert vraiment à quelque chose.",
    author: "Alex M., M1 Informatique",
    rotate: "2deg",
    delay: 0.3,
  },
];

export function ProblemSection() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dark ink panel */}
        <div
          className={cn(
            "bg-noise relative overflow-hidden rounded-3xl px-6 py-16 md:px-12 md:py-20",
          )}
          style={{ backgroundColor: "var(--color-ink)" }}
        >
          {/* Subtle warm radial on dark bg */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 100%, rgba(217,123,63,0.12) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-14">
            {/* Heading block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={stagger}
              className="flex flex-col gap-5 max-w-2xl"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: "var(--color-orange)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Le problème
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold leading-snug tracking-tight md:text-4xl lg:text-5xl"
                style={{
                  color: "var(--color-cream)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Tu passes des heures à réviser.{" "}
                <br className="hidden md:block" />
                <em
                  className="not-italic"
                  style={{
                    color: "var(--color-peach)",
                    fontStyle: "italic",
                  }}
                >
                  Ton cerveau, lui, efface.
                </em>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-base leading-relaxed md:text-lg"
                style={{
                  color: "rgba(250,246,239,0.65)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                La relecture passive crée une illusion de maîtrise. Ton cerveau reconnaît
                le texte, mais il ne l'a pas stocké. Sans effort de récupération actif,
                tout disparaît en 48 heures.
              </motion.p>
            </motion.div>

            {/* Sticky notes grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {STICKY_NOTES.map((note) => (
                <motion.div
                  key={note.quote}
                  variants={fadeUp}
                  whileHover={{
                    rotate: "0deg",
                    y: -4,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  style={{
                    rotate: note.rotate,
                    transformOrigin: "center center",
                    fontFamily: "var(--font-sans)",
                  }}
                  className={cn(
                    "group flex cursor-default flex-col gap-3 rounded-2xl p-5",
                    "border border-white/10 bg-white/5",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
                    "transition-shadow duration-200 hover:shadow-lg",
                  )}
                >
                  {/* Quote mark */}
                  <span
                    className="text-3xl leading-none"
                    style={{ color: "var(--color-orange)", opacity: 0.7 }}
                    aria-hidden
                  >
                    "
                  </span>
                  <p
                    className="flex-1 text-sm leading-relaxed"
                    style={{ color: "rgba(250,246,239,0.85)" }}
                  >
                    {note.quote}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "rgba(250,246,239,0.35)" }}
                  >
                    — {note.author}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Closing line */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              className="max-w-xl text-base font-semibold leading-relaxed md:text-lg"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                background: `linear-gradient(90deg, var(--color-orange) 0%, var(--color-peach) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Le problème n'est pas ta mémoire. C'est la méthode.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
