/**
 * Imported page content (written by scripts/import-content.mjs from
 * content-source/; never edited by hand).
 *
 * Copy is stored as typed blocks, not HTML, so the site renders it with its own
 * components and nothing from the source can inject markup.
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "link"; href: string; c: Inline[] }
  /** [CONFIRM: …], [VERIFY: …] or [ATTORNEY CHECK: …]: only ever present in drafts. */
  | { t: "placeholder"; kind: PlaceholderKind; v: string };

export type PlaceholderKind = "CONFIRM" | "VERIFY" | "ATTORNEY CHECK";

export type Block =
  | { t: "p"; c: Inline[] }
  | { t: "ul"; items: Inline[][] }
  | { t: "ol"; items: Inline[][] }
  | { t: "h3"; c: Inline[] }
  | { t: "table"; head: Inline[][]; rows: Inline[][][] };

export interface ContentSection {
  /** Anchor id, unique on the page (table of contents target). */
  id: string;
  heading: string;
  blocks: Block[];
}

export interface PracticeContent {
  slug: string;
  section: "personal-injury" | "disability";
  /** Set on a city or county page for the practice (served at /personal-injury/<slug>/<city>). */
  city?: string;
  status: "draft" | "approved";
  seoTitle: string;
  seoDescription: string;
  h1: string;
  tagline: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Opening paragraphs (the source's first section, which repeats the H1). */
  intro: Block[];
  /** Body sections in page order; the order is the data. */
  sections: ContentSection[];
  faqs: { question: string; answer: Inline[] }[];
  /** Closing "Talk to a lawyer" section, shown above the site's standard CTA blocks. */
  cta: ContentSection | null;
  wordCount: number;
  /** Placeholders still open (drafts only; an approved page with any fails the import). */
  openItems: number;
  source: { file: string; delivered: string };
}
