/**
 * Firm-wide credibility figures shown across the site.
 *
 * Revision brief (July 29, 2026): show years of service instead of "Since 2013",
 * and only publish verified lifetime totals. The firm confirmed the totals on
 * Oct 9, 2026 (build plan): always "more than", never a precise number.
 */

export const FOUNDED_YEAR = 2013;

/** "Serving Clients for 13 years": ATLAW, founded 2013. Hard-coded so prerendered HTML stays stable; bump each year. */
export const YEARS_SERVING = 13;

/**
 * Dewnya Bazzi's years as a personal injury attorney (homepage stats bar, per the firm, Nov 11, 2026).
 * Distinct from YEARS_SERVING, which counts the firm; the labels say which is which.
 */
export const YEARS_PI_EXPERIENCE = 15;

/** Super Lawyers Rising Star selections to date (firm, Nov 11, 2026). */
export const RISING_STAR_COUNT = 9;

/**
 * Lifetime totals as approved by the firm: more than 10,000 cases handled and
 * more than $100 million recovered. Setting this to null hides them everywhere.
 */
export const VERIFIED_TOTALS: { casesHandled: string; recovered: string } | null = {
  casesHandled: "10,000+",
  recovered: "$100M+",
};
