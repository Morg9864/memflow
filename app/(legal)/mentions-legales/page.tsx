import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales — MemFlow",
  description: "Informations légales relatives au site memflow.one.",
}

export default function MentionsLegalesPage() {
  return (
    <article>
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        Mentions légales
      </h1>
      <p
        className="text-sm mb-12"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Dernière mise à jour : 22 juin 2026
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Éditeur du site
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Le site memflow.one est édité par Morgan Phemba, personne physique résidant à Liège, Belgique.
      </p>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Date de naissance : 23 octobre 2003
        <br />
        Lieu de résidence : Liège, Belgique
        <br />
        Adresse électronique :{" "}
        <a
          href="mailto:morgan.phemba@gmail.com"
          style={{ color: "var(--color-orange)" }}
        >
          morgan.phemba@gmail.com
        </a>
        <br />
        Site personnel :{" "}
        <a
          href="https://www.morganphemba.be"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-orange)" }}
        >
          www.morganphemba.be
        </a>
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Directeur de la publication
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Morgan Phemba — responsable éditorial du site memflow.one.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Hébergement
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Le site est hébergé par :
        <br />
        <strong style={{ color: "var(--color-ink)" }}>Vercel Inc.</strong>
        <br />
        340 Pine Street, Suite 701
        <br />
        San Francisco, CA 94104, États-Unis
        <br />
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-orange)" }}
        >
          vercel.com
        </a>
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Propriété intellectuelle
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        L&apos;ensemble du contenu présent sur memflow.one — textes, visuels, logo, marque « MemFlow » et code source — est la propriété exclusive de Morgan Phemba et est protégé par les lois applicables en matière de propriété intellectuelle.
      </p>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Toute reproduction, représentation, modification ou exploitation, même partielle, du contenu de ce site est strictement interdite sans autorisation écrite préalable de l&apos;éditeur.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Données personnelles et cookies
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Pour en savoir plus sur la gestion de vos données personnelles et l&apos;utilisation des cookies sur ce site, consultez notre{" "}
        <a href="/politique-confidentialite" style={{ color: "var(--color-orange)" }}>
          politique de confidentialité
        </a>{" "}
        et notre{" "}
        <a href="/politique-cookies" style={{ color: "var(--color-orange)" }}>
          politique cookies
        </a>
        .
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Contact
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Pour toute question relative au site ou à son contenu :{" "}
        <a
          href="mailto:morgan.phemba@gmail.com"
          style={{ color: "var(--color-orange)" }}
        >
          morgan.phemba@gmail.com
        </a>
      </p>
    </article>
  )
}
