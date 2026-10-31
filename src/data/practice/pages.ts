import { practiceEntry, practiceRegistry, type PracticeEntry } from "./pi/registry";
import { hasPracticeContent } from "../../content";

/**
 * Which planned practices have a page today. Menus, links and the prerender
 * list read this, so a practice appears everywhere the moment its content does.
 */
export const practiceHasPage = (slug: string): boolean => {
  const entry = practiceEntry(slug);
  return Boolean(entry && ("legacy" in entry || hasPracticeContent(slug)));
};

/** Registry entries that currently have a page, in registry order. */
export const practicesWithPages = (): PracticeEntry[] =>
  practiceRegistry.filter((p) => practiceHasPage(p.slug));
