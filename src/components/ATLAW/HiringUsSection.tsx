import { RevealText, RevealBlock, Counter } from "../../motion/primitives";
import { openIntakeModal } from "./IntakeModal";
import { approvedCaseResults } from "../../data/caseResults";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const headlineAxes = "'opsz' 144, 'wght' 380, 'SOFT' 0, 'WONK' 0";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={`h-[14px] w-[14px] transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M5 12h14M13 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const DownArrow = () => (
  <svg
    aria-hidden="true"
    className="h-8 w-8 text-[#C6A04A] sm:h-10 sm:w-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 5v14M5 12l7 7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

/** The offer-vs-recovery example appears only for a firm-approved result that includes the insurer's offer. */
const featured = approvedCaseResults.find((r) => r.insuranceOffer !== undefined && r.insuranceOffer > 0);

export const HiringUsSection = (): JSX.Element => {
  return (
    <section
      aria-labelledby="hiring-us-heading"
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0e1b33_0%,#0a1428_100%)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:py-20 lg:px-20 lg:py-[100px]">
        <header className="mx-auto flex flex-col items-center text-center">
          <RevealBlock
            as="p"
            className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em] text-[#C6A04A]"
          >
            Why Hire ATLAW
          </RevealBlock>

          <RevealText
            as="h2"
            className="mt-5 font-serifDisplay font-normal leading-[1.06] tracking-[-0.02em] text-white text-[clamp(32px,5vw,58px)]"
            id="hiring-us-heading"
            style={{ fontVariationSettings: headlineAxes }}
          >
            Hiring ATLAW Means More Money for You and Your Family<span className="text-[#B88A2D]">.</span>
          </RevealText>

          <RevealBlock
            as="p"
            className="mt-5 max-w-[640px] font-sans text-[17px] leading-[1.6] text-white/70 lg:text-[18px]"
          >
            Insurance companies lowball. ATLAW doesn&rsquo;t let them.
          </RevealBlock>
        </header>

        {featured && (
          <>
            <RevealBlock className="mt-14 lg:mt-16">
              <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6">
                {/* Insurance offer */}
                <div className="flex w-full flex-col items-center rounded-[16px] border border-white/10 bg-white/[0.04] px-8 py-8 sm:px-10">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    Insurance Company&rsquo;s Offer
                  </p>
                  <p className="mt-3 font-serifDisplay text-[clamp(32px,5vw,48px)] font-normal leading-none tracking-[-0.02em] text-white/40 line-through decoration-[#C6A04A]/50 decoration-2">
                    ${new Intl.NumberFormat("en-US").format(featured.insuranceOffer ?? 0)}
                  </p>
                </div>

                <DownArrow />

                {/* ATLAW recovery */}
                <div className="flex w-full flex-col items-center rounded-[16px] border border-[#C6A04A]/30 bg-[#C6A04A]/[0.06] px-8 py-8 sm:px-10">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C6A04A]">
                    What ATLAW Recovered
                  </p>
                  <Counter
                    as="p"
                    className="mt-3 font-serifDisplay text-[clamp(40px,6vw,64px)] font-normal leading-none tracking-[-0.02em] text-white"
                    duration={1.2}
                    prefix="$"
                    suffix=""
                    value={featured.recovered}
                  />
                  <p className="mt-2 font-sans text-[12px] tracking-[0.06em] text-white/30">
                    {featured.caseType}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C6A04A]/40" />
                  <p className="font-sans text-[14px] font-bold uppercase tracking-[0.1em] text-[#C6A04A]">
                    {(featured.recovered / (featured.insuranceOffer ?? 1)).toFixed(1)}&times; More
                  </p>
                  <span className="h-px w-8 bg-[#C6A04A]/40" />
                </div>
              </div>
            </RevealBlock>

            <RevealBlock
              as="p"
              className="mx-auto mt-8 max-w-[600px] text-center font-sans text-[12px] leading-[1.6] text-white/40"
            >
              Case results depend on a variety of factors unique to each case. Case
              results do not guarantee or predict a similar result in any future case.
            </RevealBlock>

          </>
        )}

        <RevealBlock className="mt-12 flex justify-center lg:mt-14">
          <button
            className="group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-[#C6A04A] px-8 font-sans text-[15px] font-semibold uppercase tracking-[0.04em] text-[#0E1B2C] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#d4a94f] hover:shadow-[0_8px_24px_rgba(198,160,74,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A04A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1428] lg:h-[60px] lg:px-9"
            onClick={openIntakeModal}
            type="button"
          >
            Get Your Free Case Review
            <ArrowRight className="group-hover:translate-x-1" />
          </button>
        </RevealBlock>
      </div>
    </section>
  );
};
