import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { SolutionSection } from "@/components/solution-section";
import { ProductShowcase } from "@/components/product-showcase";
import { StudyModes } from "@/components/study-modes";
import { SpacedRepetition } from "@/components/spaced-repetition";
import { ImportSection } from "@/components/import-section";
import { StatsSection } from "@/components/stats-section";
import { UseCases } from "@/components/use-cases";
import { DemoCta } from "@/components/demo-cta";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main className="bg-[var(--color-cream)] text-[var(--color-ink)]">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ProductShowcase />
        <StudyModes />
        <SpacedRepetition />
        <ImportSection />
        <StatsSection />
        <UseCases />
        <DemoCta />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
