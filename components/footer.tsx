const produitLinks = [
  { label: "Produit", href: "#produit" },
  { label: "Modes d'étude", href: "#modes" },
  { label: "Import", href: "#import" },
  { label: "Statistiques", href: "#stats" },
];

const appLinks = [
  { label: "Ouvrir l'app", href: "https://app.memflow.one" },
  { label: "Lancer la démo", href: "https://demo.memflow.one" },
];

const legalLinks = [
  { label: "Politique de confidentialité", href: "#" },
  { label: "Conditions d'utilisation", href: "#" },
  { label: "Mentions légales", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="relative mt-24 pt-16 pb-8"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: "rgba(235,226,214,0.12)" }}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <a
              href="/"
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span style={{ color: "rgba(250,246,239,0.95)" }}>Mem</span>
              <span style={{ color: "var(--color-orange)" }}>Flow</span>
            </a>
            <p
              className="text-sm leading-relaxed max-w-[220px]"
              style={{ color: "rgba(250,246,239,0.5)", fontFamily: "var(--font-sans)" }}
            >
              Apprends avec intention.<br />Garde ce qui compte.
            </p>
          </div>

          {/* Produit */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: "rgba(250,246,239,0.35)", fontFamily: "var(--font-sans)" }}
            >
              Produit
            </h3>
            {produitLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:opacity-100"
                style={{ color: "rgba(250,246,239,0.6)", fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Application */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: "rgba(250,246,239,0.35)", fontFamily: "var(--font-sans)" }}
            >
              Application
            </h3>
            {appLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:opacity-100"
                style={{ color: "rgba(250,246,239,0.6)", fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Légal */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: "rgba(250,246,239,0.35)", fontFamily: "var(--font-sans)" }}
            >
              Légal
            </h3>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:opacity-100"
                style={{ color: "rgba(250,246,239,0.6)", fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: "rgba(250,246,239,0.3)", fontFamily: "var(--font-sans)" }}
          >
            © 2026 MemFlow
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(250,246,239,0.2)", fontFamily: "var(--font-sans)" }}
          >
            Fait avec soin pour les apprenants curieux.
          </p>
        </div>
      </div>
    </footer>
  );
}
