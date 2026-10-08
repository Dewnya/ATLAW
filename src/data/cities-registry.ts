/**
 * Lightweight city registry — slug, name and county only, in menu order.
 *
 * The header's "Areas We Serve" menu reads this instead of cities.ts so the
 * long-form city copy stays in its own lazy chunk. `CityData.slug` is typed
 * against this list, so a city page can't use a slug the menu doesn't know.
 * Entries whose slug is a county ("wayne-county") are the county's own page.
 */

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
  { slug: "oakland-county", name: "Oakland County", county: "Oakland County" },
  { slug: "macomb-county", name: "Macomb County", county: "Macomb County" },
  { slug: "ann-arbor", name: "Ann Arbor", county: "Washtenaw County" },
] as const satisfies readonly CityRegistryEntry[];

export type CitySlug = (typeof cityRegistry)[number]["slug"];

/**
 * Where a city link in the nav points. Today: the personal-injury page for that
 * city. Switch to `/areas-served/${slug}` once the city hub pages exist.
 */
export const cityHref = (slug: CitySlug): string => `/personal-injury/personal-injury/${slug}`;
