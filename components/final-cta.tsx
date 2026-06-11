"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const HEADLINE_LINES = [
  { text: "Apprends avec intention.", orange: false },
  { text: "Reviens au bon moment.", orange: false },
  { text: "Garde ce qui compte.", orange: true },
];

const THEMES = [
  {
    id: "clair",
    label: "Clair",
    bg: "#FAF6EF",
    cardBg: "#FFFFFF",
    text: "#2B241D",
    accent: "#D97B3F",
    border: "#EBE2D6",
    muted: "#9A8F86",
  },
  {
    id: "sombre",
    label: "Sombre",
    bg: "#1C1814",
    cardBg: "#2A2520",
    text: "#F0E8DC",
    accent: "#D97B3F",
    border: "#3A3228",
    muted: "#7A706A",
  },
  {
    id: "vivid",
    label: "Vivid",
    bg: "#F0F2FF",
    cardBg: "#FFFFFF",
    text: "#1A1A2E",
    accent: "#D040E0",
    border: "#DDE0FF",
    muted: "#8888AA",
  },
];

export function FinalCta() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="py-28 px-4"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        {/* Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="flex flex-col items-center text-center gap-1"
        >
          {HEADLINE_LINES.map(({ text, orange }) => (
            <motion.h2
              key={text}
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: orange ? "var(--color-orange)" : "var(--color-ink)",
              }}
            >
              {text}
            </motion.h2>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            variants={fadeUp}
            href="https://demo.memflow.one"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
            style={{
              background: "var(--color-orange)",
              color: "#fff",
            }}
          >
            Essayer la démo
          </motion.a>
          <motion.a
            variants={fadeUp}
            href="https://app.memflow.one"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-semibold border transition-colors hover:bg-peach"
            style={{
              background: "transparent",
              color: "var(--color-ink)",
              borderColor: "var(--color-border-warm)",
            }}
          >
            Ouvrir l&apos;app
          </motion.a>
        </motion.div>

        {/* Theme previews */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            {THEMES.map((theme, i) => (
              <motion.div
                key={theme.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="rounded-2xl overflow-hidden shrink-0"
                style={{
                  width: "120px",
                  background: theme.bg,
                  border: `1.5px solid ${theme.border}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Mini header bar */}
                <div
                  className="px-3 py-2 flex items-center justify-between"
                  style={{ borderBottom: `1px solid ${theme.border}` }}
                >
                  <span style={{ fontSize: "8px", fontWeight: 700, color: theme.accent, fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
                    Mem<span style={{ color: theme.accent }}>Flow</span>
                  </span>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: theme.accent, opacity: 0.9 }} />
                </div>

                {/* Mini stat card */}
                <div className="px-3 pt-2 pb-1">
                  <div style={{ fontSize: "7px", color: theme.muted, marginBottom: "2px", fontFamily: "var(--font-sans)" }}>
                    SÉRIE
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: theme.text, lineHeight: 1, fontFamily: "var(--font-display)" }}>
                    14j
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="px-3 pb-3">
                  <div style={{ height: "3px", borderRadius: "2px", background: theme.border, marginBottom: "6px" }}>
                    <div style={{ width: "72%", height: "100%", borderRadius: "2px", background: theme.accent }} />
                  </div>
                  {/* Mini card rows */}
                  {[0.9, 0.6].map((w, j) => (
                    <div
                      key={j}
                      className="rounded-md mb-1.5"
                      style={{
                        height: "20px",
                        background: theme.cardBg,
                        border: `1px solid ${theme.border}`,
                        width: `${w * 100}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Theme label */}
                <div
                  className="text-center py-2"
                  style={{
                    borderTop: `1px solid ${theme.border}`,
                    fontSize: "9px",
                    fontWeight: 600,
                    color: theme.muted,
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {theme.label}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-center" style={{ color: "var(--color-ink-soft)" }}>
            Clair, sombre ou vivid — à toi de choisir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
