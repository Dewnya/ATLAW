import { lazy, useEffect, type ComponentType, type LazyExoticComponent } from "react";
import { useParams } from "react-router-dom";
import { practiceContentLoader } from "../content";
import { resourceEntry } from "../data/resources";
import { NotFoundPage } from "./NotFoundPage";
import "./PersonalInjury.css";

// One lazy component per imported guide: its JSON and the long-form layout load
// together, only when that page is opened (and are awaited during prerender).
const guidePages = new Map<string, LazyExoticComponent<ComponentType>>();

const guidePage = (slug: string): LazyExoticComponent<ComponentType> | undefined => {
  const load = resourceEntry(slug) ? practiceContentLoader(slug) : undefined;
  if (!load) return undefined;
  let page = guidePages.get(slug);
  if (!page) {
    page = lazy(() =>
      Promise.all([load(), import("../components/ATLAW/practice/PracticeLongFormPage")]).then(([content, layout]) => ({
        default: () => <layout.PracticeLongFormPage content={content.default} />,
      })),
    );
    guidePages.set(slug, page);
  }
  return page;
};

/**
 * /resources/:slug, or a guide's own top-level path (fixed slug), from the
 * imported copy (<slug>.json, section "resources"). A guide with its own path
 * is not also served under /resources.
 */
export const ResourcePage = ({ slug: fixedSlug }: { slug?: string }): JSX.Element => {
  const params = useParams<{ slug: string }>();
  const slug = fixedSlug ?? params.slug;
  const servedHere = Boolean(slug && (fixedSlug || !resourceEntry(slug)?.path));
  const Guide = slug && servedHere ? guidePage(slug) : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  return Guide ? <Guide /> : <NotFoundPage />;
};
