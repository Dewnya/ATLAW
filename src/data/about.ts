import { VERIFIED_TOTALS, YEARS_SERVING } from "./firm";

export const timelineEvents = [
  {
    year: "2013",
    title: "Founded ATLAW in Dearborn",
    description:
      "Dewnya Bazzi opened the doors with one mission: give every client the attention and advocacy they deserve.",
  },
  {
    year: "2016",
    title: "Expanded to Full PI Practice",
    description:
      "Added dedicated auto accident, premises liability, and workers’ compensation divisions.",
  },
  {
    year: "2019",
    title: "Grew to a Team of 20+",
    description:
      "Brought on additional attorneys and client advocates to handle growing caseloads without sacrificing personal service.",
  },
  {
    year: "2024",
    title: "Super Lawyers Rising Star",
    description:
      "Dewnya named a Super Lawyers Rising Star — a peer-reviewed honor given to a small percentage of attorneys in Michigan.",
  },
  {
    year: "2025",
    title: "Rising Star, Second Consecutive Year",
    description:
      "Recognized again for exceptional work in personal injury law across Southeast Michigan.",
  },
  {
    year: "2026",
    title: "Rising Star, Third Year Running",
    description:
      "Three consecutive years of peer-reviewed recognition. 29 team members. Still founder-led.",
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
  paragraphs: [
    "I became a personal injury attorney because I watched people in my community get taken advantage of by insurance companies. They didn’t know their rights. They settled for less than they deserved. I decided to do something about it.",
    "I founded ATLAW in 2013 in Dearborn, Michigan — the community where I grew up. From day one, the firm has been built on what I call “unreasonable hospitality.” That means returning every call the same day, explaining every step of the legal process in plain language, and fighting for every dollar our clients are owed.",
    "When you hire ATLAW, you’re hiring a team that cares as much about how we treat you as what we recover for you. That’s not a tagline — it’s how I run this firm.",
  ],
  expandedParagraphs: [
    "I’ve been named a Super Lawyers Rising Star three years in a row — a peer-reviewed recognition given to fewer than 2.5% of attorneys in Michigan. I hold a 10.0 Superb rating on Avvo and was selected as a Top 10 Under 40 by the National Academy of Personal Injury Attorneys.",
    "But the recognition I care about most is the trust of my clients. Many come to us through referrals from people we’ve already helped. That tells me we’re doing this right.",
    "Outside the office, I’m active in the Dearborn community, and I speak Arabic fluently — which matters when many of our clients feel more comfortable discussing sensitive legal matters in their first language.",
  ],
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
  { label: "Rising Star", value: "3×" },
];
