"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { loadGA } from "@/components/analytics"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("memflow-cookie-consent")) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function handleRefuse() {
    localStorage.setItem("memflow-cookie-consent", "refused")
    setVisible(false)
  }

  function handleAccept() {
    localStorage.setItem("memflow-cookie-consent", "accepted")
    loadGA()
    setVisible(false)
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-6xl rounded-2xl border px-4 py-4 shadow-lg sm:px-6"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border-warm)",
        boxShadow: "0 12px 40px rgba(43, 36, 29, .12)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
        >
          Nous utilisons des cookies analytiques (Google Analytics) pour comprendre comment vous utilisez MemFlow et améliorer le service.{" "}
          <Link
            href="/politique-cookies"
            className="underline transition-opacity hover:opacity-100"
            style={{ color: "var(--color-ink)" }}
          >
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleRefuse}
            className="px-4 py-2 text-sm font-medium rounded-full border transition-colors hover:bg-[var(--color-peach-soft)]"
            style={{
              color: "var(--color-ink)",
              borderColor: "var(--color-border-warm)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-semibold rounded-full transition-colors"
            style={{
              backgroundColor: "var(--color-orange)",
              color: "white",
              fontFamily: "var(--font-sans)",
            }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
