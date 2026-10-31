/* ────────────────────────────────────────────────────────────────────────────
   ATLAW — Press Releases / News

   Revision brief (July 29, 2026), section N: this page carries only approved
   firm updates — announcements, press releases, recognitions and awards.
   Only facts the firm has confirmed belong here; never invented quotes,
   figures or announcements. Newest first.
   ──────────────────────────────────────────────────────────────────────────── */

export interface NewsBlock {
  type: "paragraph" | "heading";
  text: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  category: string;
  /** ISO date, e.g. "2026-06-15" — used for schema + sorting. */
  date: string;
  /** Human display date, e.g. "June 15, 2026". */
  dateDisplay: string;
  /** Dateline city, e.g. "DEARBORN, MI". */
  dateline: string;
  excerpt: string;
  image?: string;
  body: NewsBlock[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "dewnya-bazzi-super-lawyers-rising-star-2026",
    title:
      "ATLAW Founder Dewnya Bazzi Named Super Lawyers Rising Star for Third Consecutive Year",
    category: "Recognition",
    date: "2026-06-15",
    dateDisplay: "June 15, 2026",
    dateline: "DEARBORN, MI",
    excerpt:
      "Dewnya Bazzi, founder and CEO of ATLAW, has again been named a Super Lawyers Rising Star — a peer-reviewed honor given to a small percentage of Michigan attorneys.",
    image: "/assets/dewnya/dewnya-chair-portrait.avif",
    body: [
      {
        type: "paragraph",
        text: "ATLAW today announced that founder and CEO Dewnya Bazzi has been named a Super Lawyers Rising Star for 2026 — the third consecutive year she has received the honor. The Rising Star designation is awarded through a peer-review and independent-research process to no more than 2.5% of attorneys in Michigan.",
      },
      {
        type: "heading",
        text: "A founder-led firm built on “unreasonable hospitality”",
      },
      {
        type: "paragraph",
        text: "Bazzi founded ATLAW in 2013 in Dearborn, Michigan, the community where she grew up. The firm has since grown to a 29-person team while remaining founder-led and personally involved in its cases. Bazzi also holds a 10.0 “Superb” rating on Avvo and was selected as a Top 10 Under 40 by the National Academy of Personal Injury Attorneys.",
      },
      {
        type: "paragraph",
        text: "ATLAW represents injured clients across Southeast Michigan in auto accident, medical malpractice, wrongful death, premises liability, dog bite, and workers’ compensation matters. The firm serves clients in both English and Arabic and works on a contingency-fee basis — clients pay nothing unless the firm recovers money for them.",
      },
    ],
  },
];

export const newsBySlug = (slug: string): NewsPost | undefined =>
  newsPosts.find((p) => p.slug === slug);
