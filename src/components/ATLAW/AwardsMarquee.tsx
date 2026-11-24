import { RISING_STAR_COUNT } from "../../data/firm";
import { RevealBlock } from "../../motion/primitives";

const awards = [
  "Super Lawyers Rising Star",
  "Avvo 10.0 Superb",
  "NAOPIA Top 10 Under 40",
  "Top Attorneys — Outstanding Young Women",
  "A+ Rated",
  `${RISING_STAR_COUNT} Consecutive Years`,
];

const AwardItem = ({ label }: { label: string }) => (
  <span className="flex shrink-0 items-center gap-6 px-4">
    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B1F3A]/60 sm:text-[12px]">
      {label}
    </span>
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rounded-full bg-[#B88A2D]"
    />
  </span>
);

export const AwardsMarquee = (): JSX.Element => {
  const row = awards.flatMap((a) => [a]);

  return (
    <section
      aria-label="Awards and recognition"
      className="w-full overflow-hidden border-b border-[#0B1F3A]/5 bg-white py-5 sm:py-6"
    >
      <RevealBlock>
        <p className="mb-4 text-center font-serifDisplay text-[14px] italic tracking-[0.02em] text-[#0B1F3A]/40 sm:text-[15px]">
          Awarded. Featured. Trusted.
        </p>

        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center">
            {row.map((label, i) => (
              <AwardItem key={`a-${i}`} label={label} />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="animate-marquee flex shrink-0 items-center"
          >
            {row.map((label, i) => (
              <AwardItem key={`b-${i}`} label={label} />
            ))}
          </div>
        </div>
      </RevealBlock>
    </section>
  );
};
