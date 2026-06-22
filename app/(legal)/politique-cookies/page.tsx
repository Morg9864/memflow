import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique cookies — MemFlow",
  description: "Informations sur l'utilisation des cookies sur memflow.one.",
}

export default function PolitiqueCookiesPage() {
  return (
    <article>
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        Politique cookies
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
        Qu&apos;est-ce qu&apos;un cookie ?
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de la visite d&apos;un site web. Il permet au site de mémoriser certaines informations relatives à votre navigation afin d&apos;améliorer votre expérience et d&apos;analyser l&apos;audience.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Cookies utilisés sur memflow.one
      </h2>

      <p
        className="text-base leading-relaxed mb-4"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <strong style={{ color: "var(--color-ink)" }}>Cookies strictement nécessaires</strong> — Aucun cookie tiers nécessaire n&apos;est déposé. Le site fonctionne sans cookies de tracking si vous refusez les cookies analytiques.
      </p>

      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <strong style={{ color: "var(--color-ink)" }}>Cookies analytiques (Google Analytics 4)</strong> — Déposés uniquement après votre consentement explicite :
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr
              style={{
                backgroundColor: "var(--color-peach-soft)",
                borderBottom: "1px solid var(--color-border-warm)",
              }}
            >
              <th
                className="text-left p-3 font-semibold"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
              >
                Nom
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
              >
                Origine
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
              >
                Durée
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
              >
                Finalité
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "_ga",
                origin: "Google Analytics",
                duration: "2 ans",
                purpose: "Distinguer les visiteurs uniques",
              },
              {
                name: "_ga_DQXSXN2DZ6",
                origin: "Google Analytics",
                duration: "2 ans",
                purpose: "Maintenir l'état de la session Analytics",
              },
              {
                name: "_gid",
                origin: "Google Analytics",
                duration: "24 heures",
                purpose: "Distinguer les visiteurs (session courte)",
              },
            ].map((cookie) => (
              <tr
                key={cookie.name}
                style={{ borderBottom: "1px solid var(--color-border-warm)" }}
              >
                <td
                  className="p-3 font-mono text-xs"
                  style={{ color: "var(--color-ink)", fontFamily: "monospace" }}
                >
                  {cookie.name}
                </td>
                <td
                  className="p-3"
                  style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
                >
                  {cookie.origin}
                </td>
                <td
                  className="p-3"
                  style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
                >
                  {cookie.duration}
                </td>
                <td
                  className="p-3"
                  style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
                >
                  {cookie.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Pourquoi ces cookies ?
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Google Analytics 4 nous permet de comprendre comment les visiteurs utilisent memflow.one — pages consultées, durée de visite, provenance du trafic — afin d&apos;améliorer le service. Les données collectées sont anonymisées et ne permettent pas de vous identifier personnellement.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Votre choix
      </h2>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>Lors de votre première visite, un bandeau vous propose d&apos;accepter ou de refuser les cookies analytiques.</li>
        <li>Ce choix est mémorisé dans votre navigateur pour 12 mois.</li>
        <li>En cas de refus, aucun cookie Google Analytics ne sera déposé sur votre appareil.</li>
        <li>Vous pouvez modifier votre choix à tout moment en effaçant les données de site de votre navigateur (voir ci-dessous).</li>
      </ul>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        Gérer les cookies dans votre navigateur
      </h2>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. Voici comment accéder aux paramètres selon votre navigateur :
      </p>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li><strong style={{ color: "var(--color-ink)" }}>Chrome</strong> — Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données de site</li>
        <li><strong style={{ color: "var(--color-ink)" }}>Firefox</strong> — Paramètres &gt; Vie privée et sécurité &gt; Cookies et données de sites</li>
        <li><strong style={{ color: "var(--color-ink)" }}>Safari</strong> — Préférences &gt; Confidentialité &gt; Gérer les données du site web</li>
        <li><strong style={{ color: "var(--color-ink)" }}>Edge</strong> — Paramètres &gt; Cookies et autorisations de site &gt; Cookies et données de site</li>
      </ul>
      <p
        className="text-base leading-relaxed mb-3"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        Notez que la désactivation de tous les cookies peut affecter le fonctionnement de certains sites web.
      </p>

      <h2
        className="text-xl font-semibold mt-10 mb-3 pt-8 border-t"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", borderColor: "var(--color-border-warm)" }}
      >
        En savoir plus sur Google Analytics
      </h2>
      <ul
        className="list-disc pl-6 mb-4 space-y-2 text-base leading-relaxed"
        style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
      >
        <li>
          Politique de confidentialité de Google :{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-orange)" }}
          >
            policies.google.com/privacy
          </a>
        </li>
        <li>
          Module de désactivation Google Analytics :{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-orange)" }}
          >
            tools.google.com/dlpage/gaoptout
          </a>
        </li>
      </ul>

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
        Pour toute question concernant l&apos;utilisation des cookies sur ce site :{" "}
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
