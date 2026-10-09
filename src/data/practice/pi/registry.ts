/**
 * Practice registry — every practice page the site plans, with its URL section,
 * nav label, nav group and schema service type. One entry per page; nothing
 * else needs editing to add a practice.
 *
 * The header menus read this instead of the full practice content so page copy
 * stays out of the main bundle. A page exists when it has content: either the
 * original hand-written data (`legacy: true`, see index.ts) or an imported
 * content record (src/content/, added by `npm run import-content`).
 */

export const practiceNavGroups = [
  { id: "auto", label: "Auto & No-Fault" },
  { id: "injury", label: "Injury" },
  { id: "medical", label: "Medical" },
  { id: "disability", label: "Work & Disability" },
] as const;

export type PracticeNavGroupId = (typeof practiceNavGroups)[number]["id"];

/** URL section: personal injury pages live under /personal-injury, Social Security under /disability. */
export type PracticeSection = "personal-injury" | "disability";

interface PracticeRegistryEntry {
  slug: string;
  section: PracticeSection;
  navLabel: string;
  /** null = hub page, linked as the menu's overview rather than inside a group. */
  navGroup: PracticeNavGroupId | null;
  /** Schema.org serviceType for the page's LegalService JSON-LD. */
  serviceType: string;
  /** Has hand-written data in data/practice/pi (the original seven pages). */
  legacy?: true;
}

export const practiceRegistry = [
  { slug: "personal-injury", section: "personal-injury", navLabel: "Personal Injury", navGroup: null, serviceType: "Personal Injury Legal Representation", legacy: true },
  // Auto & No-Fault
  { slug: "auto-accidents", section: "personal-injury", navLabel: "Car Accidents", navGroup: "auto", serviceType: "Auto Accident Legal Representation", legacy: true },
  { slug: "truck-accidents", section: "personal-injury", navLabel: "Truck Accidents", navGroup: "auto", serviceType: "Truck Accident Legal Representation" },
  { slug: "motorcycle-accidents", section: "personal-injury", navLabel: "Motorcycle Accidents", navGroup: "auto", serviceType: "Motorcycle Accident Legal Representation" },
  { slug: "rideshare-accidents", section: "personal-injury", navLabel: "Uber & Lyft Accidents", navGroup: "auto", serviceType: "Rideshare Accident Legal Representation" },
  { slug: "pedestrian-accidents", section: "personal-injury", navLabel: "Pedestrian Accidents", navGroup: "auto", serviceType: "Pedestrian Accident Legal Representation" },
  { slug: "distracted-driving-accidents", section: "personal-injury", navLabel: "Distracted Driving Accidents", navGroup: "auto", serviceType: "Distracted Driving Accident Legal Representation" },
  { slug: "drunk-driving-accidents", section: "personal-injury", navLabel: "Drunk Driving Accidents", navGroup: "auto", serviceType: "Drunk Driving Accident Legal Representation" },
  { slug: "uninsured-motorist-claims", section: "personal-injury", navLabel: "Uninsured Motorist Claims", navGroup: "auto", serviceType: "Uninsured Motorist Claim Legal Representation" },
  { slug: "car-accident-insurance", section: "personal-injury", navLabel: "No-Fault Insurance Claims", navGroup: "auto", serviceType: "No-Fault Insurance Claim Legal Representation" },
  // Injury
  { slug: "slip-and-fall", section: "personal-injury", navLabel: "Slip and Fall", navGroup: "injury", serviceType: "Slip and Fall Legal Representation" },
  { slug: "premises-liability", section: "personal-injury", navLabel: "Premises Liability", navGroup: "injury", serviceType: "Premises Liability Legal Representation", legacy: true },
  { slug: "dog-bites", section: "personal-injury", navLabel: "Dog Bite Injuries", navGroup: "injury", serviceType: "Dog Bite Legal Representation", legacy: true },
  { slug: "wrongful-death", section: "personal-injury", navLabel: "Wrongful Death", navGroup: "injury", serviceType: "Wrongful Death Legal Representation", legacy: true },
  // Medical
  { slug: "medical-malpractice", section: "personal-injury", navLabel: "Medical Malpractice", navGroup: "medical", serviceType: "Medical Malpractice Legal Representation", legacy: true },
  { slug: "nursing-home-abuse", section: "personal-injury", navLabel: "Nursing Home Abuse", navGroup: "medical", serviceType: "Nursing Home Abuse Legal Representation" },
  // Work & Disability
  { slug: "workers-compensation", section: "personal-injury", navLabel: "Workers' Compensation", navGroup: "disability", serviceType: "Workers Compensation Legal Representation", legacy: true },
  { slug: "social-security-disability", section: "disability", navLabel: "Social Security Disability", navGroup: "disability", serviceType: "Social Security Disability Legal Representation" },
] as const satisfies readonly PracticeRegistryEntry[];

export type PracticeEntry = (typeof practiceRegistry)[number];
export type PracticeSlug = PracticeEntry["slug"];
/** The original seven practices with hand-written data (data/practice/pi). */
export type LegacyPracticeSlug = Extract<PracticeEntry, { legacy: true }>["slug"];

const bySlug = new Map<string, PracticeEntry>(practiceRegistry.map((p) => [p.slug, p]));

/** Registry entry for a URL slug, or undefined when the slug is not a planned practice. */
export const practiceEntry = (slug: string): PracticeEntry | undefined => bySlug.get(slug);

export const practiceHref = (slug: PracticeSlug): string => {
  if (slug === "personal-injury") return "/personal-injury";
  return `/${bySlug.get(slug)!.section}/${slug}`;
};
