/**
 * Resource guides — long reader guides (not practice pages) served at
 * /resources/<slug>, or at their own `path`, from imported content:
 * content-source/practice/<slug>.md with `section: resources`. One entry per
 * guide; the importer, the routes and the prerender list read this, so adding a
 * guide is a data entry.
 */

export interface ResourceEntry {
  slug: string;
  section: "resources";
  /** Breadcrumb and hero label. */
  navLabel: string;
  /** A top-level URL instead of /resources/<slug> (it needs its own route in App.tsx). */
  path?: string;
}

export const resourceRegistry = [
  { slug: "michigan-no-fault-guide", section: "resources", navLabel: "Michigan No-Fault Insurance Guide" },
  { slug: "what-to-do-after-an-accident", section: "resources", navLabel: "What to Do After a Car Accident" },
  { slug: "faq", section: "resources", navLabel: "Personal Injury FAQ", path: "/faq" },
] as const satisfies readonly ResourceEntry[];

export const resourceEntry = (slug: string): ResourceEntry | undefined =>
  resourceRegistry.find((r) => r.slug === slug);

export const resourceHref = (slug: string): string => resourceEntry(slug)?.path ?? `/resources/${slug}`;
