"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Produit", href: "#produit" },
  { label: "Modes d'étude", href: "#modes" },
  { label: "Import", href: "#import" },
  { label: "Statistiques", href: "#stats" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        aria-label="Navigation principale"
      >
        <div
          className="flex items-center justify-between gap-6 rounded-full px-4 py-2.5 w-full max-w-4xl transition-all duration-300"
          style={{
            backgroundColor: scrolled ? "rgba(250,246,239,0.85)" : "rgba(250,246,239,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--color-border-warm)",
            boxShadow: scrolled ? "0 4px 24px rgba(43,36,29,0.10)" : "none",
          }}
        >
          {/* Wordmark */}
          <a
            href="/"
            className="flex-shrink-0 text-xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--color-ink)" }}>Mem</span>
            <span style={{ color: "var(--color-orange)" }}>Flow</span>
          </a>

          {/* Center links — desktop only */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 hover:bg-[var(--color-peach)]"
                  style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTAs — desktop only */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a
              href="https://app.memflow.one"
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 hover:bg-[var(--color-peach)]"
              style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
            >
              Ouvrir l&apos;app
            </a>
            <a
              href="https://demo.memflow.one"
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "var(--color-orange)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Essayer la démo
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ color: "var(--color-ink)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-8"
            style={{ backgroundColor: "var(--color-cream)" }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="flex flex-col gap-1 mb-8"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-2xl font-semibold border-b"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-ink)",
                      borderColor: "var(--color-border-warm)",
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex flex-col gap-3 mt-auto">
              <a
                href="https://app.memflow.one"
                className="py-3.5 rounded-full text-center text-base font-medium border transition-colors"
                style={{
                  color: "var(--color-ink)",
                  borderColor: "var(--color-border-warm)",
                  fontFamily: "var(--font-sans)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Ouvrir l&apos;app
              </a>
              <a
                href="https://demo.memflow.one"
                className="py-3.5 rounded-full text-center text-base font-semibold text-white"
                style={{
                  backgroundColor: "var(--color-orange)",
                  fontFamily: "var(--font-sans)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Essayer la démo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
