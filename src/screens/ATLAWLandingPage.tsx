import { Header } from "../components/ATLAW/Header";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { Hero } from "../components/ATLAW/Hero";
import { AwardsMarquee } from "../components/ATLAW/AwardsMarquee";
import { ResultsStatBar } from "../components/ATLAW/ResultsStatBar";
import { CaseResultsSection } from "../components/ATLAW/CaseResultsSection";
import { NoFeeBanner } from "../components/ATLAW/NoFeeBanner";
import { CapabilitiesSection } from "../components/ATLAW/CapabilitiesSection";
import { HiringUsSection } from "../components/ATLAW/HiringUsSection";
import { AboutDewnyaSection } from "../components/ATLAW/AboutDewnyaSection";
import { TestimonialsSection } from "../components/ATLAW/TestimonialsSection";
import { ProcessSection } from "../components/ATLAW/ProcessSection";
import { WinningsTicker } from "../components/ATLAW/WinningsTicker";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";
import { FAQPreviewSection } from "../components/ATLAW/FAQPreviewSection";
import { FinalCtaSection } from "../components/ATLAW/FinalCtaSection";
import { Footer } from "../components/ATLAW/Footer";
import { homepageSchema } from "../data/schema-org";

export const ATLAWLandingPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageMeta
        title="ATLAW"
        description="Dearborn personal injury lawyers fighting for injured clients across Southeast Michigan. Auto accidents, medical malpractice, wrongful death. Free consultation — no fee unless we win."
        canonical="/"
        schema={homepageSchema()}
      />
      <Header />
      <main id="main-content" className="[zoom:1.12]">
        <Hero />
        <AwardsMarquee />
        <ResultsStatBar />
        <CaseResultsSection />
        <NoFeeBanner />
        <CapabilitiesSection />
        <HiringUsSection />
        <AboutDewnyaSection />
        <TestimonialsSection />
        <ProcessSection />
        <WinningsTicker />
        <IntakeFormSection />
        <FAQPreviewSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};
