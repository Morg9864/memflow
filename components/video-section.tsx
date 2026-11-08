"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { viewportOnce } from "@/lib/motion";

export function VideoSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 md:mb-14">
          <SectionHeading
            eyebrow="En vidéo"
            title="Voir avant de lire"
            lede="Moins de quarante secondes pour voir Memflow à l’œuvre, sur le web et sur tablette."
          />
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="relative">
            {/* Warm aura — bleeds generously outside the card */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                inset: "-10% -8%",
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(217,123,63,0.22) 0%, rgba(249,233,220,0.18) 45%, transparent 75%)",
                filter: "blur(48px)",
              }}
            />

            {/* Inset cream card */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.98 }}
              whileInView={shouldReduce ? {} : { opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl bg-cream focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange"
              style={{
                border: "1px solid var(--color-border-warm)",
                boxShadow:
                  "0 4px 6px -1px rgba(43,36,29,0.06), 0 20px 60px -12px rgba(43,36,29,0.14)",
              }}
            >
              <video
                className="block aspect-video w-full"
                src="/videos/memflow-presentation.mp4"
                poster="/videos/memflow-presentation-poster.jpg"
                controls
                playsInline
                preload="none"
                aria-label="Memflow — vidéo de présentation, sur le web et sur tablette"
              />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
