import { practiceNavGroups, practiceRegistry, practiceHref } from "./practice/pi/registry";
import { cityRegistry, cityHref } from "./cities-registry";

export const NAVY = "#0e1b33";
export const NAVY_PANEL = "#0a1428";
export const GOLD = "#C6A04A";

export interface NavLink {
  label: string;
  to: string;
}

export interface NavMenuGroup {
  label: string;
  /** Optional link for the group heading itself (e.g. a county page). */
  to?: string;
  links: NavLink[];
}

export interface NavMenu {
  id: "practice" | "areas";
  label: string;
  groups: NavMenuGroup[];
  /** "See all" link shown under the groups. */
  overview: NavLink;
}

export type NavItem = ({ kind: "link" } & NavLink) | ({ kind: "menu" } & NavMenu);

/* Menus are generated from the registries, so new practice areas and cities
   appear in the header and mobile drawer without touching the nav. */

const practiceMenu: NavMenu = {
  id: "practice",
  label: "PRACTICE AREAS",
  groups: practiceNavGroups.map((group) => ({
    label: group.label,
    links: practiceRegistry
      .filter((p) => p.navGroup === group.id)
      .map((p) => ({ label: p.navLabel, to: practiceHref(p.slug) })),
  })),
  overview: { label: "All personal injury cases", to: "/personal-injury" },
};

const countyOrder = [...new Set(cityRegistry.map((c) => c.county))];

const areasMenu: NavMenu = {
  id: "areas",
  label: "AREAS WE SERVE",
  groups: countyOrder.map((county) => {
    const countyPage = cityRegistry.find((c) => c.name === county);
    return {
      label: county,
      to: countyPage ? cityHref(countyPage.slug) : undefined,
      links: cityRegistry
        .filter((c) => c.county === county && c.name !== county)
        .map((c) => ({ label: c.name, to: cityHref(c.slug) })),
    };
  }),
  overview: { label: "All areas we serve", to: "/areas-served" },
};

export const navItems: NavItem[] = [
  { kind: "menu", ...practiceMenu },
  { kind: "menu", ...areasMenu },
  { kind: "link", label: "ABOUT", to: "/about" },
  { kind: "link", label: "OUR TEAM", to: "/team" },
  { kind: "link", label: "NEWS", to: "/news" },
  { kind: "link", label: "CONTACT", to: "/contact" },
];
