import type { PracticeAreaPI } from "./types";
import type { PracticeSlug } from "./registry";
import { personalInjuryData } from "./personal-injury";
import { autoAccidentsData } from "./auto-accidents";
import { medicalMalpracticeData } from "./medical-malpractice";
import { wrongfulDeathData } from "./wrongful-death";
import { premisesLiabilityData } from "./premises-liability";
import { dogBitesData } from "./dog-bites";
import { workersCompensationData } from "./workers-compensation";

// `satisfies` keeps this map and registry.ts in lockstep (missing or extra slug = build error).
const practiceAreas = {
  "personal-injury": personalInjuryData,
  "auto-accidents": autoAccidentsData,
  "medical-malpractice": medicalMalpracticeData,
  "wrongful-death": wrongfulDeathData,
  "premises-liability": premisesLiabilityData,
  "dog-bites": dogBitesData,
  "workers-compensation": workersCompensationData,
} satisfies Record<PracticeSlug, PracticeAreaPI>;

export const practiceAreaBySlug: Record<string, PracticeAreaPI> = practiceAreas;

export const allPracticeAreas: PracticeAreaPI[] = Object.values(practiceAreaBySlug);
