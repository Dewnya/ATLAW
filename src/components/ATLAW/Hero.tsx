import { openIntakeModal } from "./IntakeModal";
import { YEARS_SERVING } from "../../data/firm";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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

export const Hero = (): JSX.Element => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0e1b33] lg:h-[clamp(620px,82vh,820px)]">
      <img
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center"
        decoding="async"
        fetchPriority="high"
        src="/assets/office/office-reception-desk.avif"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(10,20,40,0.92)] via-[rgba(14,27,51,0.82)] to-[rgba(14,27,51,0.55)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />

      <div className="relative flex w-full flex-col lg:h-full lg:flex-row">
        <div className="relative z-20 flex flex-col justify-center px-6 pb-14 pt-12 sm:px-10 lg:basis-[55%] lg:max-w-[55%] lg:pb-[clamp(32px,4vh,64px)] lg:pl-[clamp(48px,7vw,160px)] lg:pr-[clamp(24px,3vw,72px)] lg:pt-[clamp(48px,6vh,96px)]">
          <p className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-[72px] shrink-0 bg-[#C6A04A]" />
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.24em] text-[rgba(255,255,255,0.7)]">
              Dearborn Personal Injury Attorneys
            </span>
          </p>

          <h1
            className="mt-8 font-serifDisplay leading-[0.92] tracking-[-0.02em] text-white lg:mt-10"
            style={{ fontVariationSettings: headlineAxes }}
          >
            <span
              className="hero-rise block text-[clamp(46px,12vw,68px)] lg:text-[clamp(72px,6.4vw,104px)]"
              style={{ animationDelay: "0ms" }}
            >
              If it&rsquo;s law,
            </span>
            <span
              className="hero-rise block text-[clamp(56px,16vw,84px)] lg:whitespace-nowrap lg:text-[clamp(96px,8.4vw,140px)]"
              style={{ animationDelay: "80ms" }}
            >
              it&rsquo;s ATLAW
              <span
                aria-hidden="true"
                className="ml-[0.04em] inline-block h-[0.14em] w-[0.14em] translate-y-[0.02em] rounded-full bg-[#C6A04A] align-baseline"
              />
            </span>
          </h1>

          <p
            className="hero-rise mt-4 font-serifDisplay text-[clamp(18px,2.5vw,24px)] leading-[1.4] tracking-[-0.005em] text-[rgba(255,255,255,0.85)]"
            style={{ animationDelay: "160ms", fontVariationSettings: "'opsz' 36, 'wght' 400" }}
          >
            You focus on healing. We focus on fighting for you.
          </p>

          <div className="hero-fade" style={{ animationDelay: "800ms" }}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-9">
              <button
                className="group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-[#C6A04A] px-8 font-sans text-[15px] font-semibold uppercase tracking-[0.04em] text-[#0E1B2C] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#d4a94f] hover:shadow-[0_8px_24px_rgba(198,160,74,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A04A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1b33] lg:h-[60px] lg:px-9"
                onClick={openIntakeModal}
                type="button"
              >
                Start Your Free Case Review
                <ArrowRight className="group-hover:translate-x-1" />
              </button>
            </div>

            <p className="mt-6 flex items-center gap-2.5 font-sans text-[14px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.55)] lg:mt-7 lg:text-[15px]">
              <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#C6A04A]" />
              No fees unless we win
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 items-end justify-center lg:basis-[45%]">
          <img
            alt="Dewnya Bazzi, ATLAW founder and CEO"
            className="hero-fade block h-auto w-[92vw] max-w-[460px] object-contain object-bottom lg:absolute lg:bottom-0 lg:right-[clamp(16px,2vw,48px)] lg:top-auto lg:h-full lg:max-h-full lg:w-auto lg:max-w-[46vw]"
            decoding="async"
            fetchPriority="high"
            height={941}
            src="/assets/hero/dewnya-founder-cutout.avif"
            style={{ animationDelay: "200ms", animationDuration: "1000ms" }}
            width={1037}
          />
        </div>
      </div>

      <div className="hero-fade relative z-20 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(10,20,40,0.5)]" style={{ animationDelay: "1000ms" }}>
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 sm:px-10 lg:gap-x-12 lg:px-20">
          <div className="flex flex-col items-center">
            <span className="font-serifDisplay text-[28px] font-normal leading-none tracking-[-0.02em] text-white sm:text-[32px]">
              {YEARS_SERVING}
            </span>
            <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-[10px]">
              Years Serving Clients
            </span>
          </div>

          <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 sm:block" />

          <div className="flex flex-col items-center">
            <span className="font-serifDisplay text-[28px] font-normal leading-none tracking-[-0.02em] text-[#C6A04A] sm:text-[32px]">
              10.0
            </span>
            <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-[10px]">
              Avvo Rating
            </span>
          </div>

          <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 sm:block" />

          <div className="flex flex-col items-center">
            <span className="font-serifDisplay text-[28px] font-normal leading-none tracking-[-0.02em] text-white sm:text-[32px]">
              3<span className="text-[20px] text-white/60 sm:text-[22px]">×</span>
            </span>
            <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-[10px]">
              Super Lawyers
            </span>
          </div>

          <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 sm:block" />

          <div className="flex flex-col items-center">
            <span className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#C6A04A] sm:text-[13px]">
              Top 10
            </span>
            <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-[10px]">
              Under 40
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
