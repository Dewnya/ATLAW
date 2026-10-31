import { Link } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { GOLD } from "../data/navigation";

const NAVY_CANVAS = "linear-gradient(180deg, #0E1B33 0%, #0A1428 100%)";

const links: { label: string; to: string }[] = [
  { label: "Personal Injury", to: "/personal-injury" },
  { label: "Areas We Serve", to: "/areas-served" },
  { label: "Our Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

/**
 * 404 — rendered by the router's catch-all route and by dynamic routes whose
 * params don't match any data (unknown city, practice, or news slug).
 * Marked noindex; the prerender step writes it to dist/404.html.
 */
export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title="Page Not Found | ATLAW"
        description="The page you were looking for doesn't exist or has moved. Find personal injury help from ATLAW in Dearborn, Michigan."
        noindex
      />
      <Header />
      <main id="main-content" className="flex-1">
        <section className="w-full" style={{ background: NAVY_CANVAS }}>
          <div className="mx-auto w-full max-w-[880px] px-6 pb-20 pt-24 text-center sm:px-10 md:pb-28 md:pt-32">
            <p
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: GOLD }}
            >
              Error 404
            </p>
            <h1 className="mx-auto mt-4 max-w-[640px] font-serifDisplay text-[40px] font-normal leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
              We couldn&rsquo;t find that page
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] font-sans text-[18px] leading-[1.6] text-white/75">
              The link may be out of date, or the page may have moved. If you were hurt and need
              help, we&rsquo;re still a call away.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex h-[56px] items-center justify-center rounded-full px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-[#0E1B2C] transition-shadow duration-[240ms] hover:shadow-[0_8px_24px_rgba(198,160,74,0.35)]"
                style={{ backgroundColor: GOLD }}
                to="/"
              >
                Back to homepage
              </Link>
              <a
                className="inline-flex h-[56px] items-center justify-center rounded-full border border-white/25 px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-colors duration-[240ms] hover:bg-white/10"
                href="tel:+13134067606"
              >
                Call (313) 406-7606
              </a>
            </div>

            <nav aria-label="Popular pages" className="mt-12">
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      className="font-sans text-[15px] font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                      to={to}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
