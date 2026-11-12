import { RISING_STAR_COUNT, VERIFIED_TOTALS, YEARS_SERVING } from "./firm";

export const timelineEvents = [
  {
    year: "2013",
    title: "Founded ATLAW in Dearborn",
    description:
      "Dewnya Bazzi opened ATLAW as a full personal injury practice, with one mission: give every client the attention and advocacy they deserve.",
  },
  {
    year: "2020",
    title: "Grew to a Team of 50+",
    description:
      "Brought on more attorneys and client advocates to serve more families, while keeping the personal attention every client receives.",
  },
  {
    year: "2026",
    title: "Nine-Time Super Lawyers Rising Star",
    description:
      "Dewnya has been named a Super Lawyers Rising Star nine times, a peer-reviewed honor given to fewer than 2.5% of attorneys in Michigan.",
  },
];

export const firmValues = [
  {
    title: "Unreasonable Hospitality",
    description:
      "Every client gets more than they expect. We return calls the same day, explain every step, and treat your case like it’s our only one.",
    icon: "hospitality" as const,
  },
  {
    title: "Strategic Advocacy",
    description:
      "We prepare cases to win, not just to settle. When insurance companies lowball, we have the evidence and the will to fight.",
    icon: "advocacy" as const,
  },
  {
    title: "Cultural Awareness",
    description:
      "A bilingual team that understands its community. We serve Dearborn, Detroit, and Southeast Michigan with cultural sensitivity and local knowledge.",
    icon: "culture" as const,
  },
];

export const founderBio = {
  greeting: "Hi, I’m Dewnya Bazzi.",
  subtitle: "Founder & CEO",
  /** Opening paragraph; the pull quote follows it. */
  intro:
    "I was 23 and had just passed the bar when my brother Ali called. He was 19. His car had been T-boned, and his voice was shaking.",
  pullQuote: "“Don’t tell mom. I’ll be okay. Meet me at the hospital.”",
  paragraphs: [
    "I drove 45 minutes to the emergency room. I heard him screaming before I saw him. His hip was shattered and his ankle was crushed. He needed surgery, and he waited four days for it, with a metal pin through his knee and his leg in traction, because the hospital was waiting on an insurance claim number.",
    "My family sat by his bed and couldn’t do anything to help him. I had planned to go into corporate law or sports representation. Those four days changed that. I decided I would spend my career standing beside families in that position.",
  ],
  expandedParagraphs: [
    "Ali’s case was the first personal injury case I ever worked on. It showed me how much harder an injury becomes when nobody explains the process and nobody calls you back. Since then, I’ve seen the same thing happen to many people in our community. They don’t know their rights, and they settle for less than they deserve.",
    "I founded ATLAW in 2013 in Dearborn, the community where I grew up. I wanted to build the firm my family needed in that hospital.",
    "I call our mission Injury to Victory. A fair settlement is part of it, but victory means more than that. It means helping someone get from the worst moment of their life to the other side of it.",
    "How we treat people along the way matters just as much. We return calls the same day and explain every step in plain language, in English or Arabic. We treat every client the way I wanted my own family to be treated. And we fight for every dollar they’re owed.",
    "I’ve been named a Super Lawyers Rising Star nine times, an honor given to fewer than 2.5% of attorneys in Michigan. I also hold a 10.0 Superb rating on Avvo, and the National Academy of Personal Injury Attorneys named me to its Top 10 Under 40. I’m grateful for each of these, and they belong to our team as much as to me. What I value most is that so many of our clients come to us because someone we helped sent them.",
    "Outside the office, I’m active in the Dearborn community. I speak Arabic fluently, as do many of our team members. When you’re hurt, you should be able to tell us what happened in the language you’re most comfortable with.",
    "If you or someone you love has been hurt, call us. We’ll call you back the same day and walk you through your options.",
  ],
  /** Shown with the full story. */
  familyPhoto: {
    src: "/assets/dewnya/dewnya-and-ali.avif",
    alt: "Dewnya Bazzi with her brother Ali",
    caption: "Dewnya with her brother Ali.",
    width: 325,
    height: 704,
  },
};

export const byTheNumbers = [
  { label: "Years Serving Clients", value: String(YEARS_SERVING) },
  // Lifetime totals appear only once verified (data/firm.ts).
  ...(VERIFIED_TOTALS
    ? [
        { label: "Cases Handled", value: VERIFIED_TOTALS.casesHandled },
        { label: "Recovered for Clients", value: VERIFIED_TOTALS.recovered },
      ]
    : []),
  { label: "Team Members", value: "29" },
  { label: "Home Base", value: "Dearborn, MI" },
  { label: "Rising Star", value: `${RISING_STAR_COUNT}×` },
];
