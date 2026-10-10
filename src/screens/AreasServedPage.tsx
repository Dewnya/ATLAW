import { useEffect, useState } from "react";
import { Breadcrumbs } from "../components/ATLAW/Breadcrumbs";
import { Link } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { cities } from "../data/cities";
import { openIntakeModal } from "../components/ATLAW/IntakeModal";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";
import "./PersonalInjury.css";

const GOLD_ACCENT = "#B88A2D";
const GOLD_BRIGHT = "#C6A04A";
const STONE = "#3A4A63";
const NAVY_CANVAS = "linear-gradient(180deg, #0E1B33 0%, #0A1428 100%)";

const headlineAxes = "'opsz' 144, 'wght' 360, 'SOFT' 0, 'WONK' 0";
const subHeadAxes = "'opsz' 96, 'wght' 400, 'SOFT' 0, 'WONK' 0";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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


export const AreasServedPage = (): JSX.Element => {
  const [activeCity, setActiveCity] = useState(cities[0].slug);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title="Areas Served | Personal Injury Lawyers | ATLAW"
        description="ATLAW represents injured clients across Southeast Michigan — Dearborn, Detroit, Dearborn Heights, Ann Arbor, Wayne County, Oakland County, and Macomb County. Free case review."
        canonical="/areas-served"
      />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section
          aria-labelledby="areas-hero-title"
          className="relative w-full overflow-hidden"
          style={{ background: NAVY_CANVAS }}
        >
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            src="/assets/cities/michigan.avif"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,27,51,0.75) 0%, rgba(10,20,40,0.9) 100%)",
            }}
          />
          <Grain opacity="0.05" />
          <Breadcrumbs items={[{ label: "ATLAW", to: "/" }, { label: "Areas We Serve" }]} />
          <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-14 pt-20 text-center sm:px-10 md:pb-20 md:pt-28 lg:px-16">
            <h1
              className="pi-reveal mx-auto max-w-[800px] font-serifDisplay font-normal tracking-[-0.02em] text-white"
              id="areas-hero-title"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: "1.05",
                fontVariationSettings: headlineAxes,
              }}
            >
              Representing the Injured Across Michigan
              <span style={{ color: GOLD_ACCENT }}>.</span>
            </h1>

            <p
              className="pi-reveal mx-auto mt-5 max-w-[600px] font-sans text-[18px] leading-[1.6] text-white/75 md:text-[19px]"
              style={{ animationDelay: "120ms" }}
            >
              From our Dearborn headquarters, ATLAW fights for injury victims throughout Southeast Michigan.
            </p>

            <button
              className="pi-reveal group mt-8 inline-flex h-[56px] items-center justify-center gap-2.5 rounded-full px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-[#0E1B2C] transition-all duration-[240ms] hover:shadow-[0_8px_24px_rgba(198,160,74,0.35)] lg:h-[60px]"
              onClick={openIntakeModal}
              style={{ animationDelay: "200ms", backgroundColor: GOLD_BRIGHT }}
              type="button"
            >
              Start Your Free Case Review
              <ArrowRight className="group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* City sidebar + cards layout */}
        <section aria-labelledby="areas-cities-heading" className="relative w-full overflow-hidden bg-white">
          <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 py-16 sm:px-10 md:py-20 lg:flex-row lg:gap-12 lg:px-16 lg:py-24">
            {/* Sidebar nav */}
            <nav
              aria-label="City navigation"
              className="shrink-0 lg:sticky lg:top-[100px] lg:self-start lg:basis-[220px]"
            >
              <h2 className="sr-only" id="areas-cities-heading">Cities We Serve</h2>
              <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: STONE }}>
                Cities &amp; Counties
              </p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <button
                      className={`w-full rounded-lg px-4 py-2.5 text-left font-sans text-[15px] font-medium transition-all duration-200 lg:rounded-none lg:border-l-2 lg:px-5 ${
                        activeCity === c.slug
                          ? "border-[#B88A2D] bg-[#B88A2D]/8 text-[#0B1F3A] lg:bg-transparent"
                          : "border-transparent text-[#3A4A63] hover:bg-[#F7F7F5] hover:text-[#0B1F3A]"
                      }`}
                      onClick={() => {
                        setActiveCity(c.slug);
                        const el = document.getElementById(`city-card-${c.slug}`);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      type="button"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* City cards */}
            <div className="flex flex-1 flex-col gap-6">
              {cities.map((c) => (
                <article
                  className="group relative overflow-hidden rounded-[20px] shadow-[0_6px_24px_rgba(5,15,28,0.12)] transition-all duration-[300ms] hover:-translate-y-[2px] hover:shadow-[0_14px_36px_rgba(5,15,28,0.18)]"
                  id={`city-card-${c.slug}`}
                  key={c.slug}
                >
                  <div
                    className="relative flex min-h-[200px] flex-col justify-end px-8 pb-8 pt-16 sm:min-h-[240px] md:min-h-[260px]"
                    style={{ background: NAVY_CANVAS }}
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-[600ms] group-hover:scale-[1.04]"
                      loading="lazy"
                      src={`/assets/cities/${c.slug}.avif`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.72) 55%, rgba(10,20,40,0.92) 100%)",
                      }}
                    />
                    <Grain opacity="0.06" />

                    <p
                      className="relative font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50"
                    >
                      {c.county}
                    </p>

                    <h3
                      className="relative mt-2 font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-white"
                      style={{
                        fontSize: "clamp(28px, 4vw, 44px)",
                        fontVariationSettings: subHeadAxes,
                      }}
                    >
                      {c.name}
                    </h3>

                    <p className="relative mt-3 max-w-[520px] font-sans text-[15px] leading-[1.6] text-white/70">
                      {c.localContext[0].substring(0, 180)}…
                    </p>

                    <Link
                      className="relative mt-5 inline-flex w-fit items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors group-hover:text-white"
                      style={{ color: GOLD_BRIGHT }}
                      to={`/personal-injury/auto-accidents/${c.slug}`}
                    >
                      Learn More
                      <ArrowRight className="group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <IntakeFormSection />
      </main>
      <Footer />
    </div>
  );
};
