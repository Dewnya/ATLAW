import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { PracticeAreaDetailTemplate } from "../components/ATLAW/PracticeAreaDetailTemplate";
import { practiceAreaBySlug } from "../data/practice/pi";
import { practiceEntry, practiceHref, type PracticeSection } from "../data/practice/pi/registry";
import { practiceAreaSchema } from "../data/schema-org";
import { NotFoundPage } from "./NotFoundPage";
import "./PersonalInjury.css";

/**
 * One page for every practice area: /personal-injury, /personal-injury/:practice
 * and /disability/:practice. The slug is looked up in the practice registry, so
 * adding a practice is a data entry, not a new route. Unknown slugs, or a slug
 * under the wrong section, render the 404 page.
 */
export const PracticePage = ({ section, slug: fixedSlug }: { section: PracticeSection; slug?: string }): JSX.Element => {
  const { practice } = useParams<{ practice: string }>();
  const slug = fixedSlug ?? practice ?? "";
  const entry = practiceEntry(slug);
  const data = entry && entry.section === section ? practiceAreaBySlug[slug] : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

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
