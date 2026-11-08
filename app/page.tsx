import { Navbar } from "@/components/navbar";
import {
	FinalCta,
	Hero,
	ImportSection,
	ProductShowcase,
	SpacedRepetition,
	StatsSection,
	StudyModes,
	UseCases,
} from "@/components/site-content";
import { VideoSection } from "@/components/video-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main className="bg-[var(--color-cream)] text-[var(--color-ink)]">
        <Hero />
        <VideoSection />
        <ProductShowcase />
        <StudyModes />
        <SpacedRepetition />
        <ImportSection />
        <StatsSection />
        <UseCases />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
