"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  FileCheck,
  Compass,
  Code2,
  Languages,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: "Étudiants à l'université",
    benefit: "Révise tes cours en profondeur et garde le cap avant les partiels.",
    bg: "var(--color-peach-soft)",
    iconColor: "var(--color-orange-deep)",
  },
  {
    icon: School,
    title: "Lycéens",
    benefit: "Mémorise le bac et les contrôles avec des sessions courtes chaque jour.",
    bg: "var(--color-sage)",
    iconColor: "var(--color-sage-deep)",
  },
  {
    icon: FileCheck,
    title: "Préparation d'examens",
    benefit: "Structure tes fiches de révision et progresse avec la répétition espacée.",
    bg: "var(--color-sky)",
    iconColor: "var(--color-sky-deep)",
  },
  {
    icon: Compass,
    title: "Auto-apprentissage",
    benefit: "Apprends à ton rythme, sans cours — seulement ta curiosité et tes decks.",
    bg: "var(--color-blush)",
    iconColor: "var(--color-blush-deep)",
  },
  {
    icon: Code2,
    title: "Développeurs",
    benefit: "Ancre les concepts techniques — algorithmes, API, syntaxe — dans la durée.",
    bg: "var(--color-peach-soft)",
    iconColor: "var(--color-orange-deep)",
  },
  {
    icon: Languages,
    title: "Langues & plus",
    benefit: "Vocabulaire, conjugaisons, expressions — la répétition espacée accélère tout.",
    bg: "var(--color-sage)",
    iconColor: "var(--color-sage-deep)",
  },
];

const SUBJECTS = [
  "Langues",
  "Sciences",
  "Droit",
  "Médecine",
  "Informatique",
  "Histoire",
  "Économie",
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-4" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        <FadeIn>
          <SectionHeading
            eyebrow="Pour qui ?"
            title="Conçu pour toutes les mémoires en formation."
            align="center"
          />
        </FadeIn>

        {/* Mosaic grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {AUDIENCES.map(({ icon: Icon, title, benefit, bg, iconColor }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl p-5 flex flex-col gap-3 border cursor-default"
              style={{
                background: bg,
                borderColor: "var(--color-border-warm)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-card)" }}
              >
                <Icon size={18} style={{ color: iconColor }} />
              </div>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--color-ink)" }}
              >
                {title}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {benefit}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Subject chips */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2">
            {SUBJECTS.map((subject) => (
              <span
                key={subject}
                className="px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  background: "var(--color-card)",
                  color: "var(--color-ink-soft)",
                  borderColor: "var(--color-border-warm)",
                }}
              >
                {subject}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
