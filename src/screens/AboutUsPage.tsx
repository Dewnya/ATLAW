import { Header } from "../components/ATLAW/Header";
import { Breadcrumbs } from "../components/ATLAW/Breadcrumbs";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { Reveal, Eyebrow, Period, grain, SECTION, NAVY } from "./about/primitives";
import {
  FounderFeatureSection,
  TimelineSection,
  FirmValuesSection,
  AwardsStripSection,
  ByTheNumbersSection,
} from "./about/sections";
import { TestimonialsSection } from "../components/ATLAW/TestimonialsSection";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";
import { aboutPageSchema } from "../data/schema-org";

export const AboutUsPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white text-[#0E1B2C]">
      <PageMeta
        title="About ATLAW | Dewnya Bazzi | Personal Injury Lawyers in Dearborn, MI"
        description="Meet Dewnya Bazzi, founder of ATLAW. A Dearborn-based personal injury firm built on unreasonable hospitality — fighting for injured clients across Southeast Michigan since 2013."
        canonical="/about"
        schema={aboutPageSchema()}
      />
      <Header />
      <main id="main-content">
        {/* ══ 01 — HERO (dark overlay on group photo) ═════════════════ */}
        <section
          aria-labelledby="about-hero-heading"
          className="relative isolate w-full overflow-hidden"
          style={{ backgroundColor: NAVY }}
        >
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
            fetchPriority="high"
            src="/assets/team/group-shot.avif"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0e1b33]/70 via-[#0e1b33]/60 to-[#0e1b33]/90"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: grain }}
          />

          <Breadcrumbs items={[{ label: "ATLAW", to: "/" }, { label: "About" }]} />
          <div className={`relative ${SECTION} flex min-h-[420px] flex-col items-center justify-center py-24 text-center md:min-h-[480px] md:py-32 lg:min-h-[540px] lg:py-40`}>
            <Reveal>
              <Eyebrow num="01" label="About Us" onDark />
            </Reveal>
            <Reveal delay={80}>
              <h1
                id="about-hero-heading"
                className="mx-auto mt-8 max-w-[18ch] font-serifDisplay text-[40px] font-normal leading-[1.04] tracking-[-0.02em] text-white sm:text-[52px] md:text-[64px] lg:text-[72px]"
              >
                Our Story<Period />
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-[560px] font-serifDisplay text-[18px] leading-[1.6] text-white/75 lg:text-[20px]">
                Founded in Dearborn. Built on personal injury. Driven by the belief that every injured person deserves a fighter in their corner.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══ 02 — FOUNDER FEATURE ═══════════════════════════════════ */}
        <FounderFeatureSection />

        {/* ══ 03 — TIMELINE ══════════════════════════════════════════ */}
        <TimelineSection />

        {/* ══ 04 — FIRM VALUES ═══════════════════════════════════════ */}
        <FirmValuesSection />

        {/* ══ 05 — AWARDS/MEDIA STRIP ════════════════════════════════ */}
        <AwardsStripSection />

        {/* ══ 06 — BY THE NUMBERS ════════════════════════════════════ */}
        <ByTheNumbersSection />

        {/* ══ 07 — TESTIMONIALS + INTAKE CTA (shared) ════════════════ */}
        <TestimonialsSection />
        <IntakeFormSection />
      </main>

      {/* ══ 08 — FOOTER ═════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
};
