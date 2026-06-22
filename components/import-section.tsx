"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileSpreadsheet,
  ScanSearch,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { DeviceFrame } from "@/components/device-frame";
import { screenshots } from "@/lib/screenshots";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CSV_ROWS = [
  "collection;deck;question;réponse",
  "Biologie;Cellules;Qu'est-ce que la mitose ?;Division cellulaire",
  "Biologie;Cellules;Rôle des mitochondries ?;Production d'énergie (ATP)",
  "Biologie;Génétique;Définir un allèle dominant;Allèle qui s'exprime toujours",
];

const PREVIEW_CARDS = [
  { q: "Qu'est-ce que la mitose ?", r: "Division cellulaire" },
  { q: "Rôle des mitochondries ?", r: "Production d'énergie (ATP)" },
  { q: "Définir un allèle dominant", r: "Allèle qui s'exprime toujours" },
];

const STEPS = [
  {
    icon: FileSpreadsheet,
    title: "Importe ton CSV",
    desc: "Avec ou sans en-tête, séparateur ; , ou tabulation. Tout est accepté.",
  },
  {
    icon: ScanSearch,
    title: "Prévisualise et valide",
    desc: "Les erreurs sont détectées ligne par ligne avant tout import.",
  },
  {
    icon: Sparkles,
    title: "Génère avec l'IA",
    desc: "Un prompt prêt à copier transforme n'importe quel cours en CSV importable.",
  },
  {
    icon: GraduationCap,
    title: "Étudie immédiatement",
    desc: "Tes cartes sont prêtes dans la session de révision dès l'import.",
  },
];

function CsvBuilderPanel() {
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState<"typing" | "done">(
    shouldReduce ? "done" : "typing"
  );
  const [visibleRows, setVisibleRows] = useState(
    shouldReduce ? CSV_ROWS.length : 0
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldReduce) return;

    function showNextRow(idx: number) {
      if (idx >= CSV_ROWS.length) {
        timerRef.current = setTimeout(() => {
          setPhase("done");
          timerRef.current = setTimeout(() => {
            setPhase("typing");
            setVisibleRows(0);
            timerRef.current = setTimeout(() => showNextRow(0), 400);
          }, 3000);
        }, 600);
        return;
      }
      setVisibleRows(idx + 1);
      timerRef.current = setTimeout(() => showNextRow(idx + 1), 520);
    }

    timerRef.current = setTimeout(() => showNextRow(0), 600);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldReduce]);

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 min-h-[300px]"
      style={{ background: "var(--color-ink)" }}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-1">
        <span className="w-3 h-3 rounded-full bg-blush-deep/60" />
        <span className="w-3 h-3 rounded-full bg-orange/60" />
        <span className="w-3 h-3 rounded-full bg-sage-deep/60" />
        <span
          className="ml-3 text-xs font-mono"
          style={{ color: "var(--color-ink-soft)" }}
        >
          cartes.csv
        </span>
      </div>

      {/* CSV rows */}
      <div className="flex flex-col gap-1 font-mono text-xs overflow-hidden flex-1">
        {CSV_ROWS.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={
              visibleRows > i
                ? { opacity: phase === "done" && i > 0 ? 0.4 : i === 0 ? 0.5 : 1, x: 0 }
                : { opacity: 0, x: -8 }
            }
            transition={{ duration: 0.3 }}
            className={cn("px-2 py-0.5 rounded", i === 0 ? "opacity-50" : "")}
            style={{
              color: i === 0 ? "var(--color-ink-soft)" : "var(--color-peach)",
            }}
          >
            {row}
          </motion.div>
        ))}
      </div>

      {/* Preview cards morph */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={phase === "done" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        {PREVIEW_CARDS.map((card, i) => (
          <div
            key={i}
            className="rounded-xl px-3 py-2 flex items-start justify-between gap-2 text-xs"
            style={{ background: "var(--color-card)" }}
          >
            <span style={{ color: "var(--color-ink)" }} className="font-medium">
              {card.q}
            </span>
            <span
              style={{ color: "var(--color-ink-soft)" }}
              className="shrink-0"
            >
              {card.r}
            </span>
          </div>
        ))}
        <div
          className="flex items-center gap-1.5 text-xs font-medium px-1"
          style={{ color: "var(--color-sage-deep)" }}
        >
          <span>✓</span>
          <span>3 cartes détectées · 0 lignes invalides</span>
        </div>
      </motion.div>
    </div>
  );
}

export function ImportSection() {
  return (
    <section id="import" className="py-24 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Import CSV & IA"
            title="Passe de ton cours à tes cartes en quelques minutes."
            align="center"
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — animated CSV builder + screenshot */}
          <FadeIn delay={0.1} className="flex flex-col gap-6">
            <CsvBuilderPanel />
          </FadeIn>

          {/* Right — steps */}
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="flex flex-col gap-6 mt-2"
          >
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--color-peach)" }}
                >
                  <Icon
                    size={18}
                    style={{ color: "var(--color-orange-deep)" }}
                  />
                </div>
                <div className="flex flex-col gap-1">
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
                    {desc}
                  </p>
                </div>
              </motion.li>
            ))}

            <motion.div variants={fadeUp} className="pt-2">
              <a
                href="https://demo.memflow.one"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: "var(--color-orange)",
                  color: "#fff",
                }}
              >
                Voir la démo d'import
              </a>
            </motion.div>
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
