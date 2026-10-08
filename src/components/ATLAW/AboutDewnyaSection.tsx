import { useState } from "react";
import { Link } from "react-router-dom";
import { RevealText, RevealBlock, RevealStagger, RevealImage, DrawRule } from "../../motion/primitives";
import { STAGGER } from "../../motion/config";
import { YEARS_SERVING } from "../../data/firm";

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

const stats = [
  { label: "Serving Clients", value: `${YEARS_SERVING} Years` },
  { label: "Location", value: "Dearborn, MI" },
  { label: "Recognition", value: "Super Lawyers Rising Star" },
  { label: "Rating", value: "Avvo 10.0" },
];

export const AboutDewnyaSection = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      aria-labelledby="about-dewnya-heading"
      className="relative isolate w-full overflow-hidden bg-[#FFFFFF] text-[#0B1F3A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: grain }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.05]"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#0B1F3A" strokeWidth="1">
            <path d="M-50 120 Q 420 -10 900 130 T 1520 90" />
            <path d="M-50 250 Q 480 110 980 250 T 1520 210" />
          </g>
        </svg>

        <span className="absolute -bottom-[6vw] left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-serifDisplay text-[30vw] font-normal uppercase leading-none tracking-[-0.05em] text-[#0B1F3A] opacity-[0.02] md:block">
          ATLAW
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-20 sm:px-10 md:pb-24 md:pt-28 lg:px-20 lg:pb-[120px] lg:pt-[150px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,55%)_minmax(0,45%)] lg:gap-16 xl:gap-20">
          <div>
            <RevealBlock as="p" className="flex items-center gap-3.5">
              <span aria-hidden="true" className="h-px w-[44px] shrink-0 bg-[#B88A2D]" />
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7466]">
                05 &mdash; About the Founder
              </span>
            </RevealBlock>

            <RevealText
              as="h2"
              className="mt-6 font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-[#0B1F3A] text-[clamp(42px,5vw,78px)]"
              id="about-dewnya-heading"
              style={{ fontVariationSettings: headlineAxes }}
            >
              Dewnya Bazzi<span className="text-[#B88A2D]">.</span>
            </RevealText>

            <RevealBlock
              as="p"
              className="mt-3 font-sans text-[15px] font-semibold uppercase tracking-[0.18em] text-[#C6A04A]"
            >
              Founder &amp; CEO
            </RevealBlock>

            <DrawRule className="mt-9 block h-px w-[56px] bg-[#B88A2D]" />

            <RevealStagger className="mt-10 max-w-[610px] space-y-7">
              <p
                className="font-serifDisplay text-[18px] leading-[1.7] tracking-[-0.005em] text-[#3A4A63] lg:text-[19px]"
                style={{ fontVariationSettings: "'opsz' 24, 'wght' 400" }}
              >
                When you&rsquo;re injured, everything changes overnight. The bills pile up, the
                insurance company starts calling, and suddenly you&rsquo;re expected to navigate a
                legal system you never asked to be part of. That&rsquo;s why Dewnya Bazzi built
                ATLAW &mdash; so no one has to fight that battle alone.
              </p>
              <p
                className="font-serifDisplay text-[18px] leading-[1.7] tracking-[-0.005em] text-[#3A4A63] lg:text-[19px]"
                style={{ fontVariationSettings: "'opsz' 24, 'wght' 400" }}
              >
                Dewnya founded the firm in Dearborn with a simple promise: every client
                deserves the kind of attention and care that most firms reserve for their biggest
                cases. She calls it &ldquo;unreasonable hospitality&rdquo; &mdash; going further
                than anyone expects, because the people we represent deserve nothing less.
              </p>

              {expanded && (
                <>
                  <p
                    className="font-serifDisplay text-[18px] leading-[1.7] tracking-[-0.005em] text-[#3A4A63] lg:text-[19px]"
                    style={{ fontVariationSettings: "'opsz' 24, 'wght' 400" }}
                  >
                    She still personally leads ATLAW&rsquo;s personal injury practice, fighting
                    insurance carriers who lowball injury victims and holding negligent parties
                    accountable. Her track record has earned her the Super Lawyers Rising Star
                    distinction three consecutive years, a perfect 10.0 Avvo rating, and a spot
                    on the National Academy of Personal Injury Attorneys&rsquo; Top 10 Under 40
                    list.
                  </p>
                  <p
                    className="font-serifDisplay text-[18px] leading-[1.7] tracking-[-0.005em] text-[#3A4A63] lg:text-[19px]"
                    style={{ fontVariationSettings: "'opsz' 24, 'wght' 400" }}
                  >
                    But what matters most to Dewnya isn&rsquo;t the recognition &mdash;
                    it&rsquo;s the phone call from a client who can finally focus on healing
                    because we handled everything else. That&rsquo;s the work she built this firm
                    to do.
                  </p>
                </>
              )}

              <button
                className="inline-flex items-center gap-2 font-sans text-[14px] font-medium text-[#B88A2D] transition-colors duration-150 hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A2D]/60 focus-visible:ring-offset-2"
                onClick={() => setExpanded(!expanded)}
                type="button"
              >
                {expanded ? "See Less" : "See More"}
                <svg
                  aria-hidden="true"
                  className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </button>
            </RevealStagger>

            <RevealBlock className="mt-10">
              <Link
                className="group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-[#0E1B2C] px-8 font-sans text-[15px] font-medium text-white transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#16263B] hover:shadow-[0_8px_24px_rgba(14,27,44,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A04A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] lg:h-[60px] lg:px-9"
                to="/about"
              >
                MEET DEWNYA
                <ArrowRight className="group-hover:translate-x-1" />
              </Link>
            </RevealBlock>
          </div>

          <div className="relative flex items-start justify-center lg:sticky lg:top-[120px]">
            <RevealImage
              alt="Dewnya Bazzi, ATLAW founder and CEO"
              className="h-auto w-full rounded-[24px] object-cover object-top"
              src="/assets/dewnya/dewnya-seated-desk.avif"
              wrapperClassName="w-full overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(11,31,58,0.12)]"
            />
          </div>
        </div>

        <RevealStagger
          amount={STAGGER.grid}
          className="mt-16 grid grid-cols-1 gap-6 border-t border-[rgba(11,31,58,0.08)] pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8 lg:pt-14"
        >
          {stats.map((stat, index) => (
            <div
              className={`relative flex flex-col items-center text-center ${
                index > 0 ? "lg:border-l lg:border-[rgba(11,31,58,0.08)]" : ""
              }`}
              key={stat.label}
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 hidden h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B88A2D] lg:block"
                />
              )}
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A7466]">
                {stat.label}
              </p>
              <p className="mt-2 font-serifDisplay text-[17px] font-normal leading-[1.3] tracking-[-0.01em] text-[#0B1F3A]">
                {stat.value}
              </p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
};
