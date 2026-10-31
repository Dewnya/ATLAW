import { PHONE_DISPLAY, PHONE_HREF, SMS_NUMBER, smsHref } from "../../data/contact";
import { GOLD, NAVY_PANEL } from "../../data/navigation";
import { openIntakeModal } from "./IntakeModal";

/**
 * MOBILE ACTION BAR — fixed to the bottom of the screen below 1024px, on every
 * page (mounted once in index.tsx). Call | (Text) | Free Case Review.
 * Desktop gets the same actions in the header instead.
 * Text Us only renders once SMS_NUMBER is set in data/contact.ts.
 */

/** Bar height in px. BackToTop.css lifts the back-to-top button by the same amount. */
const BAR_HEIGHT = 60;

const PhoneIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TextIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M21 12a8 8 0 0 1-11.6 7.14L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />
  </svg>
);

const cellClass =
  "flex h-full flex-col items-center justify-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white focus-visible:bg-white/10 focus-visible:outline-none";

export const MobileActionBar = (): JSX.Element => {
  return (
    <>
      {/* Spacer so the fixed bar never covers the end of the footer. */}
      <div aria-hidden="true" className="lg:hidden" style={{ height: BAR_HEIGHT, backgroundColor: NAVY_PANEL }} />

      <nav
        aria-label="Contact ATLAW"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(5,15,28,0.25)] lg:hidden"
        style={{ backgroundColor: NAVY_PANEL }}
      >
        <div
          className={`grid divide-x divide-white/10 ${SMS_NUMBER ? "grid-cols-3" : "grid-cols-2"}`}
          style={{ height: BAR_HEIGHT }}
        >
          <a aria-label={`Call ATLAW at ${PHONE_DISPLAY}`} className={cellClass} href={PHONE_HREF}>
            <PhoneIcon />
            Call
          </a>
          {SMS_NUMBER && (
            <a aria-label="Text ATLAW" className={cellClass} href={smsHref(SMS_NUMBER)}>
              <TextIcon />
              Text
            </a>
          )}
          <button
            className="flex h-full items-center justify-center px-3 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E1B2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
            onClick={openIntakeModal}
            style={{ backgroundColor: GOLD }}
            type="button"
          >
            Free Case Review
          </button>
        </div>
      </nav>
    </>
  );
};
