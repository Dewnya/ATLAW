/**
 * Firm-wide credibility figures shown across the site.
 *
 * Revision brief (July 29, 2026): show years of service instead of "Since 2013",
 * and only publish verified lifetime totals.
 */

export const FOUNDED_YEAR = 2013;

/** "Serving Clients for 13 years". Hard-coded so prerendered HTML stays stable; bump each year. */
export const YEARS_SERVING = 13;

/**
 * Lifetime totals, exactly as approved by the firm (e.g. "10,000+", "$100M+").
 * null until Dewnya confirms the publishable figures — every stat block hides them while null.
 */
export const VERIFIED_TOTALS: { casesClosed: string; recovered: string } | null = null;
