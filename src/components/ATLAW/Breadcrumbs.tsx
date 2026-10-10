import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const BASE_URL = "https://atlawgroup.com";

export interface Crumb {
  label: string;
  /** Omit on the current page (the last crumb). */
  to?: string;
}

/**
 * BreadcrumbList JSON-LD for the trail shown on the page, so search results can
 * show the page's place in the site. Used on its own where a page already draws
 * its breadcrumb (practice and city heroes).
 */
export const BreadcrumbSchema = ({ items }: { items: Crumb[] }): JSX.Element => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          ...(c.to ? { item: `${BASE_URL}${c.to === "/" ? "" : c.to}` } : {}),
        })),
      })}
    </script>
  </Helmet>
);

/**
 * Breadcrumb trail ("ATLAW / About") for pages with a dark hero, plus its
 * BreadcrumbList JSON-LD. Sits at the top of the hero, left-aligned.
 */
export const Breadcrumbs = ({ items, containerClassName }: { items: Crumb[]; containerClassName?: string }): JSX.Element => (
  <>
    <BreadcrumbSchema items={items} />
    <div className={containerClassName ?? "relative z-10 mx-auto w-full max-w-[1180px] px-6 pt-6 sm:px-10 lg:px-16 lg:pt-8"}>
      <nav aria-label="Breadcrumb" className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.2em]">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55">
          {items.map((c, i) => (
            <Fragment key={c.label}>
              {i > 0 && <li aria-hidden="true" className="text-white/25">/</li>}
              <li>
                {c.to ? (
                  <Link className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none" to={c.to}>
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/85">{c.label}</span>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    </div>
  </>
);
