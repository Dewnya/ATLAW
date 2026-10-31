import { lazy, useEffect, type ComponentType, type LazyExoticComponent } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { PracticeAreaDetailTemplate } from "../components/ATLAW/PracticeAreaDetailTemplate";
import { practiceContentLoader } from "../content";
import { practiceAreaBySlug } from "../data/practice/pi";
import { practiceEntry, practiceHref, type PracticeSection } from "../data/practice/pi/registry";
import { practiceAreaSchema } from "../data/schema-org";
import { NotFoundPage } from "./NotFoundPage";
import "./PersonalInjury.css";

// One lazy component per imported page: its JSON and the long-form layout load
// together, only when that page is opened (and are awaited during prerender).
const longFormPages = new Map<string, LazyExoticComponent<ComponentType>>();

const longFormPage = (slug: string): LazyExoticComponent<ComponentType> | undefined => {
  const load = practiceContentLoader(slug);
  if (!load) return undefined;
  let page = longFormPages.get(slug);
  if (!page) {
    page = lazy(() =>
      Promise.all([load(), import("../components/ATLAW/practice/PracticeLongFormPage")]).then(([content, layout]) => ({
        default: () => <layout.PracticeLongFormPage content={content.default} />,
      })),
    );
    longFormPages.set(slug, page);
  }
  return page;
};

/**
 * One page for every practice area: /personal-injury, /personal-injury/:practice
 * and /disability/:practice. The slug is looked up in the practice registry, so
 * adding a practice is a data entry, not a new route. Imported content (src/content)
 * takes precedence over the original hand-written data; unknown slugs, a slug under
 * the wrong section, or a practice with no content yet render the 404 page.
 */
export const PracticePage = ({ section, slug: fixedSlug }: { section: PracticeSection; slug?: string }): JSX.Element => {
  const { practice } = useParams<{ practice: string }>();
  const slug = fixedSlug ?? practice ?? "";
  const entry = practiceEntry(slug);
  const inSection = Boolean(entry && entry.section === section);
  const LongForm = inSection ? longFormPage(slug) : undefined;
  const data = inSection ? practiceAreaBySlug[slug] : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (LongForm) return <LongForm />;
  if (!entry || !data) return <NotFoundPage />;

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={practiceHref(entry.slug)}
        schema={practiceAreaSchema(data.title, entry.serviceType)}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <PracticeAreaDetailTemplate data={data} />
      </main>
      <Footer />
    </div>
  );
};
