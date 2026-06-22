import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions d'utilisation — MemFlow",
  description: "Conditions générales d'utilisation du service MemFlow.",
}

export default function ConditionsUtilisationPage() {
  return (
    <article>
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        Conditions d&apos;utilisation
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
        Présentation du service
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        MemFlow est une application web de flashcards et de révision espacée, accessible sur memflow.one (site vitrine) et app.memflow.one (application). Le service est développé et maintenu par Morgan Phemba (Liège, Belgique).
      </p>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        En accédant à MemFlow, vous acceptez les présentes conditions d&apos;utilisation dans leur intégralité. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le service.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Accès au service
      </h2>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>La landing page (memflow.one) est accessible librement et gratuitement.</li>
        <li>L&apos;accès à l&apos;application (app.memflow.one) nécessite la création d&apos;un compte utilisateur.</li>
        <li>La version bêta est proposée gratuitement. Des formules payantes pourront être introduites ultérieurement avec un préavis raisonnable communiqué par email.</li>
      </ul>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Utilisation acceptable
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        En utilisant MemFlow, vous vous engagez à :
      </p>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>Ne pas utiliser le service à des fins illicites, frauduleuses ou contraires à l&apos;ordre public.</li>
        <li>Ne pas tenter de compromettre la sécurité, l&apos;intégrité ou le bon fonctionnement des serveurs ou du code de MemFlow.</li>
        <li>Ne pas reproduire, revendre ou exploiter commercialement le contenu ou le code de MemFlow sans autorisation écrite préalable.</li>
        <li>Ne pas usurper l&apos;identité d&apos;une autre personne ou entité lors de l&apos;utilisation du service.</li>
      </ul>

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
        Le nom « MemFlow », le logo, le design, le code source et l&apos;ensemble du contenu éditorial du site sont la propriété exclusive de Morgan Phemba et protégés par les lois applicables en matière de propriété intellectuelle.
      </p>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Le contenu créé par l&apos;utilisateur au sein de l&apos;application (cartes, decks, notes) reste sa propriété. MemFlow se réserve le droit d&apos;utiliser ce contenu de façon anonymisée et agrégée à des fins d&apos;amélioration du service.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Disponibilité du service
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        MemFlow s&apos;efforce d&apos;assurer une disponibilité maximale du service mais ne peut garantir une disponibilité ininterrompue. Des opérations de maintenance, mises à jour ou incidents techniques peuvent entraîner des interruptions temporaires, sans préavis obligatoire.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Limitation de responsabilité
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Dans les limites permises par la loi applicable, MemFlow ne saurait être tenu responsable :
      </p>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>De toute interruption ou dysfonctionnement du service, quelle qu&apos;en soit la cause.</li>
        <li>De la perte de données utilisateur ; il est recommandé d&apos;effectuer des sauvegardes régulières de votre contenu.</li>
        <li>Des dommages directs ou indirects résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service.</li>
      </ul>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Modification des conditions
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Ces conditions peuvent être modifiées à tout moment. Les utilisateurs disposant d&apos;un compte seront informés par email ou notification in-app de tout changement substantiel. La poursuite de l&apos;utilisation du service après notification vaut acceptation des nouvelles conditions.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Droit applicable et juridiction
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Les présentes conditions sont soumises au droit belge. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents de Liège (Belgique) seront seuls compétents.
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
        Pour toute question relative aux présentes conditions d&apos;utilisation :{" "}
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
