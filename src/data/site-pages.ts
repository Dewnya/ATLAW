import { hasCityContent, hasHubContent, hasPracticeContent } from "../content";
import { cityBySlug } from "./cities";
import { practiceAreaBySlug } from "./practice/pi";
import { practiceEntry } from "./practice/pi/registry";
import { practiceHasPage } from "./practice/pages";
import { resourceEntry, resourceRegistry } from "./resources";

const STATIC = new Set(["/", "/about", "/team", "/contact", "/news", "/areas-served", "/privacy", "/terms", "/personal-injury"]);

/**
 * Whether this build serves a page at an internal path. A production build
 * leaves drafts out, so an approved page's link to a city hub or practice page
 * that is still in review has no target there; the copy renders such a link as
 * plain text until the target is published (see RichInline).
 */
export const pageInThisBuild = (href: string): boolean => {
  const path = href.split(/[#?]/)[0].replace(/\/$/, "") || "/";
  if (STATIC.has(path)) return true;
  if (resourceRegistry.some((r) => r.path === path && hasPracticeContent(r.slug))) return true;
  const [, section, slug, city] = path.split("/");
  if (!section || !slug) return false;
  if (section === "resources") return !city && Boolean(resourceEntry(slug)) && hasPracticeContent(slug);
  if (section === "areas-served") return !city && hasHubContent(slug);
  if (section !== "personal-injury" && section !== "disability") return false;
  const practice = practiceEntry(slug);
  if (!practice) {
    // /personal-injury/<city>: the city's personal injury page (imported, or the original template).
    return section === "personal-injury" && !city && (hasCityContent("personal-injury", slug) || Boolean(cityBySlug(slug)));
  }
  if (practice.section !== section) return false;
  if (!city) return practiceHasPage(slug);
  return hasCityContent(slug, city) || (Boolean(cityBySlug(city)) && slug in practiceAreaBySlug);
};
