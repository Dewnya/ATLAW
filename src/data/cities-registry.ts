/**
 * Lightweight city registry — slug, name and county only, in menu order.
 *
 * The header's "Areas We Serve" menu reads this instead of cities.ts so the
 * long-form city copy stays in its own lazy chunk. `CityData.slug` is typed
 * against this list, so a city page can't use a slug the menu doesn't know.
 * Entries whose slug is a county ("wayne-county") are the county's own page.
 */

import { hasCityContent, hasHubContent } from "../content";

interface CityRegistryEntry {
  slug: string;
  name: string;
  county: string;
}

export const cityRegistry = [
  { slug: "dearborn", name: "Dearborn", county: "Wayne County" },
  { slug: "detroit", name: "Detroit", county: "Wayne County" },
  { slug: "dearborn-heights", name: "Dearborn Heights", county: "Wayne County" },
  { slug: "wayne-county", name: "Wayne County", county: "Wayne County" },
  { slug: "southfield", name: "Southfield", county: "Oakland County" },
  { slug: "oakland-county", name: "Oakland County", county: "Oakland County" },
  { slug: "warren", name: "Warren", county: "Macomb County" },
  { slug: "sterling-heights", name: "Sterling Heights", county: "Macomb County" },
  { slug: "livonia", name: "Livonia", county: "Wayne County" },
  { slug: "canton", name: "Canton", county: "Wayne County" },
  { slug: "westland", name: "Westland", county: "Wayne County" },
  { slug: "taylor", name: "Taylor", county: "Wayne County" },
  { slug: "royal-oak", name: "Royal Oak", county: "Oakland County" },
  { slug: "troy", name: "Troy", county: "Oakland County" },
  { slug: "novi", name: "Novi", county: "Oakland County" },
  { slug: "farmington-hills", name: "Farmington Hills", county: "Oakland County" },
  { slug: "west-bloomfield", name: "West Bloomfield", county: "Oakland County" },
  { slug: "rochester-hills", name: "Rochester Hills", county: "Oakland County" },
  { slug: "pontiac", name: "Pontiac", county: "Oakland County" },
  { slug: "waterford", name: "Waterford", county: "Oakland County" },
  { slug: "macomb-county", name: "Macomb County", county: "Macomb County" },
  { slug: "clinton-township", name: "Clinton Township", county: "Macomb County" },
  { slug: "macomb-township", name: "Macomb Township", county: "Macomb County" },
  { slug: "st-clair-shores", name: "St. Clair Shores", county: "Macomb County" },
  { slug: "ann-arbor", name: "Ann Arbor", county: "Washtenaw County" },
] as const satisfies readonly CityRegistryEntry[];

export type CitySlug = (typeof cityRegistry)[number]["slug"];

/** Cities with hand-written template data in cities.ts (their personal-injury page always renders). */
const TEMPLATE_CITIES: ReadonlySet<string> = new Set(["dearborn", "detroit", "dearborn-heights", "ann-arbor", "wayne-county", "oakland-county", "macomb-county"]);

/**
 * Where a city link in the nav points: the city's hub page (/areas-served/<city>)
 * when its copy is imported, else its personal-injury page when that exists,
 * else the areas-served index.
 */
export const cityHref = (slug: CitySlug): string => {
  if (hasHubContent(slug)) return `/areas-served/${slug}`;
  if (hasCityContent("personal-injury", slug) || TEMPLATE_CITIES.has(slug)) return `/personal-injury/personal-injury/${slug}`;
  return "/areas-served";
};
