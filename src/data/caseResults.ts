/**
 * Firm-approved case results — the single source for every results display
 * (homepage results cards, "Hiring ATLAW" example, results ticker).
 *
 * Empty until the firm supplies real, publishable results (amount, case type,
 * county). Never add example or placeholder figures here: while the list is
 * empty, every results display hides itself or falls back to real Google reviews.
 */

export interface CaseResult {
  /** Client name as the firm approves it for publication (e.g. initials). */
  name: string;
  caseType: string;
  county?: string;
  /** The insurer's first offer, if the firm approves showing it. */
  insuranceOffer?: number;
  recovered: number;
}

export const approvedCaseResults: CaseResult[] = [];
