/**
 * Lightweight PI practice registry — slug, nav label and nav group only.
 *
 * The header menus read this instead of the full practice content so ~70 kB of
 * page copy stays out of the main bundle. `practiceAreaBySlug` (index.ts) is
 * type-checked against this list: adding a practice to one and not the other
 * fails the build.
 */

export const practiceNavGroups = [
  { id: "auto", label: "Auto & No-Fault" },
  { id: "injury", label: "Injury" },
  { id: "medical", label: "Medical" },
  { id: "workplace", label: "Work & Disability" },
] as const;

export type PracticeNavGroupId = (typeof practiceNavGroups)[number]["id"];

interface PracticeRegistryEntry {
  slug: string;
  navLabel: string;
  /** null = hub page, linked as the menu's overview rather than inside a group. */
  navGroup: PracticeNavGroupId | null;
}

export const practiceRegistry = [
  { slug: "personal-injury", navLabel: "Personal Injury", navGroup: null },
  { slug: "auto-accidents", navLabel: "Auto Accidents", navGroup: "auto" },
  { slug: "premises-liability", navLabel: "Premises Liability", navGroup: "injury" },
  { slug: "dog-bites", navLabel: "Dog Bite Injuries", navGroup: "injury" },
  { slug: "wrongful-death", navLabel: "Wrongful Death", navGroup: "injury" },
  { slug: "medical-malpractice", navLabel: "Medical Malpractice", navGroup: "medical" },
  { slug: "workers-compensation", navLabel: "Workers' Compensation", navGroup: "workplace" },
] as const satisfies readonly PracticeRegistryEntry[];

export type PracticeSlug = (typeof practiceRegistry)[number]["slug"];

export const practiceHref = (slug: PracticeSlug): string =>
  slug === "personal-injury" ? "/personal-injury" : `/personal-injury/${slug}`;
