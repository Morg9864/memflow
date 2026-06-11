"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function DemoCta() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div
            className="relative rounded-3xl overflow-hidden bg-noise px-8 py-14 md:px-16 md:py-20 flex flex-col items-center text-center gap-8"
            style={{
              background:
                "linear-gradient(135deg, var(--color-peach) 0%, var(--color-cream) 60%, var(--color-peach-soft) 100%)",
            }}
          >
            {/* Soft orange glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(217,123,63,0.18) 0%, transparent 70%)",
              }}
              aria-hidden
            />

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-2xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              Explore MemFlow sans créer de compte.
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
              className="relative z-10 text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-ink-soft)" }}
            >
              La démo contient des collections, des decks, des cartes, des
              statistiques et tous les modes d&apos;étude, déjà préremplis. Elle se
              réinitialise à chaque visite.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } }}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              <motion.a
                href="https://demo.memflow.one"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold shadow-sm transition-opacity hover:opacity-90"
                style={{
                  background: "var(--color-orange)",
                  color: "#fff",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Lancer la démo
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.a>
              <p
                className="text-xs"
                style={{ color: "var(--color-ink-soft)" }}
              >
                Gratuit · Sans inscription · Dans ton navigateur
              </p>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
