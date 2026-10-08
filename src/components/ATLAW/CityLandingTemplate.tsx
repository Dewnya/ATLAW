import { useState } from "react";
import { Link } from "react-router-dom";
import type { PracticeAreaPI } from "../../data/practice/pi/types";
import type { CityData } from "../../data/cities";
import { cities } from "../../data/cities";
import { practiceAreaBySlug } from "../../data/practice/pi";
import { openIntakeModal } from "./IntakeModal";
import { YEARS_SERVING } from "../../data/firm";
import { IntakeFormSection } from "./IntakeFormSection";

const GOLD = "#C9A24B";
const GOLD_ACCENT = "#B88A2D";
const GOLD_BRIGHT = "#C6A04A";
const INK = "#0B1F3A";
const STONE = "#3A4A63";
const NAVY_CANVAS = "linear-gradient(180deg, #0E1B33 0%, #0A1428 100%)";

const headlineAxes = "'opsz' 144, 'wght' 360, 'SOFT' 0, 'WONK' 0";
const subHeadAxes = "'opsz' 96, 'wght' 400, 'SOFT' 0, 'WONK' 0";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

const Grain = ({ opacity = "0.05" }: { opacity?: string }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{ backgroundImage: grain, opacity: Number(opacity) }}
  />
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={`h-[14px] w-[14px] transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

const PhoneIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect height="16" rx="2" width="20" x="2" y="4" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    style={{ color: GOLD_ACCENT }}
    viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
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

/* ─────────────────── 1. Hero ─────────────────── */

const Hero = ({ practice, city }: { practice: PracticeAreaPI; city: CityData }) => (
  <section
    aria-labelledby="city-hero-title"
    className="relative w-full overflow-hidden bg-white"
  >
    <Grain opacity="0.03" />
    <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-12 pt-16 sm:px-10 md:pb-16 md:pt-20 lg:px-16 lg:pb-20 lg:pt-24">
      <nav
        aria-label="Breadcrumb"
        className="pi-reveal mb-6 font-sans text-[11.5px] font-semibold uppercase leading-none tracking-[0.2em]"
      >
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1" style={{ color: STONE }}>
          <li><Link className="transition-colors hover:text-[#0B1F3A]" to="/">ATLAW</Link></li>
          <li aria-hidden="true" className="text-[#0B1F3A]/30">/</li>
          <li><Link className="transition-colors hover:text-[#0B1F3A]" to="/personal-injury">Personal Injury</Link></li>
          <li aria-hidden="true" className="text-[#0B1F3A]/30">/</li>
          <li><Link className="transition-colors hover:text-[#0B1F3A]" to={`/personal-injury/${practice.slug}`}>{practice.title}</Link></li>
          <li aria-hidden="true" className="text-[#0B1F3A]/30">/</li>
          <li><span aria-current="page" style={{ color: INK }}>{city.name}</span></li>
        </ol>
      </nav>

      <h1
        className="pi-reveal max-w-[820px] font-serifDisplay font-normal tracking-[-0.02em]"
        id="city-hero-title"
        style={{
          animationDelay: "120ms",
          fontSize: "clamp(36px, 6vw, 72px)",
          lineHeight: "1.05",
          fontVariationSettings: headlineAxes,
          color: INK,
        }}
      >
        {practice.title} Lawyer in {city.name}
        <span aria-hidden="true" style={{ color: GOLD }}>.</span>
      </h1>

      <p
        className="pi-reveal mt-4 font-sans text-[13px] font-semibold uppercase tracking-[0.16em]"
        style={{ animationDelay: "200ms", color: GOLD }}
      >
        Super Lawyers Rising Star &middot; Avvo 10.0
      </p>

      <p
        className="pi-reveal mt-5 max-w-[640px] font-sans text-[18px] leading-[1.6] md:text-[19px]"
        style={{ animationDelay: "260ms", color: STONE }}
      >
        {practice.tagline}
      </p>

      <button
        className="pi-reveal group mt-8 inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_8px_24px_rgba(14,27,44,0.3)] lg:h-[60px]"
        onClick={openIntakeModal}
        style={{ animationDelay: "340ms", backgroundColor: "#0E1B2C" }}
        type="button"
      >
        Start Your Free Case Review
        <ArrowRight className="group-hover:translate-x-1" />
      </button>

      <div
        className="pi-reveal relative mt-12 aspect-[16/7] w-full overflow-hidden rounded-[18px] md:mt-14"
        style={{ animationDelay: "420ms" }}
      >
        <img
          alt={`${city.name}, ${city.county}`}
          className="h-full w-full object-cover"
          loading="lazy"
          src={`/assets/cities/${city.slug}.avif`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[rgba(11,31,58,0.72)] via-[rgba(11,31,58,0.12)] to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-6 sm:p-8">
          <span aria-hidden="true" className="h-px w-10 shrink-0" style={{ backgroundColor: GOLD }} />
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[13px]">
            Serving {city.name} &amp; {city.county}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────── 2. Stats Bar ─────────────────── */

const StatsBar = ({ city }: { city: CityData }) => (
  <section aria-label="Firm credentials" className="w-full border-y border-[#0B1F3A]/8 bg-[#F7F7F5]">
    <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 sm:px-10 lg:gap-x-12 lg:px-16">
      {[
        `Serving Clients for ${YEARS_SERVING} Years`,
        `${city.county}`,
        "Super Lawyers Rising Star",
        "Avvo 10.0",
      ].map((item) => (
        <span
          className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] sm:text-[13px]"
          key={item}
          style={{ color: STONE }}
        >
          {item}
        </span>
      ))}
    </div>
  </section>
);

/* ─────────────────── 3. City Context + Sidebar CTA ─────────────────── */

const SidebarCTA = () => (
  <div
    className="rounded-[16px] px-7 py-8 text-white shadow-[0_12px_40px_rgba(14,27,51,0.3)] lg:px-8 lg:py-10"
    style={{ background: NAVY_CANVAS }}
  >
    <Grain opacity="0.04" />
    <h3
      className="relative font-serifDisplay text-[22px] font-normal leading-[1.2] tracking-[-0.01em] text-white lg:text-[24px]"
      style={{ fontVariationSettings: subHeadAxes }}
    >
      3 Ways to Start Your Case
    </h3>

    <div className="relative mt-7 flex flex-col gap-3">
      <a
        className="flex h-[50px] items-center justify-center gap-2.5 rounded-full font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0E1B2C] transition-all duration-200 hover:shadow-[0_6px_18px_rgba(198,160,74,0.35)]"
        href="tel:+13134067606"
        style={{ backgroundColor: GOLD_BRIGHT }}
      >
        <PhoneIcon />
        Call (313) 406-7606
      </a>

      <a
        className="flex h-[50px] items-center justify-center gap-2.5 rounded-full font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0E1B2C] transition-all duration-200 hover:shadow-[0_6px_18px_rgba(198,160,74,0.35)]"
        href="mailto:info@atlawgroup.com"
        style={{ backgroundColor: GOLD_BRIGHT }}
      >
        <MailIcon />
        Email Us
      </a>

      <button
        className="flex h-[50px] items-center justify-center gap-2.5 rounded-full font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0E1B2C] transition-all duration-200 hover:shadow-[0_6px_18px_rgba(198,160,74,0.35)]"
        onClick={openIntakeModal}
        style={{ backgroundColor: GOLD_BRIGHT }}
        type="button"
      >
        Free Case Review
      </button>
    </div>

    <p className="relative mt-5 text-center font-sans text-[12px] leading-[1.5] text-white/60">
      No fee unless we recover for you.
    </p>
  </div>
);

const CityContextSection = ({ practice, city }: { practice: PracticeAreaPI; city: CityData }) => (
  <section aria-labelledby="city-context-heading" className="relative w-full overflow-hidden bg-white">
    <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-12 px-6 pb-20 pt-16 sm:px-10 lg:flex-row lg:gap-16 lg:px-16 lg:pb-[120px] lg:pt-20">
      <div className="lg:basis-[62%]">
        <p className="flex items-center gap-3 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em]" style={{ color: INK }}>
          <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: GOLD_ACCENT }} />
          Why Choose ATLAW in {city.name}?
        </p>
        <h2
          className="mt-6 font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]"
          id="city-context-heading"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", fontVariationSettings: subHeadAxes, color: INK }}
        >
          Why Choose ATLAW in {city.name}
          <span style={{ color: GOLD }}>?</span>
        </h2>

        <div className="mt-8 space-y-5">
          {city.localContext.map((p, i) => (
            <p className="font-sans text-[17px] leading-[1.7] lg:text-[18px]" key={i} style={{ color: STONE }}>
              {p}
            </p>
          ))}
        </div>

        <button
          className="group mt-8 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full px-8 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(14,27,44,0.3)]"
          onClick={openIntakeModal}
          style={{ backgroundColor: "#0E1B2C" }}
          type="button"
        >
          Contact Us About Your {practice.title} Case
          <ArrowRight className="group-hover:translate-x-1" />
        </button>
      </div>

      <div className="lg:hidden">
        <SidebarCTA />
      </div>

      <div className="hidden lg:block lg:basis-[35%]">
        <div className="sticky top-[100px]">
          <SidebarCTA />
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────── 4. Practice Area Overview ─────────────────── */

const PracticeOverviewSection = ({ practice, city }: { practice: PracticeAreaPI; city: CityData }) => (
  <section aria-labelledby="city-practice-heading" className="relative w-full overflow-hidden bg-[#F7F7F5]">
    <Grain opacity="0.03" />
    <div className="relative mx-auto w-full max-w-[820px] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
      <p className="mb-5 flex items-center gap-3 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em]" style={{ color: INK }}>
        <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: GOLD_ACCENT }} />
        {practice.title} in {city.name}
      </p>
      <h2
        className="font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]"
        id="city-practice-heading"
        style={{ fontSize: "clamp(24px, 3.4vw, 36px)", fontVariationSettings: subHeadAxes, color: INK }}
      >
        Understanding {practice.title} Claims in {city.name}
      </h2>
      <div className="mt-5 space-y-5">
        {practice.overview.map((p, i) => (
          <p className="font-sans text-[17px] leading-[1.7] lg:text-[18px]" key={i} style={{ color: STONE }}>
            {p}
          </p>
        ))}
      </div>

      {practice.michiganLaw.length > 0 && (
        <div className="mt-10">
          <h3
            className="font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", fontVariationSettings: subHeadAxes, color: INK }}
          >
            {practice.michiganLaw[0].heading}
          </h3>
          <div className="mt-4 space-y-4">
            {practice.michiganLaw[0].paragraphs.map((p, i) => (
              <p className="font-sans text-[16px] leading-[1.7] lg:text-[17px]" key={i} style={{ color: STONE }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      <button
        className="group mt-10 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full px-8 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(14,27,44,0.3)]"
        onClick={openIntakeModal}
        style={{ backgroundColor: "#0E1B2C" }}
        type="button"
      >
        Get a Free Case Review
        <ArrowRight className="group-hover:translate-x-1" />
      </button>
    </div>
  </section>
);

/* ─────────────────── 5. Local Expertise ─────────────────── */

const LocalExpertiseSection = ({ city }: { city: CityData }) => (
  <section aria-labelledby="city-expertise-heading" className="relative w-full overflow-hidden bg-white">
    <Grain opacity="0.03" />
    <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
      <h2
        className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
        id="city-expertise-heading"
        style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontVariationSettings: headlineAxes, color: INK }}
      >
        Serving {city.name} Injury Victims<span style={{ color: GOLD_ACCENT }}>.</span>
      </h2>

      <div className="mx-auto mt-10 grid max-w-[960px] grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:gap-5">
        {city.localExpertise.map((item, i) => (
          <div className="flex items-start gap-4 rounded-[12px] border border-[#0B1F3A]/6 bg-[#F7F7F5] px-6 py-5" key={i}>
            <span
              aria-hidden="true"
              className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full"
              style={{ backgroundColor: GOLD_ACCENT }}
            />
            <p className="font-sans text-[15px] leading-[1.6] lg:text-[16px]" style={{ color: STONE }}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────── 6. Case Results ─────────────────── */

const CaseResultsSection = ({ practice }: { practice: PracticeAreaPI }) => {
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, practice.caseResults.length - 3);

  // Firm-approved results only; the section stays hidden until there are some.
  if (practice.caseResults.length === 0) return null;

  return (
    <section
      aria-labelledby="city-results-heading"
      className="relative isolate w-full overflow-hidden"
      style={{ background: NAVY_CANVAS }}
    >
      <Grain opacity="0.05" />
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2
          className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-white"
          id="city-results-heading"
          style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontVariationSettings: headlineAxes }}
        >
          Insurance companies fight to pay less. ATLAW fights for{" "}
          <span className="relative inline-block">
            what you deserve
            <span aria-hidden="true" className="absolute bottom-[2px] left-0 h-[3px] w-full rounded-full" style={{ backgroundColor: GOLD_BRIGHT }} />
          </span>
          <span style={{ color: GOLD_ACCENT }}>.</span>
        </h2>

        <div className="relative mt-12 md:mt-14">
          {practice.caseResults.length > 3 && (
            <div className="absolute -left-2 -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-between lg:flex">
              <button
                aria-label="Previous results"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-white hover:bg-white/10 disabled:opacity-30"
                disabled={start === 0}
                onClick={() => setStart((s) => Math.max(0, s - 1))}
                type="button"
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next results"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-white hover:bg-white/10 disabled:opacity-30"
                disabled={start >= maxStart}
                onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
                type="button"
              >
                <ChevronRight />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
            {practice.caseResults.slice(start, start + 3).map((r) => (
              <article
                className="flex flex-col items-center rounded-[16px] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-sm transition-all duration-[250ms] hover:-translate-y-[2px] hover:bg-white/10 sm:px-8"
                key={r.name}
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full" style={{ backgroundColor: GOLD_BRIGHT }}>
                  <span className="font-sans text-[14px] font-bold text-[#0E1B2C]">{r.initials}</span>
                </div>
                <p className="mt-3 font-sans text-[14px] font-semibold text-white">{r.name}</p>

                <div className="mt-5 flex flex-col items-center gap-0.5">
                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">Insurance Offer</p>
                  <p className="font-serifDisplay text-[18px] leading-none text-white/45 line-through decoration-[#B88A2D]/40 decoration-[1.5px]">
                    ${fmt(r.insuranceOffer)}
                  </p>
                </div>

                <span aria-hidden="true" className="mt-4 flex w-full max-w-[60px] items-center gap-1.5">
                  <span className="h-px flex-1 bg-gradient-to-l from-[#B88A2D]/35 to-transparent" />
                  <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: GOLD_ACCENT }} />
                  <span className="h-px flex-1 bg-gradient-to-r from-[#B88A2D]/35 to-transparent" />
                </span>

                <div className="mt-4 flex flex-col items-center gap-1">
                  <p
                    className="font-serifDisplay font-normal leading-none tracking-[-0.02em] text-white"
                    style={{ fontSize: "clamp(26px, 3vw, 36px)", fontVariationSettings: subHeadAxes }}
                  >
                    ${fmt(r.recovered)}
                  </p>
                </div>

                <p
                  className="mt-4 rounded-full px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ backgroundColor: "rgba(198,160,74,0.15)", color: GOLD_BRIGHT }}
                >
                  {r.caseType}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[600px] text-center font-sans text-[12px] leading-[1.6] text-white/45">
          Case results depend on a variety of factors unique to each case. Case
          results do not guarantee or predict a similar result in any future case.
        </p>
      </div>
    </section>
  );
};

/* ─────────────────── 7. FAQ (City-Specific) ─────────────────── */

const AccordionItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#0B1F3A]/10">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-150 hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A2D]/60 focus-visible:ring-offset-2"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="font-serifDisplay text-[17px] leading-[1.4] tracking-[-0.01em] lg:text-[19px]" style={{ color: INK }}>
          {faq.question}
        </span>
        <Chevron open={open} />
      </button>
      <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 font-sans text-[15px] leading-[1.7] lg:text-[16px]" style={{ color: STONE }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const CityFAQSection = ({ city }: { city: CityData }) => (
  <section aria-labelledby="city-faq-heading" className="relative w-full overflow-hidden bg-white">
    <Grain opacity="0.03" />
    <div className="relative mx-auto w-full max-w-[820px] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
      <h2
        className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
        id="city-faq-heading"
        style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontVariationSettings: headlineAxes, color: INK }}
      >
        Frequently Asked Questions<span style={{ color: GOLD_ACCENT }}>.</span>
      </h2>

      <div className="mt-10 border-t border-[#0B1F3A]/10 lg:mt-12">
        {city.faqs.map((faq) => (
          <AccordionItem faq={faq} key={faq.question} />
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────── 8. Other Practice Areas in [City] ─────────────────── */

const OtherPracticeAreasSection = ({ practice, city }: { practice: PracticeAreaPI; city: CityData }) => {
  const otherAreas = Object.entries(practiceAreaBySlug).filter(
    ([slug]) => slug !== practice.slug && slug !== "personal-injury"
  );

  return (
    <section aria-labelledby="city-other-practices-heading" className="relative w-full overflow-hidden bg-[#F7F7F5]">
      <Grain opacity="0.03" />
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2
          className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
          id="city-other-practices-heading"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontVariationSettings: headlineAxes, color: INK }}
        >
          Also Serving {city.name} For<span style={{ color: GOLD_ACCENT }}>:</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {otherAreas.map(([slug, area]) => (
            <Link
              className="group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-[16px] px-7 pb-6 pt-14 shadow-[0_6px_24px_rgba(5,15,28,0.12)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_14px_36px_rgba(5,15,28,0.2)]"
              key={slug}
              style={{ background: NAVY_CANVAS }}
              to={`/personal-injury/${slug}/${city.slug}`}
            >
              <Grain opacity="0.05" />
              <h3
                className="relative font-serifDisplay text-[20px] font-normal leading-[1.15] tracking-[-0.01em] text-white lg:text-[22px]"
                style={{ fontVariationSettings: subHeadAxes }}
              >
                {area.title} in {city.name}
              </h3>
              <span className="relative mt-2.5 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium transition-colors group-hover:text-white" style={{ color: GOLD_BRIGHT }}>
                Learn More
                <ArrowRight className="group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── 9. Other Cities We Serve ─────────────────── */

const OtherCitiesSection = ({ practice, city }: { practice: PracticeAreaPI; city: CityData }) => {
  const otherCities = cities.filter((c) => c.slug !== city.slug);

  return (
    <section aria-labelledby="city-other-cities-heading" className="relative w-full overflow-hidden bg-white">
      <Grain opacity="0.03" />
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2
          className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
          id="city-other-cities-heading"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontVariationSettings: headlineAxes, color: INK }}
        >
          {practice.title} — Other Cities We Serve<span style={{ color: GOLD_ACCENT }}>.</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:mt-12 lg:gap-4">
          {otherCities.map((c) => (
            <Link
              className="rounded-full border border-[#0B1F3A]/12 bg-[#F7F7F5] px-5 py-2.5 font-sans text-[14px] font-medium transition-all duration-200 hover:border-[#B88A2D] hover:shadow-sm lg:text-[15px]"
              key={c.slug}
              style={{ color: INK }}
              to={`/personal-injury/${practice.slug}/${c.slug}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── 10. Final Band ─────────────────── */

const FinalCTABand = () => (
  <section aria-labelledby="city-final-cta" className="w-full">
    <div className="relative isolate overflow-hidden text-white" style={{ background: NAVY_CANVAS }}>
      <Grain opacity="0.06" />
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-6 py-12 text-center sm:px-10 md:py-16 lg:py-20">
        <h2
          className="font-serifDisplay font-normal leading-[1.06] tracking-[-0.02em] text-white"
          id="city-final-cta"
          style={{ fontSize: "clamp(30px, 5vw, 56px)", fontVariationSettings: headlineAxes }}
        >
          Get a FREE Case Evaluation Today!
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-[1.5] text-white/75 lg:text-[18px]">
          You Pay Nothing Unless We Win Your Case.
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <a
            className="inline-flex h-[56px] w-full max-w-[280px] items-center justify-center gap-2.5 rounded-full px-8 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-[#0B1F3A] transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(198,160,74,0.35)] sm:w-auto lg:h-[60px]"
            href="tel:+13134067606"
            style={{ backgroundColor: GOLD_BRIGHT }}
          >
            <PhoneIcon /> CALL
          </a>
          <a
            className="inline-flex h-[56px] w-full max-w-[280px] items-center justify-center gap-2.5 rounded-full border border-white/40 bg-transparent px-8 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] hover:border-white hover:bg-white/10 sm:w-auto lg:h-[60px]"
            href="mailto:info@atlawgroup.com"
          >
            <MailIcon /> EMAIL
          </a>
        </div>
      </div>
    </div>
    <div className="w-full bg-[#081120]">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-1.5 px-6 py-7 text-center sm:px-10">
        <a
          className="font-serifDisplay font-normal leading-none tracking-[-0.02em] text-white transition-colors duration-200 hover:text-[#C6A04A] text-[clamp(24px, 4vw, 42px)]"
          href="tel:+13134067606"
          style={{ fontVariationSettings: headlineAxes }}
        >
          (313) 406-7606
        </a>
        <p className="font-sans text-[13px] tracking-[0.02em] text-white/55">We&rsquo;re here to help.</p>
      </div>
    </div>
  </section>
);

/* ─────────────────── Main Template ─────────────────── */

export const CityLandingTemplate = ({
  practice,
  city,
}: {
  practice: PracticeAreaPI;
  city: CityData;
}): JSX.Element => (
  <>
    <Hero practice={practice} city={city} />
    <StatsBar city={city} />
    <CityContextSection practice={practice} city={city} />
    <PracticeOverviewSection practice={practice} city={city} />
    <LocalExpertiseSection city={city} />
    <CaseResultsSection practice={practice} />
    <CityFAQSection city={city} />
    <OtherPracticeAreasSection practice={practice} city={city} />
    <OtherCitiesSection practice={practice} city={city} />
    <IntakeFormSection />
    <FinalCTABand />
  </>
);
