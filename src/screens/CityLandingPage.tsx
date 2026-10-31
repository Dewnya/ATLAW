import { lazy, useEffect, type ComponentType, type LazyExoticComponent } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { CityLandingTemplate } from "../components/ATLAW/CityLandingTemplate";
import { practiceAreaBySlug } from "../data/practice/pi";
import { cityBySlug, cityInfo } from "../data/cities";
import { cityContentLoader } from "../content";
import { practiceEntry } from "../data/practice/pi/registry";
import { cityPracticeSchema } from "../data/schema-org";
import { NotFoundPage } from "./NotFoundPage";
import "./PersonalInjury.css";

// One lazy component per imported city page: its JSON and the long-form layout
// load together, only when that page is opened (and are awaited during prerender).
const longFormPages = new Map<string, LazyExoticComponent<ComponentType>>();

const longFormPage = (practice: string, city: string): LazyExoticComponent<ComponentType> | undefined => {
  const load = cityContentLoader(practice, city);
  const cityData = cityInfo(city);
  if (!load || !cityData || !practiceEntry(practice)) return undefined;
  const key = `${practice}--${city}`;
  let page = longFormPages.get(key);
  if (!page) {
    page = lazy(() =>
      Promise.all([load(), import("../components/ATLAW/practice/CityLongFormPage")]).then(([content, layout]) => ({
        default: () => <layout.CityLongFormPage content={content.default} city={cityData} />,
      })),
    );
    longFormPages.set(key, page);
  }
  return page;
};

/**
 * /personal-injury/:practice/:city and /disability/:practice/:city. Imported city
 * or county copy (src/content, <practice>--<city>.json) renders the long-form city
 * page; otherwise the original template from the hand-written city data, for the
 * original practices and the cities that have that data.
 */
export const CityLandingPage = (): JSX.Element => {
  const { practice, city } = useParams<{ practice: string; city: string }>();

  const LongForm = practice && city ? longFormPage(practice, city) : undefined;
  const practiceData = practice ? practiceAreaBySlug[practice] : undefined;
  const cityData = city ? cityBySlug(city) : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [practice, city]);

  if (LongForm) return <LongForm />;
  if (!practiceData || !cityData) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title={`${practiceData.title} Lawyer in ${cityData.name} | ATLAW`}
        description={`Injured in ${cityData.name}? ATLAW handles ${practiceData.title.toLowerCase()} claims in ${cityData.name} and ${cityData.county}. No fee unless we win. Free case review.`}
        canonical={`/personal-injury/${practiceData.slug}/${cityData.slug}`}
        schema={cityPracticeSchema(practiceData.title, `${practiceData.title} Legal Representation`, cityData.name)}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <CityLandingTemplate practice={practiceData} city={cityData} />
      </main>
      <Footer />
    </div>
  );
};
