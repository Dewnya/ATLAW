import { useEffect } from "react";
import type { PracticeContent } from "../../../content/types";
import type { CityInfo } from "../../../data/cities";
import { practiceAreaBySlug } from "../../../data/practice/pi";
import { practiceEntry } from "../../../data/practice/pi/registry";
import { cityPracticeSchema, faqPageSchema } from "../../../data/schema-org";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { PageMeta } from "../PageMeta";
import { openIntakeModal } from "../IntakeModal";
import { TestimonialsSection } from "../TestimonialsSection";
import { IntakeFormSection } from "../IntakeFormSection";
import { AccordionItem, FinalCTABand, SidebarCTA } from "../PracticeAreaDetailTemplate";
import { CityHero, CityStatsBar, OtherCitiesSection, OtherPracticeAreasSection } from "../CityLandingTemplate";
import { DraftBanner, TableOfContents, TOC_MIN_WORDS } from "./PracticeLongFormPage";
import { RichBlocks, RichInline, inlineText } from "./RichText";

const INK = "#0B1F3A";
const GOLD = "#C9A24B";
const GOLD_ACCENT = "#B88A2D";
const subHeadAxes = "'opsz' 96, 'wght' 400, 'SOFT' 0, 'WONK' 0";
const headlineAxes = "'opsz' 144, 'wght' 360, 'SOFT' 0, 'WONK' 0";

const sectionHeading = "font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]";

/**
 * Long city or county page from imported content: the city hero and stats bar,
 * then the writers' copy exactly as the statewide long-form page shows it
 * (intro, table of contents, sections beside the sticky CTA, reviews, FAQs with
 * FAQPage schema, closing CTA), then the city template's related-page sections.
 * A city hub (section "areas-served", at /areas-served/<city>) uses the same
 * layout with an Areas We Serve breadcrumb and every practice page for the city.
 * Drafts show a banner, highlight open items and are kept out of search (noindex).
 */
export const CityLongFormPage = ({ content, city }: { content: PracticeContent; city: CityInfo }): JSX.Element => {
  const isHub = content.section === "areas-served";
  const entry = practiceEntry(content.slug);
  const title = isHub ? "Personal Injury" : entry?.navLabel ?? content.h1;
  const practice = { slug: content.slug, title, tagline: content.tagline };
  const isDraft = content.status === "draft";
  const path = isHub ? `/areas-served/${city.slug}` : `/${content.section}/${content.slug}/${city.slug}`;

  useEffect(() => { window.scrollTo(0, 0); }, [content.slug, city.slug]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title={content.seoTitle}
        description={content.seoDescription}
        canonical={path}
        noindex={isDraft}
        schema={[
          cityPracticeSchema(title, entry?.serviceType ?? `${title} Legal Representation`, city.name),
          faqPageSchema(content.faqs.map((f) => ({ question: f.question, answer: inlineText(f.answer) }))),
        ]}
      />
      <Header />
      <main id="main-content" className="flex-1">
        {isDraft && <DraftBanner content={content} />}

        <CityHero practice={practice} city={city} heroTitle={content.h1} section={content.section} />
        <CityStatsBar city={city} />

        <section aria-label="Page content" className="relative w-full bg-white">
          <div className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-12 px-6 pb-20 pt-16 sm:px-10 lg:flex-row lg:gap-16 lg:px-16 lg:pb-[100px] lg:pt-20">
            <article className="min-w-0 lg:basis-[64%]">
              <RichBlocks blocks={content.intro} />

              {content.wordCount > TOC_MIN_WORDS && (
                <div className="mt-10">
                  <TableOfContents content={content} />
                </div>
              )}

              {content.sections.map((s) => (
                <section aria-labelledby={`h-${s.id}`} className="mt-14 scroll-mt-[110px] lg:mt-16" id={s.id} key={s.id}>
                  <h2
                    className={sectionHeading}
                    id={`h-${s.id}`}
                    style={{ fontSize: "clamp(24px, 3.2vw, 34px)", fontVariationSettings: subHeadAxes, color: INK }}
                  >
                    {s.heading}
                  </h2>
                  <div className="mt-5">
                    <RichBlocks blocks={s.blocks} />
                  </div>
                </section>
              ))}
            </article>

            <aside className="lg:basis-[33%]">
              <div className="lg:sticky lg:top-[110px]">
                <SidebarCTA />
              </div>
            </aside>
          </div>
        </section>

        <TestimonialsSection />

        {content.faqs.length > 0 && (
          <section aria-labelledby="pa-faq-heading" className="relative w-full bg-white scroll-mt-[90px]" id="faq">
            <div className="relative mx-auto w-full max-w-[860px] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
              <h2
                className={`text-center ${sectionHeading}`}
                id="pa-faq-heading"
                style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontVariationSettings: headlineAxes, color: INK }}
              >
                Frequently Asked Questions<span style={{ color: GOLD_ACCENT }}>.</span>
              </h2>
              <div className="mt-10 border-t border-[#0B1F3A]/10 lg:mt-12">
                {content.faqs.map((f) => (
                  <AccordionItem faq={{ question: f.question, answer: <RichInline nodes={f.answer} /> }} key={f.question} />
                ))}
              </div>
            </div>
          </section>
        )}

        {content.cta && (
          <section aria-labelledby={`h-${content.cta.id}`} className="w-full bg-[#F7F7F5]" id={content.cta.id}>
            <div className="mx-auto w-full max-w-[860px] px-6 py-14 text-center sm:px-10 lg:py-20">
              <h2
                className={sectionHeading}
                id={`h-${content.cta.id}`}
                style={{ fontSize: "clamp(26px, 3.6vw, 40px)", fontVariationSettings: subHeadAxes, color: INK }}
              >
                {content.cta.heading}<span aria-hidden="true" style={{ color: GOLD }}>.</span>
              </h2>
              <div className="mx-auto mt-6 max-w-[680px] text-left">
                <RichBlocks blocks={content.cta.blocks} />
              </div>
              <button
                className="mt-9 inline-flex h-[56px] items-center justify-center rounded-full px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(14,27,44,0.3)]"
                onClick={openIntakeModal}
                style={{ backgroundColor: "#0E1B2C" }}
                type="button"
              >
                Start Your Free Case Review
              </button>
            </div>
          </section>
        )}

        <OtherPracticeAreasSection practice={practice} city={city} heading={isHub ? `Our Practice Areas in ${city.name}` : undefined} />
        {/* The other-cities links point at the original city template, which exists only for the original practices. */}
        {practiceAreaBySlug[content.slug] && <OtherCitiesSection practice={practice} city={city} />}
        <IntakeFormSection />
        <FinalCTABand />
      </main>
      <Footer />
    </div>
  );
};
