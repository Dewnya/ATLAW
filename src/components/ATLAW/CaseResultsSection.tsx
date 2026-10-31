import { useState } from "react";
import { RevealText, RevealBlock, RevealStagger } from "../../motion/primitives";
import { STAGGER } from "../../motion/config";
import { approvedCaseResults, type CaseResult } from "../../data/caseResults";
import { googleReviews, type Testimonial } from "../../data/testimonials";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const headlineAxes = "'opsz' 144, 'wght' 380, 'SOFT' 0, 'WONK' 0";

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

const VISIBLE = 3;

/** Reviews shown in place of results until the firm supplies approved results. */
const FALLBACK_REVIEWERS = ["Mike Esseily", "Prophet J.E. Lykes Sr.", "Moe Fares"];
const fallbackReviews = FALLBACK_REVIEWERS.map((name) => googleReviews.find((r) => r.name === name)).filter(
  (r): r is Testimonial => Boolean(r),
);

const ChevronLeft = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const ChevronRight = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const PersonIcon = () => (
  <svg aria-hidden="true" className="h-8 w-8 text-[#B88A2D]/60" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const Stars = () => (
  <span aria-label="5 out of 5 stars" className="flex gap-1" role="img">
    {Array.from({ length: 5 }, (_, i) => (
      <svg aria-hidden="true" className="h-4 w-4" fill="#C6A04A" key={i} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </span>
);

const cardClass =
  "group flex h-full flex-col items-center rounded-[16px] border border-[#E8E4DD] bg-white px-6 py-10 shadow-[0_6px_20px_rgba(5,15,28,0.06)] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_36px_rgba(5,15,28,0.12)] sm:px-8";

const ResultCard = ({ result }: { result: CaseResult }) => (
  <article className={cardClass}>
    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[#F5F0E8] to-[#EDE7DA]">
      <PersonIcon />
    </div>

    <p className="mt-4 font-sans text-[15px] font-semibold text-[#0B1F3A]">{result.name}</p>

    {result.insuranceOffer !== undefined && (
      <>
        <div className="mt-6 flex flex-col items-center gap-0.5">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#3A4A63]/60">
            Insurance Offer
          </p>
          <p className="font-serifDisplay text-[20px] leading-none tracking-[-0.01em] text-[#3A4A63]/50 line-through decoration-[#B88A2D]/40 decoration-[1.5px]">
            ${fmt(result.insuranceOffer)}
          </p>
        </div>

        <span aria-hidden="true" className="mt-5 flex w-full max-w-[60px] items-center gap-1.5">
          <span className="h-px flex-1 bg-gradient-to-l from-[#B88A2D]/35 to-transparent" />
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#B88A2D]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#B88A2D]/35 to-transparent" />
        </span>
      </>
    )}

    <div className="mt-5 flex flex-col items-center gap-1">
      <p
        className="font-serifDisplay font-normal leading-none tracking-[-0.02em] text-[#0B1F3A] text-[clamp(28px,3.5vw,38px)]"
        style={{ fontVariationSettings: "'opsz' 96, 'wght' 400" }}
      >
        ${fmt(result.recovered)}
      </p>
    </div>

    <p className="mt-4 rounded-full bg-[#F5F0E8] px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B88A2D]">
      {result.caseType}
    </p>
  </article>
);

const ReviewCard = ({ review }: { review: Testimonial }) => (
  <figure className={`${cardClass} text-center`}>
    <Stars />
    <blockquote className="mt-5 flex-1 font-serifDisplay text-[18px] leading-[1.55] text-[#0B1F3A]">
      &ldquo;{review.quote}&rdquo;
    </blockquote>
    <figcaption className="mt-6 flex flex-col items-center gap-1">
      <span className="font-sans text-[15px] font-semibold text-[#0B1F3A]">{review.name}</span>
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B88A2D]">
        {review.caseType}
      </span>
    </figcaption>
  </figure>
);

const ResultsCarousel = ({ results }: { results: CaseResult[] }) => {
  const maxStart = Math.max(0, results.length - VISIBLE);
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(maxStart, s + 1));

  return (
    <div className="relative mt-14 md:mt-16 lg:mt-[56px]">
      {maxStart > 0 && (
        <div className="absolute -left-4 -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-between xl:flex">
          <button
            aria-label="Previous results"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E4DD] bg-white text-[#0B1F3A] shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-[#B88A2D] hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)] disabled:opacity-30 disabled:hover:border-[#E8E4DD] disabled:hover:shadow-none"
            disabled={start === 0}
            onClick={prev}
            type="button"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next results"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E4DD] bg-white text-[#0B1F3A] shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-[#B88A2D] hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)] disabled:opacity-30 disabled:hover:border-[#E8E4DD] disabled:hover:shadow-none"
            disabled={start >= maxStart}
            onClick={next}
            type="button"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <RevealStagger amount={STAGGER.grid} className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
        {results.slice(start, start + VISIBLE).map((result) => (
          <ResultCard key={`${result.name}-${result.caseType}`} result={result} />
        ))}
      </RevealStagger>

      {maxStart > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2 xl:hidden">
          <button
            aria-label="Previous results"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4DD] bg-white text-[#0B1F3A] transition-all duration-200 hover:border-[#B88A2D] disabled:opacity-30"
            disabled={start === 0}
            onClick={prev}
            type="button"
          >
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxStart + 1 }, (_, i) => (
              <span
                className={`h-1.5 rounded-full transition-all duration-200 ${i === start ? "w-4 bg-[#B88A2D]" : "w-1.5 bg-[#E8E4DD]"}`}
                key={i}
              />
            ))}
          </div>
          <button
            aria-label="Next results"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4DD] bg-white text-[#0B1F3A] transition-all duration-200 hover:border-[#B88A2D] disabled:opacity-30"
            disabled={start >= maxStart}
            onClick={next}
            type="button"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Homepage results section. Shows firm-approved case results (data/caseResults.ts);
 * until there are any, it shows three real Google reviews instead — never
 * placeholder figures. Headline per the July 29 revision brief (section D).
 */
export const CaseResultsSection = (): JSX.Element => {
  const hasResults = approvedCaseResults.length > 0;

  return (
    <section
      aria-labelledby="case-results-heading"
      className="relative isolate w-full overflow-hidden bg-[#FFFFFF] text-[#0B1F3A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: grain }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-14 pt-10 sm:px-10 md:pb-16 md:pt-12 lg:px-20 lg:pb-[64px] lg:pt-14">
        <header className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <RevealText
            as="h2"
            className="font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-[#0B1F3A] text-[clamp(30px,4.4vw,52px)]"
            id="case-results-heading"
            style={{ fontVariationSettings: headlineAxes }}
          >
            Insurance companies fight to pay less. ATLAW fights for{" "}
            <span className="relative inline-block">
              what you deserve
              <span
                aria-hidden="true"
                className="absolute bottom-[2px] left-0 h-[3px] w-full rounded-full bg-[#C6A04A]"
              />
            </span>
            <span className="text-[#B88A2D]">.</span>
          </RevealText>
        </header>

        {hasResults ? (
          <ResultsCarousel results={approvedCaseResults} />
        ) : (
          <RevealStagger
            amount={STAGGER.grid}
            className="mt-14 grid grid-cols-1 items-stretch gap-5 md:mt-16 md:grid-cols-3 lg:mt-[56px] lg:gap-6"
          >
            {fallbackReviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </RevealStagger>
        )}

        {hasResults && (
          <RevealBlock as="p" className="mx-auto mt-10 max-w-[600px] text-center font-sans text-[12px] leading-[1.6] text-[#3A4A63]/60">
            Case results depend on a variety of factors unique to each case. Case
            results do not guarantee or predict a similar result in any future case.
          </RevealBlock>
        )}

        <RevealBlock as="div" className="mt-8 flex justify-center">
          <span aria-hidden="true" className="h-px w-full max-w-[400px] bg-gradient-to-r from-transparent via-[#B88A2D]/30 to-transparent" />
        </RevealBlock>
      </div>
    </section>
  );
};
