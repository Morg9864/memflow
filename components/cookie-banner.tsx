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
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 sm:px-6"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "rgba(250,246,239,0.75)", fontFamily: "var(--font-sans)" }}
        >
          Nous utilisons des cookies analytiques (Google Analytics) pour comprendre comment vous utilisez MemFlow et améliorer le service.{" "}
          <Link
            href="/politique-cookies"
            className="underline transition-opacity hover:opacity-100"
            style={{ color: "rgba(250,246,239,0.9)" }}
          >
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleRefuse}
            className="px-4 py-2 text-sm font-medium rounded-full border transition-colors hover:bg-white/10"
            style={{
              color: "rgba(250,246,239,0.75)",
              borderColor: "rgba(250,246,239,0.25)",
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
