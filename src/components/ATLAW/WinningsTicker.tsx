import { approvedCaseResults, type CaseResult } from "../../data/caseResults";

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

const TickerItem = ({ item }: { item: CaseResult }) => (
  <span className="flex shrink-0 items-center gap-4 px-6 sm:gap-5 sm:px-8">
    <span className="font-serifDisplay text-[20px] font-normal tracking-[-0.01em] text-[#C6A04A] sm:text-[24px]">
      ${fmt(item.recovered)}
    </span>
    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:text-[11px]">
      {item.caseType}
    </span>
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rounded-full bg-[#C6A04A]/40"
    />
  </span>
);

/** Scrolling strip of firm-approved results. Renders nothing until data/caseResults.ts has entries. */
export const WinningsTicker = (): JSX.Element | null => {
  if (approvedCaseResults.length === 0) return null;

  return (
    <section
      aria-label="Case results"
      className="w-full overflow-hidden bg-[#081120] py-5 sm:py-6"
    >
      <p className="sr-only">Case results depend on a variety of factors unique to each case and do not guarantee or predict a similar result in any future case.</p>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee-slow flex shrink-0 items-center">
          {approvedCaseResults.map((item, i) => (
            <TickerItem item={item} key={`a-${i}`} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="animate-marquee-slow flex shrink-0 items-center"
        >
          {approvedCaseResults.map((item, i) => (
            <TickerItem item={item} key={`b-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
