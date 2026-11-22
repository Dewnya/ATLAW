import { cityContentPages, hasPracticeContent } from "../content";
import { cities } from "./cities";
import { cityRegistry } from "./cities-registry";
import { newsPosts } from "./news";
import { practicesWithPages } from "./practice/pages";
import { practiceAreaBySlug } from "./practice/pi";
import { cityPageHref, practiceEntry, practiceHref, practiceNavGroups } from "./practice/pi/registry";
import { resourceHref, resourceRegistry } from "./resources";

export interface SiteMapLink {
  label: string;
  to: string;
}

/**
 * The original template city pages: the hand-written cities in cities.ts for the
 * original practices in practice/pi, which CityLandingPage renders when no
 * imported copy replaces them.
 */
export const templateCityRoutes = (): { practice: string; city: string }[] =>
  cities.flatMap((c) => Object.keys(practiceAreaBySlug).map((practice) => ({ practice, city: c.slug as string })));

/** Every city page this build serves (imported copy plus the templates), deduplicated by URL. */
const allCityPages = (): { practice: string; city: string; to: string }[] => {
  const seen = new Set<string>();
  return [...cityContentPages(), ...templateCityRoutes()]
    .map((p) => ({ ...p, to: cityPageHref(p.practice, p.city) }))
    .filter((p) => (seen.has(p.to) ? false : (seen.add(p.to), true)));
};

const cityLinkLabel = (practice: string, cityName: string): string => {
  if (practice === "areas-served") return `${cityName} overview`;
  if (practice === "personal-injury") return "Personal Injury";
  return practiceEntry(practice)?.navLabel ?? practice;
};

const practiceOrder = new Map<string, number>([
  ["areas-served", -2],
  ["personal-injury", -1],
  ...practicesWithPages().map((p, i) => [p.slug, i] as [string, number]),
]);

export const siteMapMain: SiteMapLink[] = [
  { label: "Home", to: "/" },
  { label: "About ATLAW", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Areas We Serve", to: "/areas-served" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export const siteMapResources = (): SiteMapLink[] => [
  ...resourceRegistry.filter((r) => hasPracticeContent(r.slug)).map((r) => ({ label: r.navLabel, to: resourceHref(r.slug) })),
  ...newsPosts.map((n) => ({ label: n.title, to: `/news/${n.slug}` })),
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
];

export const siteMapPractices = (): { label: string; links: SiteMapLink[] }[] =>
  practiceNavGroups.map((group) => ({
    label: group.label,
    links: practicesWithPages()
      .filter((p) => p.navGroup === group.id)
      .map((p) => ({ label: p.navLabel, to: practiceHref(p.slug) })),
  }));

export const siteMapAreas = (): { county: string; places: { name: string; links: SiteMapLink[] }[] }[] => {
  const pages = allCityPages();
  const counties = [...new Set(cityRegistry.map((c) => c.county))];
  return counties.map((county) => ({
    county,
    places: cityRegistry
      .filter((c) => c.county === county)
      // The county's own page first, then its cities in menu order.
      .sort((a, b) => Number(b.name === county) - Number(a.name === county))
      .map((c) => ({
        name: c.name,
        links: pages
          .filter((p) => p.city === c.slug)
          .sort((a, b) => (practiceOrder.get(a.practice) ?? 999) - (practiceOrder.get(b.practice) ?? 999))
          .map((p) => ({ label: cityLinkLabel(p.practice, c.name), to: p.to })),
      }))
      .filter((place) => place.links.length > 0),
  }));
};
