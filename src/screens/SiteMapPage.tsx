import { Link } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Breadcrumbs } from "../components/ATLAW/Breadcrumbs";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { GOLD } from "../data/navigation";
import { siteMapAreas, siteMapMain, siteMapPractices, siteMapResources, type SiteMapLink } from "../data/site-map";

const NAVY_CANVAS = "linear-gradient(180deg, #0E1B33 0%, #0A1428 100%)";
const SECTION = "mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16";
const linkClass =
  "font-sans text-[15px] leading-[1.5] text-[#3A4A5E] underline-offset-4 transition-colors hover:text-[#0E1B2C] hover:underline focus-visible:underline focus-visible:outline-none";

const LinkList = ({ links }: { links: SiteMapLink[] }) => (
  <ul className="mt-4 space-y-2">
    {links.map((link) => (
      <li key={link.to}>
        <Link className={linkClass} to={link.to}>
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    className="font-serifDisplay text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-[#0E1B2C] md:text-[34px]"
    id={id}
  >
    {children}
    <span aria-hidden="true" style={{ color: GOLD }}>.</span>
  </h2>
);

const GroupLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7466]">{children}</h3>
);

/** Site map: a plain, visible index of every page on the site, linked from the footer. */
export const SiteMapPage = (): JSX.Element => {
  const practices = siteMapPractices();
  const areas = siteMapAreas();

  return (
    <div className="min-h-screen bg-white text-[#0E1B2C]">
      <PageMeta
        title="Site Map | ATLAW Personal Injury Lawyers | Dearborn, MI"
        description="Every page on the ATLAW website in one place: practice areas, the Michigan cities and counties we serve, guides, case results, and firm pages."
        canonical="/site-map"
      />
      <Header />
      <main id="main-content">
        <section className="relative w-full" style={{ background: NAVY_CANVAS }}>
          <Breadcrumbs items={[{ label: "ATLAW", to: "/" }, { label: "Site Map" }]} />
          <div className={`${SECTION} pb-14 pt-10 md:pb-20 md:pt-14`}>
            <h1 className="font-serifDisplay text-[40px] font-normal leading-[1.06] tracking-[-0.02em] text-white md:text-[56px]">
              Site Map
              <span aria-hidden="true" style={{ color: GOLD }}>.</span>
            </h1>
            <p className="mt-5 max-w-[620px] font-serifDisplay text-[18px] leading-[1.6] text-white/75">
              Every page on this site, grouped by practice area and by the Michigan communities we serve.
            </p>
          </div>
        </section>

        <section aria-labelledby="sitemap-firm" className={`${SECTION} py-14 md:py-20`}>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionHeading id="sitemap-firm">The Firm</SectionHeading>
              <LinkList links={siteMapMain} />
            </div>
            <div>
              <SectionHeading id="sitemap-resources">Guides &amp; Resources</SectionHeading>
              <LinkList links={siteMapResources()} />
            </div>
          </div>
        </section>

        <section aria-labelledby="sitemap-practices" className="w-full bg-[#FAFAF8]">
          <div className={`${SECTION} py-14 md:py-20`}>
            <SectionHeading id="sitemap-practices">Practice Areas</SectionHeading>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {practices.map((group) => (
                <div key={group.label}>
                  <GroupLabel>{group.label}</GroupLabel>
                  <LinkList links={group.links} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="sitemap-areas" className={`${SECTION} py-14 md:py-20`}>
          <SectionHeading id="sitemap-areas">Areas We Serve</SectionHeading>
          {areas.map((area) => (
            <div className="mt-12" key={area.county}>
              <h3 className="border-b border-[#0E1B2C]/10 pb-3 font-serifDisplay text-[22px] font-normal tracking-[-0.01em] text-[#0E1B2C]">
                {area.county}
              </h3>
              <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {area.places.map((place) => (
                  <div key={place.name}>
                    <GroupLabel>{place.name}</GroupLabel>
                    <LinkList links={place.links} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};
