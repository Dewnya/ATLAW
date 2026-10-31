import { Link, useParams } from "react-router-dom";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";
import { newsBySlug, newsPosts } from "../data/news";
import { newsArticleSchema } from "../data/schema-org";
import { NotFoundPage } from "./NotFoundPage";
import "./PersonalInjury.css";

const GOLD = "#C9A24B";
const INK = "#0B1F3A";
const STONE = "#3A4A63";
const NAVY_CANVAS = "linear-gradient(180deg, #0E1B33 0%, #0A1428 100%)";

const headlineAxes = "'opsz' 144, 'wght' 360, 'SOFT' 0, 'WONK' 0";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={`h-[14px] w-[14px] transition-transform duration-[240ms] ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

export const NewsPostPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? newsBySlug(slug) : undefined;

  if (!post) return <NotFoundPage />;

  const others = newsPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageMeta
        title={`${post.title} | ATLAW News`}
        description={post.excerpt}
        canonical={`/news/${post.slug}`}
        ogType="article"
        ogImage={post.image}
        schema={newsArticleSchema({
          title: post.title,
          description: post.excerpt,
          datePublished: post.date,
          slug: post.slug,
          image: post.image,
        })}
      />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Article header */}
        <section
          aria-labelledby="news-post-title"
          className="relative w-full overflow-hidden"
          style={{ background: NAVY_CANVAS }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ backgroundImage: grain, opacity: "0.05" }}
          />
          <div className="relative mx-auto w-full max-w-[820px] px-6 pb-14 pt-16 sm:px-10 md:pb-16 md:pt-20 lg:px-0">
            <nav aria-label="Breadcrumb" className="mb-7">
              <Link
                className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
                to="/news"
              >
                <ArrowRight className="rotate-180" />
                All News
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
              <span style={{ color: GOLD }}>{post.category}</span>
              <span aria-hidden="true" className="text-white/30">&bull;</span>
              <span className="text-white/60">{post.dateDisplay}</span>
            </div>

            <h1
              className="mt-5 font-serifDisplay font-normal tracking-[-0.02em] text-white"
              id="news-post-title"
              style={{
                fontSize: "clamp(30px, 5vw, 54px)",
                lineHeight: "1.08",
                fontVariationSettings: headlineAxes,
              }}
            >
              {post.title}
            </h1>
          </div>
        </section>

        {post.image && (
          <div className="mx-auto w-full max-w-[900px] px-6 sm:px-10 lg:px-0">
            <img
              alt=""
              aria-hidden="true"
              className="-mt-8 aspect-[16/9] w-full rounded-[16px] object-cover object-[center_25%] shadow-[0_16px_40px_rgba(5,15,28,0.22)]"
              src={post.image}
            />
          </div>
        )}

        {/* Body */}
        <article className="mx-auto w-full max-w-[720px] px-6 py-14 sm:px-10 md:py-16 lg:px-0">
          <p className="mb-8 font-sans text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: STONE }}>
            {post.dateline} &mdash;
          </p>
          {post.body.map((block, i) =>
            block.type === "heading" ? (
              <h2
                className="mt-10 font-serifDisplay text-[26px] font-normal leading-[1.2] tracking-[-0.01em]"
                key={i}
                style={{ color: INK }}
              >
                {block.text}
              </h2>
            ) : (
              <p
                className="mt-5 font-sans text-[17px] leading-[1.75] first-of-type:mt-0"
                key={i}
                style={{ color: "#2A3648" }}
              >
                {block.text}
              </p>
            ),
          )}

          <div className="mt-12 border-t border-[#0B1F3A]/10 pt-8">
            <p className="font-sans text-[13px] leading-[1.6] text-[#7A7466]">
              ATLAW is a personal injury law firm in Dearborn, Michigan. For media inquiries or a free
              case review, call{" "}
              <a className="font-medium underline underline-offset-2 hover:text-[#B88A2D]" href="tel:+13134067606">
                (313) 406-7606
              </a>
              .
            </p>
          </div>
        </article>

        {/* Other releases */}
        {others.length > 0 && (
          <section aria-labelledby="news-more" className="w-full border-t border-[#0B1F3A]/10 bg-[#F7F7F5]">
            <div className="mx-auto w-full max-w-[900px] px-6 py-14 sm:px-10 md:py-16 lg:px-0">
              <h2
                className="mb-8 font-sans text-[12px] font-semibold uppercase tracking-[0.2em]"
                id="news-more"
                style={{ color: STONE }}
              >
                More From ATLAW
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link
                      className="group flex h-full flex-col rounded-[16px] border border-[#0B1F3A]/10 bg-white p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(5,15,28,0.12)]"
                      to={`/news/${p.slug}`}
                    >
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                        {p.category} &bull; {p.dateDisplay}
                      </span>
                      <span
                        className="mt-3 font-serifDisplay text-[21px] font-normal leading-[1.2] transition-colors group-hover:text-[#B88A2D]"
                        style={{ color: INK }}
                      >
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <IntakeFormSection />
      </main>
      <Footer />
    </div>
  );
};
