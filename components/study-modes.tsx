"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  ListChecks,
  GalleryVerticalEnd,
  FlipHorizontal2,
  Keyboard,
  TextCursorInput,
  CheckCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/* ─── Mini mock components ─────────────────────────── */

function QCMMock({ reduced }: { reduced: boolean }) {
  const options = [
    { label: "Mitochondrie", correct: false },
    { label: "Noyau cellulaire", correct: true },
    { label: "Ribosome", correct: false },
  ];
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {options.map((opt) => (
        <motion.div
          key={opt.label}
          whileHover={reduced ? {} : { scale: 1.01 }}
          className={cn(
            "px-3 py-2 rounded-xl text-xs font-medium border transition-colors duration-200 cursor-pointer select-none",
            opt.correct
              ? "border-sage-deep bg-sage text-sage-deep"
              : "border-border-warm bg-card text-ink"
          )}
          style={{
            borderColor: opt.correct ? "var(--color-sage-deep)" : "var(--color-border-warm)",
            backgroundColor: opt.correct ? "var(--color-sage)" : "var(--color-card)",
            color: opt.correct ? "var(--color-sage-deep)" : "var(--color-ink)",
          }}
        >
          {opt.label}
        </motion.div>
      ))}
    </div>
  );
}

function FlashcardMock({ reduced, inverted }: { reduced: boolean; inverted?: boolean }) {
  const front = inverted ? "Structure clé-valeur O(1)" : "Table de hachage ?";
  const back = inverted ? "Table de hachage" : "Structure clé-valeur O(1)";

  return (
    <div className="w-full flex justify-center">
      {/* Perspective container — must NOT be the rotating element */}
      <div className="relative w-36 h-20" style={{ perspective: "600px" }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={reduced ? {} : { rotateY: 180 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl flex items-center justify-center text-xs font-semibold border text-center px-3"
            style={{
              backgroundColor: "var(--color-card)",
              color: "var(--color-ink)",
              backfaceVisibility: "hidden",
              borderColor: "var(--color-border-warm)",
            }}
          >
            {front}
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl flex items-center justify-center text-xs font-semibold border text-center px-3"
            style={{
              backgroundColor: "var(--color-sage)",
              color: "var(--color-sage-deep)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderColor: "var(--color-sage-deep)",
            }}
          >
            {back}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SaisieLibreMock({ reduced }: { reduced: boolean }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-xs text-ink-soft" style={{ color: "var(--color-ink-soft)" }}>
        Complexité de recherche dans un tableau trié ?
      </p>
      <div
        className="flex items-center gap-1 rounded-lg border px-3 py-2"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border-warm)" }}
      >
        <span className="text-xs font-mono" style={{ color: "var(--color-ink)" }}>
          Big O notation
        </span>
        <motion.span
          animate={reduced ? {} : { opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block w-0.5 h-3 rounded-full"
          style={{ backgroundColor: "var(--color-orange)" }}
        />
      </div>
    </div>
  );
}

function TexteATrousMock({ reduced }: { reduced: boolean }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink)" }}>
        La <motion.span
          className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border cursor-pointer mx-0.5"
          style={{
            backgroundColor: "var(--color-peach)",
            borderColor: "var(--color-orange)",
            color: "var(--color-orange-deep)",
          }}
          whileHover={reduced ? {} : {
            backgroundColor: "var(--color-sage)",
            borderColor: "var(--color-sage-deep)",
            color: "var(--color-sage-deep)",
          }}
          transition={{ duration: 0.2 }}
        >
          mitose
        </motion.span> est une division{" "}
        <motion.span
          className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border cursor-pointer mx-0.5"
          style={{
            backgroundColor: "var(--color-peach)",
            borderColor: "var(--color-orange)",
            color: "var(--color-orange-deep)",
          }}
          whileHover={reduced ? {} : {
            backgroundColor: "var(--color-sage)",
            borderColor: "var(--color-sage-deep)",
            color: "var(--color-sage-deep)",
          }}
          transition={{ duration: 0.2 }}
        >
          cellulaire
        </motion.span>.
      </p>
      <div className="flex gap-1.5 flex-wrap">
        {["mitose", "cellulaire"].map((w) => (
          <span
            key={w}
            className="text-xs rounded-md px-2 py-0.5 font-medium border"
            style={{
              backgroundColor: "var(--color-cream)",
              borderColor: "var(--color-border-warm)",
              color: "var(--color-ink-soft)",
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function VraiFauxMock({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex gap-3 justify-center w-full">
      {[
        { label: "Vrai", sage: true },
        { label: "Faux", sage: false },
      ].map(({ label, sage }) => (
        <motion.div
          key={label}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-center border cursor-pointer"
          style={{
            backgroundColor: sage ? "var(--color-sage)" : "var(--color-card)",
            borderColor: sage ? "var(--color-sage-deep)" : "var(--color-border-warm)",
            color: sage ? "var(--color-sage-deep)" : "var(--color-ink-soft)",
          }}
          whileHover={reduced ? {} : sage ? { scale: 1.04 } : { scale: 1.02 }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Card data ─────────────────────────────────────── */

const MODES = [
  {
    icon: ListChecks,
    label: "QCM",
    desc: "Teste ta mémoire avec des choix clairs et rapides.",
    mock: (r: boolean) => <QCMMock reduced={r} />,
  },
  {
    icon: GalleryVerticalEnd,
    label: "Flashcards",
    desc: "Révèle, évalue, avance.",
    mock: (r: boolean) => <FlashcardMock reduced={r} />,
  },
  {
    icon: FlipHorizontal2,
    label: "Flashcards inversées",
    desc: "Pars de la réponse, retrouve la question.",
    mock: (r: boolean) => <FlashcardMock reduced={r} inverted />,
  },
  {
    icon: Keyboard,
    label: "Saisie libre",
    desc: "Écris la réponse pour vérifier que tu maîtrises vraiment.",
    mock: (r: boolean) => <SaisieLibreMock reduced={r} />,
  },
  {
    icon: TextCursorInput,
    label: "Texte à trous",
    desc: "Complète les notions clés directement dans le contexte.",
    mock: (r: boolean) => <TexteATrousMock reduced={r} />,
  },
  {
    icon: CheckCheck,
    label: "Vrai / Faux",
    desc: "Tranche vite, ancre l'essentiel.",
    mock: (r: boolean) => <VraiFauxMock reduced={r} />,
  },
];

/* ─── Section ───────────────────────────────────────── */

export function StudyModes() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="modes" className="py-24 bg-cream scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow="Modes d'étude"
            title="Six façons d'interroger ta mémoire."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <FadeIn key={mode.label} delay={i * 0.07}>
                <motion.div
                  className="group flex flex-col gap-4 rounded-2xl border p-5 h-full cursor-default transition-shadow duration-200"
                  style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border-warm)",
                  }}
                  whileHover={
                    reduced
                      ? {}
                      : {
                          y: -4,
                          boxShadow:
                            "0 12px 32px -6px rgba(43,36,29,0.12), 0 0 0 1.5px var(--color-orange)",
                        }
                  }
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "var(--color-peach)" }}
                    >
                      <Icon size={16} style={{ color: "var(--color-orange-deep)" }} />
                    </div>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
                    >
                      {mode.label}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                    {mode.desc}
                  </p>

                  {/* Mini mock */}
                  <div
                    className="rounded-xl p-3 mt-auto"
                    style={{
                      backgroundColor: "var(--color-cream)",
                      minHeight: "7rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {mode.mock(reduced)}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
