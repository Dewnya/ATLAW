import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/ATLAW/Breadcrumbs";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";
import { newsPosts } from "../data/news";
import "./PersonalInjury.css";

const GOLD = "#C9A24B";
const GOLD_BRIGHT = "#C6A04A";
const INK = "#0B1F3A";
const STONE = "#3A4A63";
const NAVY_CANVAS = "linear-gradient(180deg, #0E1B33 0%, #0A1428 100%)";

const headlineAxes = "'opsz' 144, 'wght' 360, 'SOFT' 0, 'WONK' 0";
const subHeadAxes = "'opsz' 80, 'wght' 400, 'SOFT' 0, 'WONK' 0";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Grain = ({ opacity = "0.05" }: { opacity?: string }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 mix-blend-overlay"
    style={{ backgroundImage: grain, opacity }}
  />
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={`h-[14px] w-[14px] transition-transform duration-[240ms] ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

export const NewsPage = (): JSX.Element => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title="News & Press | ATLAW — Dearborn Personal Injury Lawyers"
        description="The latest news, announcements, and press releases from ATLAW — Dearborn personal injury lawyers serving Southeast Michigan."
        canonical="/news"
      />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section
          aria-labelledby="news-hero-title"
          className="relative w-full overflow-hidden"
          style={{ background: NAVY_CANVAS }}
        >
          <Grain opacity="0.05" />
          <Breadcrumbs items={[{ label: "ATLAW", to: "/" }, { label: "News" }]} />
          <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-14 pt-20 text-center sm:px-10 md:pb-20 md:pt-28 lg:px-16">
            <p
              className="pi-reveal mb-5 font-sans text-[12px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: GOLD }}
            >
              News &amp; Press
            </p>
            <h1
              className="pi-reveal mx-auto max-w-[800px] font-serifDisplay font-normal tracking-[-0.02em] text-white"
              id="news-hero-title"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: "1.05",
                fontVariationSettings: headlineAxes,
              }}
            >
              The Latest From ATLAW
              <span style={{ color: GOLD }}>.</span>
            </h1>
            <p
              className="pi-reveal mx-auto mt-5 max-w-[600px] font-sans text-[18px] leading-[1.6] text-white/75 md:text-[19px]"
              style={{ animationDelay: "120ms" }}
            >
              Announcements, recognition, and press releases from our Dearborn firm.
            </p>
          </div>
        </section>

        {/* Press release list */}
        <section aria-label="Press releases" className="w-full bg-white">
          <div className="mx-auto w-full max-w-[900px] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
            <ul className="flex flex-col divide-y divide-[#0B1F3A]/10">
              {newsPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    className="group flex flex-col gap-3 py-8 transition-colors first:pt-0 md:py-10"
                    to={`/news/${post.slug}`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
                      <span style={{ color: GOLD }}>{post.category}</span>
                      <span aria-hidden="true" style={{ color: `${INK}40` }}>
                        &bull;
                      </span>
                      <span style={{ color: STONE }}>{post.dateDisplay}</span>
                    </div>

                    <h2
                      className="font-serifDisplay font-normal leading-[1.12] tracking-[-0.015em] transition-colors group-hover:text-[#B88A2D]"
                      style={{
                        color: INK,
                        fontSize: "clamp(24px, 3.5vw, 34px)",
                        fontVariationSettings: subHeadAxes,
                      }}
                    >
                      {post.title}
                    </h2>

                    <p className="max-w-[640px] font-sans text-[16px] leading-[1.65]" style={{ color: STONE }}>
                      {post.excerpt}
                    </p>

                    <span
                      className="mt-1 inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.06em]"
                      style={{ color: GOLD_BRIGHT }}
                    >
                      Read release
                      <ArrowRight className="group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <IntakeFormSection />
      </main>
      <Footer />
    </div>
  );
};
