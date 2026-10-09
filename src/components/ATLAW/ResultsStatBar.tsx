import { RevealBlock, Counter } from "../../motion/primitives";
import { VERIFIED_TOTALS, YEARS_SERVING } from "../../data/firm";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const statClass =
  "font-serifDisplay text-[clamp(38px,6vw,60px)] font-normal leading-none tracking-[-0.02em] text-white";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center px-4 text-center">
    <p className={statClass}>{value}</p>
    <p className="mt-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C6A04A]">
      {label}
    </p>
  </div>
);

/**
 * ResultsStatBar — firm-wide credibility metrics.
 * Lifetime totals (cases handled, total recovered) show only once VERIFIED_TOTALS
 * is set in data/firm.ts, and then carry the standard case-results disclaimer.
 * Until then the bar shows years of service plus approved recognitions.
 */
export const ResultsStatBar = (): JSX.Element => {
  return (
    <section
      aria-labelledby="results-stats-heading"
      className="relative isolate w-full overflow-hidden bg-[#0e1b33]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 py-10 sm:px-10 lg:py-14">
        <h2 id="results-stats-heading" className="sr-only">
          ATLAW results by the numbers
        </h2>

        <RevealBlock>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-white/10">
            {VERIFIED_TOTALS && (
              <>
                <Stat label="Cases Handled" value={VERIFIED_TOTALS.casesHandled} />
                <Stat label="Recovered for Clients" value={VERIFIED_TOTALS.recovered} />
              </>
            )}

            <div className="flex flex-col items-center px-4 text-center">
              <Counter as="p" className={statClass} duration={1.2} value={YEARS_SERVING} />
              <p className="mt-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C6A04A]">
                Years Serving Clients
              </p>
            </div>

            {/* Until the lifetime totals are verified, fill the bar with approved recognitions. */}
            {!VERIFIED_TOTALS && (
              <>
                <Stat label="Avvo Rating" value="10.0" />
                <Stat label="Super Lawyers Rising Star" value="3×" />
              </>
            )}
          </div>
        </RevealBlock>

        {VERIFIED_TOTALS && (
          <RevealBlock
            as="p"
            className="mx-auto mt-8 max-w-[760px] text-center font-sans text-[11px] leading-[1.6] text-white/35"
          >
            Case results depend on a variety of factors unique to each case. Case results do not
            guarantee or predict a similar result in any future case.
          </RevealBlock>
        )}
      </div>
    </section>
  );
};
