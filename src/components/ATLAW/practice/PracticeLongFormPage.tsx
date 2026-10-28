import { useEffect } from "react";
import type { PracticeContent } from "../../../content/types";
import { practiceAreaBySlug } from "../../../data/practice/pi";
import { practiceEntry, practiceHref, practiceRegistry } from "../../../data/practice/pi/registry";
import { practiceHasPage } from "../../../data/practice/pages";
import { faqPageSchema, practiceAreaSchema } from "../../../data/schema-org";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { PageMeta } from "../PageMeta";
import { openIntakeModal } from "../IntakeModal";
import { TestimonialsSection } from "../TestimonialsSection";
import { IntakeFormSection } from "../IntakeFormSection";
import {
  AccordionItem,
  CityLinksSection,
  FinalCTABand,
  Hero,
  RelatedPagesSection,
  SidebarCTA,
} from "../PracticeAreaDetailTemplate";
import { RichBlocks, RichInline, inlineText } from "./RichText";

const INK = "#0B1F3A";
const GOLD = "#C9A24B";
const GOLD_ACCENT = "#B88A2D";
const subHeadAxes = "'opsz' 96, 'wght' 400, 'SOFT' 0, 'WONK' 0";
const headlineAxes = "'opsz' 144, 'wght' 360, 'SOFT' 0, 'WONK' 0";

/** Pages longer than this get a table of contents (build plan 4h). */
export const TOC_MIN_WORDS = 2000;

const sectionHeading = "font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]";

export const DraftBanner = ({ content }: { content: PracticeContent }) => (
  <div className="w-full bg-[#FFF4CC] px-6 py-2.5 text-center font-sans text-[13px] leading-[1.5] text-[#5A4300]">
    <strong>Draft for attorney review, not published.</strong> {content.openItems} open item{content.openItems === 1 ? "" : "s"} highlighted
    on this page · source: {content.source.file}
  </div>
);

export const TableOfContents = ({ content }: { content: PracticeContent }) => (
  <nav aria-label="On this page" className="rounded-[16px] border border-[#0B1F3A]/10 bg-[#F7F7F5] px-6 py-6 lg:px-8">
    <p className="flex items-center gap-3 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em]" style={{ color: INK }}>
      <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: GOLD_ACCENT }} />
      On this page
    </p>
    <ol className="mt-5 grid gap-x-8 gap-y-2.5 font-sans text-[15px] leading-[1.45] md:grid-cols-2">
      {[...content.sections, ...(content.faqs.length ? [{ id: "faq", heading: "Frequently asked questions" }] : [])].map((s) => (
        <li key={s.id}>
          <a className="underline-offset-[3px] hover:underline" href={`#${s.id}`} style={{ color: INK }}>
            {s.heading}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

/** Three sibling practices (same menu group first) that have a page. */
const relatedFor = (slug: string): { slug: string; title: string }[] => {
  const group = practiceEntry(slug)?.navGroup;
  const candidates = practiceRegistry.filter((p) => p.slug !== slug && p.slug !== "personal-injury" && practiceHasPage(p.slug));
  const ordered = [...candidates.filter((p) => p.navGroup === group), ...candidates.filter((p) => p.navGroup !== group)];
  return ordered.slice(0, 3).map((p) => ({ slug: p.slug, title: p.navLabel }));
};

/**
 * Long practice page from imported content (build plan 4h): the writers' copy in
 * section order, a table of contents on long pages, the FAQs (with FAQPage
 * schema), then the site's shared reviews, related areas, intake form and CTAs.
 * Drafts show a banner, highlight open items and are kept out of search (noindex).
 */
export const PracticeLongFormPage = ({ content }: { content: PracticeContent }): JSX.Element => {
  const entry = practiceEntry(content.slug);
  const legacy = practiceAreaBySlug[content.slug];
  const isDraft = content.status === "draft";

  useEffect(() => { window.scrollTo(0, 0); }, [content.slug]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title={content.seoTitle}
        description={content.seoDescription}
        canonical={entry ? practiceHref(entry.slug) : undefined}
        noindex={isDraft}
        schema={[
          practiceAreaSchema(entry?.navLabel ?? content.h1, entry?.serviceType ?? `${content.h1} Legal Representation`),
          faqPageSchema(content.faqs.map((f) => ({ question: f.question, answer: inlineText(f.answer) }))),
        ]}
      />
      <Header />
      <main id="main-content" className="flex-1">
        {isDraft && <DraftBanner content={content} />}

        <Hero
          data={{
            title: entry?.navLabel ?? content.h1,
            heroTitle: content.h1,
            tagline: content.tagline,
            heroImage: legacy?.heroImage,
            heroImageAlt: legacy?.heroImageAlt,
          }}
          parent={content.section === "disability" || content.slug === "personal-injury" ? null : undefined}
        />

        <section aria-label="Page content" className="relative w-full bg-white">
          <div className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-12 px-6 pb-20 pt-4 sm:px-10 lg:flex-row lg:gap-16 lg:px-16 lg:pb-[100px]">
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

        <RelatedPagesSection areas={relatedFor(content.slug)} />
        <IntakeFormSection />
        {legacy && legacy.cities.length > 0 && <CityLinksSection data={legacy} />}
        <FinalCTABand />
      </main>
      <Footer />
    </div>
  );
};
