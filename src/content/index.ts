import type { PracticeContent } from "./types";

/**
 * Imported practice pages (see scripts/import-content.mjs).
 *
 * Each page's JSON loads only when that page is opened. Drafts are included in
 * dev and in builds with VITE_SHOW_DRAFTS=true (Vercel previews); a production
 * build leaves them out entirely, so no unapproved copy ships.
 */
export const SHOW_DRAFTS: boolean = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === "true";

type Loader = () => Promise<{ default: PracticeContent }>;

const approved = import.meta.glob<{ default: PracticeContent }>("./practice/*.json");
const drafts: Record<string, Loader> = SHOW_DRAFTS
  ? import.meta.glob<{ default: PracticeContent }>("./practice-drafts/*.json")
  : {};

const slugOf = (path: string) => path.slice(path.lastIndexOf("/") + 1, -".json".length);

// A slug has one record: the import writes it to exactly one of the two folders.
const loaders = new Map<string, Loader>([
  ...Object.entries(drafts).map(([path, load]) => [slugOf(path), load] as const),
  ...Object.entries(approved).map(([path, load]) => [slugOf(path), load] as const),
]);

export const hasPracticeContent = (slug: string): boolean => loaders.has(slug);

export const practiceContentLoader = (slug: string): Loader | undefined => loaders.get(slug);

// City and county pages are stored as <practice>--<city>.json (see import-content.mjs).
const cityKey = (practice: string, city: string) => `${practice}--${city}`;

export const hasCityContent = (practice: string, city: string): boolean => loaders.has(cityKey(practice, city));

export const cityContentLoader = (practice: string, city: string): Loader | undefined => loaders.get(cityKey(practice, city));

// City hubs are stored as areas-served--<city>.json (served at /areas-served/<city>).
export const hasHubContent = (city: string): boolean => loaders.has(cityKey("areas-served", city));

export const hubContentLoader = (city: string): Loader | undefined => loaders.get(cityKey("areas-served", city));

/** Every imported city or county page (practice "areas-served" is the city hub), for the prerender list. */
export const cityContentPages = (): { practice: string; city: string }[] =>
  [...loaders.keys()]
    .filter((key) => key.includes("--"))
    .map((key) => {
      const [practice, city] = key.split("--");
      return { practice, city };
    });
