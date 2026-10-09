import { RevealText, RevealBlock } from "../../motion/primitives";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const headlineAxes = "'opsz' 144, 'wght' 380, 'SOFT' 0, 'WONK' 0";

const PhoneIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-[18px] w-[18px]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const MailIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-[18px] w-[18px]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect height="16" rx="2" width="20" x="2" y="4" strokeWidth={1.5} />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

export const FinalCtaSection = (): JSX.Element => {
  return (
    <section aria-labelledby="final-cta-heading" className="w-full">
      <div className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#0e1b33_0%,#0a1428_100%)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: grain }}
        />

        <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-6 py-14 text-center sm:px-10 md:py-16 lg:px-20 lg:py-20">
          <RevealText
            as="h2"
            className="font-serifDisplay font-normal leading-[1.06] tracking-[-0.02em] text-white text-[clamp(34px,5.5vw,64px)]"
            id="final-cta-heading"
            style={{ fontVariationSettings: headlineAxes }}
          >
            Get a FREE Case Evaluation Today!
          </RevealText>

          <RevealBlock
            as="p"
            className="mt-5 font-sans text-[17px] leading-[1.5] text-white/75 lg:text-[19px]"
          >
            You Pay Nothing Unless We Win Your Case.
          </RevealBlock>

          <RevealBlock className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              className="group inline-flex h-[60px] w-full max-w-[320px] items-center justify-center gap-2.5 rounded-full bg-[#C6A04A] px-8 font-sans text-[15px] font-semibold uppercase tracking-[0.04em] text-[#0B1F3A] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#d4b05e] hover:shadow-[0_8px_24px_rgba(198,160,74,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] sm:w-auto lg:h-[64px]"
              href="tel:+13134067606"
            >
              <PhoneIcon />
              CALL
            </a>
            <a
              className="group inline-flex h-[60px] w-full max-w-[320px] items-center justify-center gap-2.5 rounded-full border border-white/40 bg-transparent px-8 font-sans text-[15px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] sm:w-auto lg:h-[64px]"
              href="mailto:info@atlawgroup.com"
            >
              <MailIcon />
              EMAIL
            </a>
          </RevealBlock>
        </div>
      </div>

      <div className="w-full bg-[#081120]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-2 px-6 py-8 text-center sm:px-10 lg:py-10">
          <a
            className="font-serifDisplay font-normal leading-none tracking-[-0.02em] text-white transition-colors duration-200 hover:text-[#C6A04A] text-[clamp(28px,4.5vw,48px)]"
            href="tel:+13134067606"
            style={{ fontVariationSettings: headlineAxes }}
          >
            (313) 406-7606
          </a>
          <p className="font-sans text-[14px] tracking-[0.02em] text-white/55 lg:text-[15px]">
            We&rsquo;re here to help.
          </p>
        </div>
      </div>
    </section>
  );
};
