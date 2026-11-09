import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité — MemFlow",
  description: "Comment MemFlow collecte, utilise et protège vos données personnelles.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <article>
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        Politique de confidentialité
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
        Introduction
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Morgan Phemba (ci-après « nous » ou « MemFlow ») s&apos;engage à protéger la vie privée des visiteurs et utilisateurs du site memflow.one. La présente politique de confidentialité décrit quelles données sont collectées, pourquoi, comment elles sont utilisées et quels sont vos droits conformément au Règlement général sur la protection des données (RGPD).
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Responsable du traitement
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Morgan Phemba
        <br />
        Liège, Belgique
        <br />
        <a
          href="mailto:morgan.phemba@gmail.com"
          style={{ color: "var(--color-orange)" }}
        >
          morgan.phemba@gmail.com
        </a>
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Données collectées
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Nous collectons les catégories de données suivantes :
      </p>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>
          <strong style={{ color: "var(--color-ink)" }}>Données de navigation</strong> — pages visitées, durée de session, provenance du trafic, type d&apos;appareil et localisation approximative, collectées via Google Analytics 4 uniquement après votre consentement.
        </li>
        <li>
          <strong style={{ color: "var(--color-ink)" }}>Données saisies volontairement</strong> — adresse électronique ou informations transmises via les formulaires de contact.
        </li>
      </ul>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Nous ne collectons aucune donnée sensible (santé, opinions politiques, données financières, etc.).
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Base légale du traitement
      </h2>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>
          <strong style={{ color: "var(--color-ink)" }}>Consentement (art. 6.1.a RGPD)</strong> — pour les cookies analytiques Google Analytics. La collecte n&apos;a lieu qu&apos;après votre acceptation explicite via le bandeau de consentement affiché lors de votre première visite.
        </li>
        <li>
          <strong style={{ color: "var(--color-ink)" }}>Intérêt légitime (art. 6.1.f RGPD)</strong> — pour les données transmises via les formulaires de contact, afin de répondre à vos demandes.
        </li>
      </ul>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Durée de conservation
      </h2>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>Données Google Analytics : 14 mois (paramètre par défaut de la plateforme GA4)</li>
        <li>Données de contact et formulaires : 3 ans maximum à compter de la dernière interaction</li>
      </ul>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Partage des données
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Vos données ne sont jamais vendues à des tiers. Elles peuvent être transmises aux sous-traitants suivants, dans le strict cadre de la finalité décrite :
      </p>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>
          <strong style={{ color: "var(--color-ink)" }}>Google Ireland Limited</strong> — fourniture du service Google Analytics 4. Les données peuvent être transférées aux États-Unis dans le respect des garanties adéquates prévues par les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne.
        </li>
      </ul>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Vos droits
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
      </p>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>Droit d&apos;accès à vos données</li>
        <li>Droit de rectification des données inexactes</li>
        <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité de vos données</li>
        <li>Droit d&apos;opposition au traitement</li>
        <li>Droit de retirer votre consentement à tout moment, sans que cela affecte la licéité du traitement antérieur</li>
      </ul>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Pour exercer vos droits, contactez-nous à{" "}
        <a
          href="mailto:morgan.phemba@gmail.com"
          style={{ color: "var(--color-orange)" }}
        >
          morgan.phemba@gmail.com
        </a>
        . Vous disposez également du droit d&apos;introduire une réclamation auprès de l&apos;Autorité de protection des données (APD) belge :{" "}
        <a
          href="https://www.autoriteprotectiondonnees.be"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-orange)" }}
        >
          autoriteprotectiondonnees.be
        </a>
        .
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Cookies
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Pour des informations détaillées sur les cookies utilisés par ce site et les moyens de gérer vos préférences, consultez notre{" "}
        <a href="/politique-cookies" style={{ color: "var(--color-orange)" }}>
          politique cookies
        </a>
        .
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Modifications de la politique
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Nous nous réservons le droit de mettre à jour cette politique à tout moment. En cas de modification substantielle, nous vous en informerons de manière appropriée. La date de dernière mise à jour est indiquée en haut de cette page.
      </p>
    </article>
  )
}
