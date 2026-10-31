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
  { slug: "passenger-injury", section: "personal-injury", navLabel: "Passenger Injuries", navGroup: "auto", serviceType: "Passenger Injury Legal Representation" },
  { slug: "bicycle-accidents", section: "personal-injury", navLabel: "Bicycle Accidents", navGroup: "auto", serviceType: "Bicycle Accident Legal Representation" },
  { slug: "bus-accidents", section: "personal-injury", navLabel: "Bus Accidents", navGroup: "auto", serviceType: "Bus Accident Legal Representation" },
  // Injury
  { slug: "slip-and-fall", section: "personal-injury", navLabel: "Slip and Fall", navGroup: "injury", serviceType: "Slip and Fall Legal Representation" },
  { slug: "premises-liability", section: "personal-injury", navLabel: "Premises Liability", navGroup: "injury", serviceType: "Premises Liability Legal Representation", legacy: true },
  { slug: "dog-bites", section: "personal-injury", navLabel: "Dog Bite Injuries", navGroup: "injury", serviceType: "Dog Bite Legal Representation", legacy: true },
  { slug: "sidewalk-injuries", section: "personal-injury", navLabel: "Sidewalk Injuries", navGroup: "injury", serviceType: "Sidewalk Injury Legal Representation" },
  { slug: "tenant-injuries", section: "personal-injury", navLabel: "Tenant Injuries", navGroup: "injury", serviceType: "Tenant Injury Legal Representation" },
  { slug: "product-liability", section: "personal-injury", navLabel: "Product Liability", navGroup: "injury", serviceType: "Product Liability Legal Representation" },
  { slug: "brain-injury", section: "personal-injury", navLabel: "Brain Injuries", navGroup: "injury", serviceType: "Brain Injury Legal Representation" },
  { slug: "spinal-cord-injury", section: "personal-injury", navLabel: "Spinal Cord Injuries", navGroup: "injury", serviceType: "Spinal Cord Injury Legal Representation" },
  { slug: "wrongful-death", section: "personal-injury", navLabel: "Wrongful Death", navGroup: "injury", serviceType: "Wrongful Death Legal Representation", legacy: true },
  // Batch 2 (content tracker row 28)
  { slug: "cranbrook-sexual-abuse-claims", section: "personal-injury", navLabel: "Cranbrook Sexual Abuse Claims", navGroup: "injury", serviceType: "Sexual Abuse Claim Legal Representation" },
  // Medical
  { slug: "medical-malpractice", section: "personal-injury", navLabel: "Medical Malpractice", navGroup: "medical", serviceType: "Medical Malpractice Legal Representation", legacy: true },
  { slug: "nursing-home-abuse", section: "personal-injury", navLabel: "Nursing Home Abuse", navGroup: "medical", serviceType: "Nursing Home Abuse Legal Representation" },
  // Batch 2 — medical malpractice and birth injury (content tracker rows 29–38)
  { slug: "anesthesia-errors", section: "personal-injury", navLabel: "Anesthesia Errors", navGroup: "medical", serviceType: "Anesthesia Error Legal Representation" },
  { slug: "hospital-mistakes", section: "personal-injury", navLabel: "Hospital Mistakes", navGroup: "medical", serviceType: "Hospital Negligence Legal Representation" },
  { slug: "birth-injuries", section: "personal-injury", navLabel: "Birth Injuries", navGroup: "medical", serviceType: "Birth Injury Legal Representation" },
  { slug: "birth-asphyxia", section: "personal-injury", navLabel: "Birth Asphyxia", navGroup: "medical", serviceType: "Birth Asphyxia and HIE Legal Representation" },
  { slug: "cerebral-palsy", section: "personal-injury", navLabel: "Cerebral Palsy", navGroup: "medical", serviceType: "Cerebral Palsy Legal Representation" },
  { slug: "erbs-palsy", section: "personal-injury", navLabel: "Erb’s Palsy", navGroup: "medical", serviceType: "Erb’s Palsy Legal Representation" },
  { slug: "fetal-distress-hypoxia", section: "personal-injury", navLabel: "Fetal Distress & Hypoxia", navGroup: "medical", serviceType: "Fetal Distress Legal Representation" },
  { slug: "labor-delivery-complications", section: "personal-injury", navLabel: "Labor & Delivery Complications", navGroup: "medical", serviceType: "Labor and Delivery Negligence Legal Representation" },
  { slug: "periventricular-leukomalacia", section: "personal-injury", navLabel: "Periventricular Leukomalacia", navGroup: "medical", serviceType: "Periventricular Leukomalacia Legal Representation" },
  { slug: "shoulder-dystocia", section: "personal-injury", navLabel: "Shoulder Dystocia", navGroup: "medical", serviceType: "Shoulder Dystocia Legal Representation" },
  // Work & Disability
  { slug: "workers-compensation", section: "personal-injury", navLabel: "Workers' Compensation", navGroup: "disability", serviceType: "Workers Compensation Legal Representation", legacy: true },
  { slug: "social-security-disability", section: "disability", navLabel: "Social Security Disability", navGroup: "disability", serviceType: "Social Security Disability Legal Representation" },
  // Batch 2 — Social Security sub-pages (content tracker rows 39–40)
  { slug: "ssd-appeals-process", section: "disability", navLabel: "SSD Appeals Process", navGroup: "disability", serviceType: "Social Security Disability Appeal Legal Representation" },
  { slug: "ssd-application-process", section: "disability", navLabel: "SSD Application Process", navGroup: "disability", serviceType: "Social Security Disability Application Legal Representation" },
  { slug: "social-security-disability-insurance", section: "disability", navLabel: "SSDI", navGroup: "disability", serviceType: "Social Security Disability Insurance Legal Representation" },
  { slug: "supplemental-security-income", section: "disability", navLabel: "SSI", navGroup: "disability", serviceType: "Supplemental Security Income Legal Representation" },
  { slug: "social-security-benefits", section: "disability", navLabel: "Social Security Benefits", navGroup: "disability", serviceType: "Social Security Benefits Legal Representation" },
  { slug: "qualifying-impairments", section: "disability", navLabel: "Qualifying Impairments", navGroup: "disability", serviceType: "Social Security Disability Legal Representation" },
  { slug: "compassionate-allowances", section: "disability", navLabel: "Compassionate Allowances", navGroup: "disability", serviceType: "Compassionate Allowance Claim Legal Representation" },
  { slug: "winning-your-disability-claim", section: "disability", navLabel: "Winning Your Disability Claim", navGroup: "disability", serviceType: "Social Security Disability Legal Representation" },
  { slug: "short-long-term-disability", section: "disability", navLabel: "Short & Long-Term Disability", navGroup: "disability", serviceType: "Long-Term Disability Claim Legal Representation" },
  { slug: "cigna-disability-claims", section: "disability", navLabel: "Cigna Disability Claims", navGroup: "disability", serviceType: "Long-Term Disability Claim Legal Representation" },
  { slug: "hartford-disability-claims", section: "disability", navLabel: "Hartford Disability Claims", navGroup: "disability", serviceType: "Long-Term Disability Claim Legal Representation" },
  { slug: "lincoln-financial-disability-claims", section: "disability", navLabel: "Lincoln Financial Disability Claims", navGroup: "disability", serviceType: "Long-Term Disability Claim Legal Representation" },
  { slug: "unum-disability-claims", section: "disability", navLabel: "Unum Disability Claims", navGroup: "disability", serviceType: "Long-Term Disability Claim Legal Representation" },
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

/** URL for any practice slug (unknown slugs fall back to /personal-injury/<slug>). */
export const practicePath = (slug: string): string => {
  const entry = bySlug.get(slug);
  return entry ? practiceHref(entry.slug) : `/personal-injury/${slug}`;
};
