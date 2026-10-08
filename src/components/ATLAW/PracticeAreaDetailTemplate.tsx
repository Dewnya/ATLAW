import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { PracticeAreaPI } from "../../data/practice/pi/types";
import { openIntakeModal } from "./IntakeModal";
import { TestimonialsSection } from "./TestimonialsSection";
import { IntakeFormSection } from "./IntakeFormSection";
import { ProcessSection } from "./ProcessSection";
import { practiceAreaBySlug } from "../../data/practice/pi";

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

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 shrink-0 text-[${GOLD_ACCENT}] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
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

/* ─────────────────── 1. Sticky Sub-Nav Bar ─────────────────── */

const TABS = [
  { id: "overview", label: "OVERVIEW" },
  { id: "what-to-do", label: "WHAT TO DO" },
  { id: "testimonials", label: "TESTIMONIALS" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "RELATED" },
];

const StickySubNav = () => {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-0 z-30 w-full border-b border-white/10"
      style={{ background: NAVY_CANVAS }}
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-center gap-1 overflow-x-auto px-4 sm:gap-2 md:gap-6 lg:gap-8 lg:px-16">
        {TABS.map((tab) => (
          <button
            className={`relative whitespace-nowrap px-3 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 sm:text-[12px] md:px-4 ${
              active === tab.id ? "text-white" : "text-white/55 hover:text-white/80"
            }`}
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            type="button"
          >
            {tab.label}
            {active === tab.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: GOLD }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

/* ─────────────────── 2. Hero ─────────────────── */

const Hero = ({ data }: { data: PracticeAreaPI }) => (
  <section
    aria-labelledby="pa-hero-title"
    className="relative w-full overflow-hidden bg-white"
    id="overview"
    style={{ scrollMarginTop: "48px" }}
  >
    <Grain opacity="0.03" />

    <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-6 pb-12 pt-16 sm:px-10 md:pb-16 md:pt-20 lg:flex-row lg:items-center lg:gap-14 lg:px-16 lg:pb-20 lg:pt-24">
      <div className={data.heroImage ? "lg:basis-[56%]" : "w-full"}>
      <nav
        aria-label="Breadcrumb"
        className="pi-reveal mb-6 font-sans text-[11.5px] font-semibold uppercase leading-none tracking-[0.2em]"
      >
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1" style={{ color: STONE }}>
          <li><Link className="transition-colors hover:text-[#0B1F3A]" to="/">ATLAW</Link></li>
          <li aria-hidden="true" className="text-[#0B1F3A]/30">/</li>
          <li><Link className="transition-colors hover:text-[#0B1F3A]" to="/personal-injury">Personal Injury</Link></li>
          <li aria-hidden="true" className="text-[#0B1F3A]/30">/</li>
          <li><span aria-current="page" style={{ color: INK }}>{data.title}</span></li>
        </ol>
      </nav>

      <h1
        className="pi-reveal max-w-[820px] font-serifDisplay font-normal tracking-[-0.02em]"
        id="pa-hero-title"
        style={{
          animationDelay: "120ms",
          fontSize: "clamp(36px, 6vw, 72px)",
          lineHeight: "1.05",
          fontVariationSettings: headlineAxes,
          color: INK,
        }}
      >
        {data.heroTitle}
        <span aria-hidden="true" style={{ color: GOLD }}>.</span>
      </h1>

      <p
        className="pi-reveal mt-4 font-sans text-[13px] font-semibold uppercase tracking-[0.16em]"
        style={{ animationDelay: "200ms", color: GOLD }}
      >
        Super Lawyers Rising Star &middot; 3 Consecutive Years
      </p>

      <p
        className="pi-reveal mt-5 max-w-[640px] font-sans text-[18px] leading-[1.6] md:text-[19px]"
        style={{ animationDelay: "260ms", color: STONE }}
      >
        {data.tagline}
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
      </div>

      {data.heroImage && (
        <div className="pi-reveal lg:basis-[44%]" style={{ animationDelay: "200ms" }}>
          <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-0">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[24px] bg-[radial-gradient(circle_at_70%_30%,rgba(198,160,74,0.18),transparent_70%)] blur-xl"
            />
            <div className="relative overflow-hidden rounded-[20px] border border-[#0B1F3A]/10 shadow-[0_20px_50px_rgba(11,31,58,0.18)]">
              <img
                alt={data.heroImageAlt ?? `${data.title} representation at ATLAW`}
                className="aspect-[16/10] w-full object-cover object-center"
                src={data.heroImage}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,31,58,0.26)] via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
);

/* ─────────────────── 3. Overview (Two-Column) ─────────────────── */

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

const OverviewSection = ({ data }: { data: PracticeAreaPI }) => (
  <section
    aria-labelledby="pa-overview-heading"
    className="relative w-full overflow-hidden bg-white"
  >
    <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-12 px-6 pb-20 pt-16 sm:px-10 lg:flex-row lg:gap-16 lg:px-16 lg:pb-[120px] lg:pt-20">
      <div className="lg:basis-[62%]">
        <p className="flex items-center gap-3 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em]" style={{ color: INK }}>
          <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: GOLD_ACCENT }} />
          Why Choose ATLAW?
        </p>
        <h2
          className="mt-6 font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]"
          id="pa-overview-heading"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", fontVariationSettings: subHeadAxes, color: INK }}
        >
          Why Choose ATLAW
          <span style={{ color: GOLD }}>?</span>
        </h2>

        <div className="mt-8 space-y-5">
          {data.whyChooseUs.map((p, i) => (
            <p className="font-sans text-[17px] leading-[1.7] lg:text-[18px]" key={i} style={{ color: STONE }}>
              {p}
            </p>
          ))}
          <p className="font-sans text-[17px] font-semibold leading-[1.7] lg:text-[18px]" style={{ color: INK }}>
            No fee unless we recover for you.
          </p>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <SidebarCTA />
      </div>

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block lg:basis-[35%]">
        <div className="sticky top-[100px]">
          <SidebarCTA />
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────── 4. Case Results Comparison ─────────────────── */

const CaseResultsComparison = ({ data }: { data: PracticeAreaPI }) => {
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, data.caseResults.length - 3);

  // Firm-approved results only; the section stays hidden until there are some.
  if (data.caseResults.length === 0) return null;

  return (
    <section
      aria-labelledby="pa-results-heading"
      className="relative isolate w-full overflow-hidden"
      style={{ background: NAVY_CANVAS }}
    >
      <Grain opacity="0.05" />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2
          className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-white"
          id="pa-results-heading"
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
          {data.caseResults.length > 3 && (
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
            {data.caseResults.slice(start, start + 3).map((r) => (
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

/* ─────────────────── 5. What to Do (Steps) + No Fee Banner ─────────────────── */

const WhatToDoSection = () => (
  <>
    <div id="what-to-do" style={{ scrollMarginTop: "48px" }}>
      <ProcessSection />
    </div>

    {/* No Fee Banner */}
    <section aria-labelledby="pa-nofee-heading" className="w-full" style={{ background: NAVY_CANVAS }}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-10 text-center sm:px-10 md:py-12">
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[14px]">
          No Fees. No Risk.
        </p>
        <span aria-hidden="true" className="mt-3 block h-px w-10" style={{ backgroundColor: GOLD_ACCENT }} />
        <h2 className="mt-3 font-sans font-bold uppercase tracking-[0.08em] text-white text-[clamp(20px,4vw,36px)]" id="pa-nofee-heading">
          You Only Pay When We Win
        </h2>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
          <a
            className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full border border-white/40 px-7 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            href="tel:+13134067606"
          >
            <PhoneIcon /> Call
          </a>
          <a
            className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full border border-white/40 px-7 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            href="mailto:info@atlawgroup.com"
          >
            <MailIcon /> Email
          </a>
        </div>
      </div>
    </section>
  </>
);

/* ─────────────────── 6. Long-Form Content ─────────────────── */

const LongFormContent = ({ data }: { data: PracticeAreaPI }) => (
  <section aria-labelledby="pa-law-heading" className="relative w-full overflow-hidden bg-white">
    <Grain opacity="0.03" />
    <div className="relative mx-auto w-full max-w-[820px] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
      {data.michiganLaw.map((section, si) => (
        <article className={si > 0 ? "mt-14 lg:mt-16" : ""} key={si}>
          {si === 0 && (
            <p className="mb-5 flex items-center gap-3 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em]" style={{ color: INK }}>
              <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: GOLD_ACCENT }} />
              Michigan Law
            </p>
          )}
          <h2
            className="font-serifDisplay font-normal leading-[1.12] tracking-[-0.02em]"
            id={si === 0 ? "pa-law-heading" : undefined}
            style={{ fontSize: "clamp(24px, 3.4vw, 36px)", fontVariationSettings: subHeadAxes, color: INK }}
          >
            {section.heading}
          </h2>
          <div className="mt-5 space-y-5">
            {section.paragraphs.map((p, pi) => (
              <p className="font-sans text-[17px] leading-[1.7] lg:text-[18px]" key={pi} style={{ color: STONE }}>
                {p}
              </p>
            ))}
          </div>
        </article>
      ))}

      <button
        className="group mt-10 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full px-8 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(14,27,44,0.3)] lg:mt-12"
        onClick={openIntakeModal}
        style={{ backgroundColor: "#0E1B2C" }}
        type="button"
      >
        Contact Us Today
        <ArrowRight className="group-hover:translate-x-1" />
      </button>
    </div>
  </section>
);

/* ─────────────────── 8. FAQ Accordion ─────────────────── */

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

const FAQSection = ({ data }: { data: PracticeAreaPI }) => (
  <section
    aria-labelledby="pa-faq-heading"
    className="relative w-full overflow-hidden bg-white"
    id="faq"
    style={{ scrollMarginTop: "48px" }}
  >
    <Grain opacity="0.03" />

    <div className="relative mx-auto w-full max-w-[820px] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
      <h2
        className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
        id="pa-faq-heading"
        style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontVariationSettings: headlineAxes, color: INK }}
      >
        Frequently Asked Questions<span style={{ color: GOLD_ACCENT }}>.</span>
      </h2>

      <div className="mt-10 border-t border-[#0B1F3A]/10 lg:mt-12">
        {data.faqs.map((faq) => (
          <AccordionItem faq={faq} key={faq.question} />
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────── 9. Related Cases Strip ─────────────────── */

const RelatedCasesStrip = ({ data }: { data: PracticeAreaPI }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 512, behavior: "smooth" });
  };

  if (!data.relatedCases.length) return null;

  return (
    <section aria-labelledby="pa-related-cases-heading" className="relative w-full overflow-hidden" style={{ background: NAVY_CANVAS }}>
      <Grain opacity="0.05" />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 md:py-16 lg:px-16">
        <div className="flex items-center justify-between">
          <h2
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white/70"
            id="pa-related-cases-heading"
          >
            Recent Case Results
          </h2>
          <div className="flex gap-2">
            <button
              aria-label="Scroll left"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/40 hover:text-white"
              onClick={() => scroll(-1)}
              type="button"
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Scroll right"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/40 hover:text-white"
              onClick={() => scroll(1)}
              type="button"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="relative mt-8">
          {/* edge fades signal more cards without a raw scrollbar */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0b1830] to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0b1830] to-transparent" />

          <div
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
            ref={scrollRef}
          >
            {data.relatedCases.map((c, i) => (
              <article
                className="group relative flex min-w-[236px] shrink-0 snap-start flex-col items-center overflow-hidden rounded-[16px] border border-white/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] px-7 py-8 shadow-[0_10px_30px_rgba(5,15,28,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[4px] hover:border-[#C6A04A]/40 hover:shadow-[0_20px_46px_rgba(5,15,28,0.42)]"
                key={i}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A04A]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Recovered
                </p>
                <p
                  className="mt-2 font-serifDisplay font-normal leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(30px, 3.4vw, 42px)", fontVariationSettings: subHeadAxes, color: GOLD_BRIGHT }}
                >
                  ${fmt(c.amount)}
                </p>
                <span aria-hidden="true" className="mt-4 block h-px w-9 bg-gradient-to-r from-transparent via-[#B88A2D]/55 to-transparent transition-all duration-300 group-hover:w-14" />
                <p className="mt-4 font-sans text-[13.5px] font-medium text-white/85">{c.caseType}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.14em] text-white/40">{c.county}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-[11px] leading-[1.5] text-white/35">
          Case results do not guarantee or predict a similar result in any future case.
        </p>
      </div>
    </section>
  );
};

/* ─────────────────── 10. Related Pages Carousel ─────────────────── */

const RelatedPagesSection = ({ data }: { data: PracticeAreaPI }) => (
  <section
    aria-labelledby="pa-related-heading"
    className="relative w-full overflow-hidden bg-[#F7F7F5]"
    id="related"
    style={{ scrollMarginTop: "48px" }}
  >
    <Grain opacity="0.03" />

    <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
      <h2
        className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
        id="pa-related-heading"
        style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontVariationSettings: headlineAxes, color: INK }}
      >
        Related Practice Areas<span style={{ color: GOLD_ACCENT }}>.</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {data.relatedAreas.map((area) => {
          const img = practiceAreaBySlug[area.slug]?.heroImage;
          return (
            <Link
              className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[16px] px-7 pb-7 pt-16 shadow-[0_6px_24px_rgba(5,15,28,0.12)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_14px_36px_rgba(5,15,28,0.2)] lg:min-h-[220px]"
              key={area.slug}
              style={{ background: NAVY_CANVAS }}
              to={`/personal-injury/${area.slug}`}
            >
              {img ? (
                <>
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    loading="lazy"
                    src={img}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a1428] via-[#0a1428]/75 to-[#0a1428]/45 transition-opacity duration-300 group-hover:from-[#0a1428] group-hover:via-[#0a1428]/65" />
                </>
              ) : (
                <Grain opacity="0.05" />
              )}
              <h3
                className="relative font-serifDisplay text-[22px] font-normal leading-[1.15] tracking-[-0.01em] text-white lg:text-[24px]"
                style={{ fontVariationSettings: subHeadAxes }}
              >
                {area.title}
              </h3>
              <span className="relative mt-3 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium transition-colors group-hover:text-white" style={{ color: GOLD_BRIGHT }}>
                Learn More
                <ArrowRight className="group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────── 12. Additional Resources ─────────────────── */

const AdditionalResources = ({ data }: { data: PracticeAreaPI }) => {
  if (!data.resources.length) return null;

  const mid = Math.ceil(data.resources.length / 2);
  const col1 = data.resources.slice(0, mid);
  const col2 = data.resources.slice(mid);

  return (
    <section aria-labelledby="pa-resources-heading" className="relative w-full overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <h2
          className="font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
          id="pa-resources-heading"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontVariationSettings: headlineAxes, color: INK }}
        >
          Additional Resources
        </h2>
        <span aria-hidden="true" className="mt-3 block h-[2px] w-10" style={{ backgroundColor: GOLD_ACCENT }} />

        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2 lg:mt-10">
          {[col1, col2].map((col, ci) => (
            <ul className="space-y-3" key={ci}>
              {col.map((r) => (
                <li className="flex items-start gap-3" key={r.title}>
                  <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ backgroundColor: GOLD_ACCENT }} />
                  <Link
                    className="font-sans text-[15px] leading-[1.5] transition-colors duration-150 hover:underline lg:text-[16px]"
                    style={{ color: INK }}
                    to={r.href}
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── 13. City Links ─────────────────── */

const CityLinksSection = ({ data }: { data: PracticeAreaPI }) => (
  <section aria-labelledby="pa-cities-heading" className="relative w-full overflow-hidden bg-[#F7F7F5]">
    <Grain opacity="0.03" />

    <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
      <h2
        className="text-center font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em]"
        id="pa-cities-heading"
        style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontVariationSettings: headlineAxes, color: INK }}
      >
        We Serve Clients Across Michigan<span style={{ color: GOLD_ACCENT }}>.</span>
      </h2>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:mt-12 lg:gap-4">
        {data.cities.map((city) => (
          <Link
            className="rounded-full border border-[#0B1F3A]/12 bg-white px-5 py-2.5 font-sans text-[14px] font-medium transition-all duration-200 hover:border-[#B88A2D] hover:shadow-sm lg:text-[15px]"
            key={city}
            style={{ color: INK }}
            to={`/personal-injury/${data.slug}/${city.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {city}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────── Final CTA Band ─────────────────── */

const FinalCTABand = () => (
  <section aria-labelledby="pa-final-cta" className="w-full">
    <div className="relative isolate overflow-hidden text-white" style={{ background: NAVY_CANVAS }}>
      <Grain opacity="0.06" />
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-6 py-12 text-center sm:px-10 md:py-16 lg:py-20">
        <h2
          className="font-serifDisplay font-normal leading-[1.06] tracking-[-0.02em] text-white"
          id="pa-final-cta"
          style={{ fontSize: "clamp(30px, 5vw, 56px)", fontVariationSettings: headlineAxes }}
        >
          Get a FREE Case Evaluation Today!
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-[1.5] text-white/75 lg:text-[18px]">
          You Pay Nothing Unless We Win Your Case &mdash; Guaranteed.
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

export const PracticeAreaDetailTemplate = ({ data }: { data: PracticeAreaPI }): JSX.Element => (
  <>
    <StickySubNav />
    <Hero data={data} />
    <OverviewSection data={data} />
    <CaseResultsComparison data={data} />
    <WhatToDoSection />
    <LongFormContent data={data} />
    <div id="testimonials" style={{ scrollMarginTop: "48px" }}>
      <TestimonialsSection />
    </div>
    <FAQSection data={data} />
    <RelatedCasesStrip data={data} />
    <RelatedPagesSection data={data} />
    <IntakeFormSection />
    <AdditionalResources data={data} />
    <CityLinksSection data={data} />
    <FinalCTABand />
  </>
);
