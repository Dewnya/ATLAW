/** Firm contact points used by the header and the mobile action bar. */

export const PHONE_DISPLAY = "(313) 406-7606";
export const PHONE_HREF = "tel:+13134067606";

/**
 * SMS number for "Text Us" buttons, as an E.164 string (e.g. "+13134067606").
 * null hides every Text Us button.
 * PRE-LAUNCH: the firm must confirm a number that can receive texts. If the
 * office line is a landline, texts are lost silently.
 */
export const SMS_NUMBER: string | null = null;

export const smsHref = (number: string): string =>
  `sms:${number}?body=${encodeURIComponent("Hi ATLAW, I have a question about my case.")}`;
