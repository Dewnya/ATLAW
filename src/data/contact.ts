/** Firm contact points used by the header and the mobile action bar. */

export const PHONE_DISPLAY = "(313) 406-7606";
export const PHONE_HREF = "tel:+13134067606";

/**
 * SMS number for "Text Us" buttons, as an E.164 string (e.g. "+13134067606").
 * null hides every Text Us button.
 * The firm confirmed on Nov 23, 2026 that the main line has SMS enabled in its CRM.
 */
export const SMS_NUMBER: string | null = "+13134067606";

export const smsHref = (number: string): string =>
  `sms:${number}?body=${encodeURIComponent("Hi ATLAW, I have a question about my case.")}`;
