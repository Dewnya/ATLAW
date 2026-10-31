import { lazy, useEffect, type ComponentType, type LazyExoticComponent } from "react";
import { useParams } from "react-router-dom";
import { cityInfo } from "../data/cities";
import { hubContentLoader } from "../content";
import { NotFoundPage } from "./NotFoundPage";
import "./PersonalInjury.css";

// One lazy component per imported city hub: its JSON and the long-form layout
// load together, only when that page is opened (and are awaited during prerender).
const hubPages = new Map<string, LazyExoticComponent<ComponentType>>();

const hubPage = (city: string): LazyExoticComponent<ComponentType> | undefined => {
  const load = hubContentLoader(city);
  const cityData = cityInfo(city);
  if (!load || !cityData) return undefined;
  let page = hubPages.get(city);
  if (!page) {
    page = lazy(() =>
      Promise.all([load(), import("../components/ATLAW/practice/CityLongFormPage")]).then(([content, layout]) => ({
        default: () => <layout.CityLongFormPage content={content.default} city={cityData} />,
      })),
    );
    hubPages.set(city, page);
  }
  return page;
};

/** /areas-served/:city — the city's hub page from the imported copy (areas-served--<city>.json). */
export const CityHubPage = (): JSX.Element => {
  const { city } = useParams<{ city: string }>();
  const Hub = city ? hubPage(city) : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [city]);

  return Hub ? <Hub /> : <NotFoundPage />;
};
