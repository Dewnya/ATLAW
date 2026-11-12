import { useState } from "react";
import { NAVY, INK, GOLD, Reveal, Eyebrow, Period, Cta, grain, SECTION, PAD } from "./primitives";
import { timelineEvents, firmValues, founderBio, byTheNumbers } from "../../data/about";

/* ══ 02 — FOUNDER FEATURE (two-column, personal story) ═══════════ */
export const FounderFeatureSection = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="founder-heading" className="w-full scroll-mt-24 bg-white" id="founder">
      <div className={`${SECTION} ${PAD}`}>
        <div className="grid items-start gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow num="02" label="The Founder" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="founder-heading"
                className="mt-8 font-serifDisplay text-[36px] font-normal leading-[1.04] tracking-[-0.02em] sm:text-[44px] md:text-[52px]"
                style={{ color: INK }}
              >
                {founderBio.greeting}
              </h2>
              <p className="mt-3 font-sans text-[14px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                {founderBio.subtitle}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-7 space-y-5">
                <p className="max-w-[560px] font-serifDisplay text-[18px] leading-[1.6] text-[#3A4A5E]">
                  {founderBio.intro}
                </p>
                <blockquote
                  className="max-w-[560px] border-l-2 pl-6 font-serifDisplay text-[clamp(22px,2.4vw,30px)] italic leading-[1.35] tracking-[-0.01em]"
                  style={{ borderColor: GOLD, color: INK }}
                >
                  {founderBio.pullQuote}
                </blockquote>
                {founderBio.paragraphs.map((p, i) => (
                  <p key={i} className="max-w-[560px] font-serifDisplay text-[18px] leading-[1.6] text-[#3A4A5E]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            {expanded && (
              <Reveal delay={0}>
                <div className="mt-5 space-y-5">
                  {founderBio.expandedParagraphs.map((p, i) => (
                    <p key={i} className="max-w-[560px] font-serifDisplay text-[18px] leading-[1.6] text-[#3A4A5E]">
                      {p}
                    </p>
                  ))}
                  <figure className="max-w-[280px] pt-2">
                    <img
                      alt={founderBio.familyPhoto.alt}
                      className="block h-auto w-full rounded-[16px] object-cover"
                      height={founderBio.familyPhoto.height}
                      loading="lazy"
                      src={founderBio.familyPhoto.src}
                      width={founderBio.familyPhoto.width}
                    />
                    <figcaption className="mt-3 font-sans text-[13px] leading-[1.5] text-[#7A7466]">
                      {founderBio.familyPhoto.caption}
                    </figcaption>
                  </figure>
                </div>
              </Reveal>
            )}

            <Reveal delay={200}>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-5 inline-flex items-center gap-2 font-sans text-[14px] font-semibold tracking-[0.04em] transition-colors hover:text-[#C9A24B]"
                style={{ color: INK }}
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
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8">
                <Cta to="/contact" variant="primaryLight">
                  Contact Us Now
                </Cta>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[20px] lg:max-w-none">
              <img
                alt="Dewnya Bazzi, Founder & CEO of ATLAW"
                className="block h-auto w-full object-cover"
                height={1000}
                loading="lazy"
                src="/assets/dewnya/dewnya-chair-portrait.avif"
                width={800}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ══ 03 — TIMELINE ═══════════════════════════════════════════════ */
export const TimelineSection = (): JSX.Element => (
  <section
    aria-labelledby="timeline-heading"
    className="relative isolate w-full overflow-hidden text-white"
    style={{ backgroundColor: NAVY }}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: grain }}
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-[-4%] top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-serifDisplay font-normal uppercase leading-none tracking-[-0.045em] text-white opacity-[0.03] md:block"
      style={{ fontSize: "clamp(180px, 24vw, 420px)" }}
    >
      ATLAW
    </span>

    <div className={`relative ${SECTION} ${PAD}`}>
      <Reveal className="text-center">
        <Eyebrow num="03" label="Our Journey" onDark />
      </Reveal>
      <Reveal delay={80} className="text-center">
        <h2
          id="timeline-heading"
          className="mx-auto mt-8 max-w-[20ch] font-serifDisplay text-[34px] font-normal leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px] md:text-[54px]"
        >
          A Decade of Fighting for What&rsquo;s Right<Period />
        </h2>
        <p className="mx-auto mt-4 font-sans text-[14px] font-semibold uppercase tracking-[0.18em] text-white/50">
          A Legacy of Results. A Commitment to You.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-16 max-w-[700px] md:mt-20">
        {/* Vertical line */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-6 top-0 w-px md:left-1/2 md:-translate-x-px"
          style={{ backgroundColor: "rgba(201,162,75,0.25)" }}
        />

        {timelineEvents.map((event, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Reveal key={event.year} delay={100 + i * 80}>
              <div className={`relative mb-12 flex last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot on line */}
                <div className="absolute left-6 top-1 z-10 -translate-x-1/2 md:left-1/2">
                  <span
                    className="block h-3 w-3 rounded-full border-2"
                    style={{ borderColor: GOLD, backgroundColor: NAVY }}
                  />
                </div>

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-32px)] ${isLeft ? "md:pr-4 md:text-right" : "md:pl-4 md:text-left"}`}>
                  <span
                    className="font-sans text-[13px] font-bold tracking-[0.12em]"
                    style={{ color: GOLD }}
                  >
                    {event.year}
                  </span>
                  <h3 className="mt-2 font-serifDisplay text-[22px] font-normal leading-[1.2] text-white md:text-[24px]">
                    {event.title}
                  </h3>
                  <p className="mt-2 font-sans text-[15px] leading-[1.6] text-white/65">
                    {event.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ══ 04 — FIRM VALUES (3 cards) ══════════════════════════════════ */
const ValueIcon = ({ type }: { type: "hospitality" | "advocacy" | "culture" }) => {
  const cls = "h-10 w-10";
  if (type === "hospitality")
    return (
      <svg className={cls} fill="none" stroke={GOLD} viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    );
  if (type === "advocacy")
    return (
      <svg className={cls} fill="none" stroke={GOLD} viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971ZM5.25 4.97 7.87 15.696c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" stroke={GOLD} viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
};

export const FirmValuesSection = (): JSX.Element => (
  <section aria-labelledby="values-heading" className="w-full bg-[#FAFAF8]">
    <div className={`${SECTION} ${PAD}`}>
      <Reveal className="text-center">
        <Eyebrow num="04" label="Our Values" />
      </Reveal>
      <Reveal delay={80} className="text-center">
        <h2
          id="values-heading"
          className="mx-auto mt-8 max-w-[18ch] font-serifDisplay text-[34px] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[44px] md:text-[52px]"
          style={{ color: INK }}
        >
          What Drives Us<Period />
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-10">
        {firmValues.map((value, i) => (
          <Reveal key={value.title} delay={140 + i * 100}>
            <article className="rounded-[20px] border border-[#0E1B2C]/8 bg-white p-8 text-center transition-shadow duration-300 hover:shadow-lg hover:shadow-[#0E1B2C]/5 lg:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0E1B2C]/[0.04]">
                <ValueIcon type={value.icon} />
              </div>
              <h3 className="mt-6 font-serifDisplay text-[22px] font-normal leading-[1.2] tracking-[-0.01em]" style={{ color: INK }}>
                {value.title}
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-[1.65] text-[#3A4A5E]">
                {value.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ══ 05 — AWARDS/MEDIA STRIP ════════════════════════════════════ */
const awardBadges = [
  "Super Lawyers Rising Star 2024",
  "Super Lawyers Rising Star 2025",
  "Super Lawyers Rising Star 2026",
  "Avvo 10.0 Superb",
  "NAOPIA Top 10 Under 40",
];

export const AwardsStripSection = (): JSX.Element => (
  <section aria-labelledby="awards-heading" className="w-full bg-white">
    <div className={`${SECTION} py-16 md:py-20 lg:py-24`}>
      <Reveal className="text-center">
        <h2
          id="awards-heading"
          className="font-serifDisplay text-[28px] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[34px] md:text-[40px]"
          style={{ color: INK }}
        >
          Awarded. Featured. Trusted<Period />
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {awardBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.1em]"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              {badge}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ══ 06 — BY THE NUMBERS (stats strip) ═══════════════════════════ */
export const ByTheNumbersSection = (): JSX.Element => (
  <section
    aria-label="Firm statistics"
    className="w-full"
    style={{ backgroundColor: NAVY }}
  >
    <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 py-10 sm:px-10 md:gap-x-16 md:py-12 lg:gap-x-20 lg:py-14">
      {byTheNumbers.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 80}>
          <div className="flex items-center gap-3 text-white">
            <span className="font-serifDisplay text-[28px] font-normal leading-none tracking-[-0.02em] md:text-[34px]">
              {stat.value}
            </span>
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {stat.label}
            </span>
            {i < byTheNumbers.length - 1 && (
              <span aria-hidden="true" className="ml-6 hidden h-6 w-px bg-white/15 md:block" />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

