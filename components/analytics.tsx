"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const GA_ID = "G-DQXSXN2DZ6"

export function loadGA() {
  if (document.querySelector(`script[src*="${GA_ID}"]`)) return
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.async = true
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) { window.dataLayer.push(args) }
  window.gtag("js", new Date())
  window.gtag("config", GA_ID)
}

export function Analytics() {
  useEffect(() => {
    if (localStorage.getItem("memflow-cookie-consent") === "accepted") {
      loadGA()
    }
  }, [])
  return null
}
