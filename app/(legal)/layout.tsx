import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "var(--color-cream)", minHeight: "100vh" }}>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
