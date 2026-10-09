import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { founder, attorneys, staff, type TeamMember } from "../data/team";
import { attorneySchema } from "../data/schema-org";
import { TestimonialsSection } from "../components/ATLAW/TestimonialsSection";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";

const GOLD = "#C9A24B";
const NAVY = "#0B1F3A";
const INK = "#0E1B2C";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SECTION = "mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16";

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

/* ── Circular headshot card ──────────────────────────────────────── */
const TeamCard = ({ member }: { member: TeamMember }) => (
  <article className="flex flex-col items-center text-center">
    <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-[#0E1B2C]/8 bg-[#f0ede8] lg:h-48 lg:w-48">
      <img
        alt={member.name}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        src={member.photo}
      />
    </div>
    <h3
      className="mt-5 font-serifDisplay text-[18px] font-normal leading-tight tracking-[-0.01em] lg:text-[20px]"
      style={{ color: INK }}
    >
      {member.name}
    </h3>
    <p className="mt-1 font-sans text-[13px] text-[#3A4A5E]">{member.title}</p>
  </article>
);

export const OurPeoplePage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white text-[#0E1B2C]">
      <PageMeta
        title="Meet Our Team | Personal Injury Attorneys | ATLAW — Dearborn, MI"
        description="Meet the ATLAW team — Dewnya Bazzi and the attorneys and advocates fighting for injured clients across Dearborn, Detroit, and Southeast Michigan."
        canonical="/team"
        schema={attorneySchema()}
      />
      <Header />
      <main id="main-content">
        {/* ══ 01 — HERO ═══════════════════════════════════════════════ */}
        <section
          aria-labelledby="team-hero-heading"
          className="relative isolate w-full overflow-hidden"
          style={{ backgroundColor: NAVY }}
        >
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25"
            fetchPriority="high"
            src="/assets/team/group-shot.avif"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0e1b33]/70 via-[#0e1b33]/60 to-[#0e1b33]/90"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: grain }}
          />

          <div className={`relative ${SECTION} flex min-h-[380px] flex-col items-center justify-center py-24 text-center md:min-h-[440px] md:py-32 lg:min-h-[500px] lg:py-36`}>
            <p className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-[52px] shrink-0" style={{ backgroundColor: GOLD }} />
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white/65">
                <span style={{ color: GOLD }}>01</span> &mdash; Our Team
              </span>
              <span aria-hidden="true" className="h-px w-[52px] shrink-0" style={{ backgroundColor: GOLD }} />
            </p>
            <h1
              id="team-hero-heading"
              className="mx-auto mt-8 max-w-[18ch] font-serifDisplay text-[40px] font-normal leading-[1.04] tracking-[-0.02em] text-white sm:text-[52px] md:text-[64px] lg:text-[72px]"
            >
              Meet Your Team<span aria-hidden="true" style={{ color: GOLD }}>.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[480px] font-serifDisplay text-[18px] leading-[1.6] text-white/75 lg:text-[20px]">
              The people behind your case.
            </p>
          </div>
        </section>

        {/* ══ 02 — FOUNDER FEATURE CARD ═══════════════════════════════ */}
        <section aria-labelledby="founder-card-heading" className="w-full bg-white">
          <div className={`${SECTION} py-16 md:py-24 lg:py-28`}>
            <div className="overflow-hidden rounded-[24px] border border-[#0E1B2C]/8 bg-white shadow-lg shadow-[#0E1B2C]/5">
              <div className="grid lg:grid-cols-[55fr_45fr]">
                {/* Bio left */}
                <div className="order-2 flex flex-col justify-center p-8 md:p-12 lg:order-1 lg:p-14">
                  <h2
                    id="founder-card-heading"
                    className="font-serifDisplay text-[32px] font-normal leading-[1.06] tracking-[-0.02em] sm:text-[38px] md:text-[44px]"
                    style={{ color: INK }}
                  >
                    {founder.name}
                  </h2>
                  <p
                    className="mt-2 font-sans text-[14px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: GOLD }}
                  >
                    {founder.title}
                  </p>

                  <p className="mt-6 max-w-[520px] font-serifDisplay text-[18px] leading-[1.6] text-[#3A4A5E]">
                    Dewnya founded ATLAW in 2013 in Dearborn, Michigan, with one goal: give every injured person the advocacy they deserve. She has been named a Super Lawyers Rising Star three years running and holds a 10.0 Superb rating on Avvo.
                  </p>
                  <p className="mt-4 max-w-[520px] font-serifDisplay text-[18px] leading-[1.6] text-[#3A4A5E]">
                    When you hire ATLAW, the firm&rsquo;s standards are her standards. That&rsquo;s what founder-led means here.
                  </p>

                  <div className="mt-8">
                    <a
                      className="group inline-flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-[#0E1B2C] px-8 font-sans text-[15px] font-medium text-white transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#16263B] hover:shadow-[0_8px_24px_rgba(14,27,44,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:h-[58px] lg:px-9"
                      href="/about"
                    >
                      View Full Bio
                      <ArrowRight className="group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Photo right */}
                <div className="order-1 lg:order-2">
                  <img
                    alt="Dewnya Bazzi, Founder & CEO of ATLAW"
                    className="h-full min-h-[320px] w-full object-cover object-top lg:min-h-[480px]"
                    loading="lazy"
                    src="/assets/dewnya/dewnya-standing-black.avif"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 03 — ATTORNEYS GRID ═════════════════════════════════════ */}
        <section aria-labelledby="attorneys-heading" className="w-full bg-[#FAFAF8]">
          <div className={`${SECTION} py-16 md:py-24 lg:py-28`}>
            <div className="text-center">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7A7466]">
                <span style={{ color: GOLD }}>02</span> &mdash; Our Attorneys
              </p>
              <h2
                id="attorneys-heading"
                className="mx-auto mt-6 font-serifDisplay text-[32px] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[40px] md:text-[48px]"
                style={{ color: INK }}
              >
                Your Legal Team<span aria-hidden="true" style={{ color: GOLD }}>.</span>
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-[900px] gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-14">
              {attorneys.map((attorney) => (
                <TeamCard key={attorney.name} member={attorney} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 04 — KEY STAFF GRID ════════════════════════════════════ */}
        <section aria-labelledby="staff-heading" className="w-full bg-white">
          <div className={`${SECTION} py-16 md:py-24 lg:py-28`}>
            <div className="text-center">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7A7466]">
                <span style={{ color: GOLD }}>03</span> &mdash; Our Team
              </p>
              <h2
                id="staff-heading"
                className="mx-auto mt-6 font-serifDisplay text-[32px] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[40px] md:text-[48px]"
                style={{ color: INK }}
              >
                Your Client Advocates<span aria-hidden="true" style={{ color: GOLD }}>.</span>
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-[1100px] gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10">
              {staff.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 05 — TESTIMONIALS + INTAKE CTA (shared) ════════════════ */}
        <TestimonialsSection />
        <IntakeFormSection />
      </main>

      {/* ══ 06 — FOOTER ═════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
};
