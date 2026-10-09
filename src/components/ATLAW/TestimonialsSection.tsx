import { useState, useRef, useEffect } from "react";
import { RevealText, RevealBlock, RevealStagger } from "../../motion/primitives";
import { STAGGER } from "../../motion/config";
import { googleReviews as testimonials, type Testimonial } from "../../data/testimonials";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";


const StarIcon = ({ size = 18 }: { size?: number }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`h-[${size}px] w-[${size}px]`}
    fill="#C6A04A"
    style={{ height: size, width: size }}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ChevronLeft = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M15 19l-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const ChevronRight = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M9 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const GoogleGlyph = (): JSX.Element => (
  <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z" />
  </svg>
);

const clientPhotos = [
  { src: "/assets/clients/client-e227.jpg", alt: "Dewnya presenting settlement check to client" },
  { src: "/assets/clients/client-4.jpg", alt: "Dewnya with client at the office" },
  { src: "/assets/clients/client-vincent-rutley.jpg", alt: "Dewnya with Vincent Rutley and family" },
  { src: "/assets/clients/client-dsc06598.jpg", alt: "Dewnya with clients at ATLAW office" },
  { src: "/assets/clients/client-img5011.jpg", alt: "Dewnya embracing client after case resolution" },
  {
    src: "/assets/clients/client-ali-bakri.jpg",
    alt: "Dewnya with Ali Bakri",
    imgClass: "scale-125 group-hover:scale-[1.3]",
  },
  { src: "/assets/clients/client-dsc07709.jpg", alt: "Dewnya with client" },
  { src: "/assets/clients/client-img8401.jpg", alt: "Dewnya with client at office" },
  {
    src: "/assets/clients/client-josh.png",
    alt: "Dewnya with Josh",
    // Scale from top so the baked-in caption at the bottom crops out of frame.
    imgClass: "origin-top scale-[1.35] group-hover:scale-[1.4]",
  },
  { src: "/assets/clients/client-teams.jpg", alt: "ATLAW team and clients group photo" },
];

const ClientPhotoStrip = (): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    // scrollWidth grows as lazy images decode — recheck when they load.
    const imgs = Array.from(el.querySelectorAll("img"));
    imgs.forEach((img) => img.addEventListener("load", checkScroll));
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(checkScroll)
        : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      imgs.forEach((img) => img.removeEventListener("load", checkScroll));
      ro?.disconnect();
    };
  }, []);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by ~80% of the visible width so a click advances roughly one page.
    const amount = Math.max(el.clientWidth * 0.8, 320);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const sideBtn =
    "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,31,58,0.15)] bg-white/95 text-[#0B1F3A] shadow-[0_4px_16px_rgba(11,31,58,0.16)] backdrop-blur transition-all duration-200 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative mt-16 lg:mt-20">
      <p className="mb-6 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B88A2D]">
        Our Clients
      </p>

      <div className="relative">
        <button
          aria-label="Scroll photos left"
          className={`${sideBtn} left-3`}
          disabled={!canScrollLeft}
          onClick={() => scroll(-1)}
          type="button"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Scroll photos right"
          className={`${sideBtn} right-3`}
          disabled={!canScrollRight}
          onClick={() => scroll(1)}
          type="button"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {clientPhotos.map((photo) => (
            <figure
              key={photo.src}
              className="group relative h-[300px] shrink-0 snap-start overflow-hidden rounded-[16px] bg-[#EDE7DA] ring-1 ring-[rgba(11,31,58,0.06)] shadow-[0_4px_16px_rgba(11,31,58,0.1)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(11,31,58,0.18)] sm:h-[340px]"
            >
              <img
                alt={photo.alt}
                className={`h-full w-auto max-w-none object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  photo.imgClass ?? "group-hover:scale-[1.04]"
                }`}
                loading="lazy"
                src={photo.src}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,31,58,0.28)] via-transparent to-transparent"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ item }: { item: Testimonial }): JSX.Element => (
  <article className="relative flex h-full flex-col rounded-[18px] border border-[rgba(11,31,58,0.06)] bg-white px-7 pb-7 pt-8 shadow-[0_4px_24px_rgba(11,31,58,0.07)] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:border-[#C6A04A]/30 hover:shadow-[0_16px_40px_rgba(11,31,58,0.13)] lg:px-8">
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-7 top-5 font-serifDisplay text-[64px] leading-none text-[#C6A04A]/15"
    >
      &rdquo;
    </span>

    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={16} />
      ))}
    </div>

    <blockquote className="mt-5 flex flex-1 items-center">
      <p className="font-serifDisplay text-[15.5px] leading-[1.72] tracking-[-0.005em] text-[#2A3648] lg:text-[16px]">
        {item.quote}
      </p>
    </blockquote>

    <div className="mt-7 flex items-center gap-3.5 border-t border-[rgba(11,31,58,0.08)] pt-5">
      <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C6A04A] to-[#B88A2D] shadow-[0_2px_8px_rgba(198,160,74,0.3)]">
        <span className="font-sans text-[15px] font-bold tracking-[0.02em] text-white">
          {item.initials}
        </span>
      </span>
      <span className="flex flex-col">
        <span className="font-sans text-[14.5px] font-semibold text-[#0B1F3A]">
          {item.name}
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#B88A2D]">
          <GoogleGlyph />
          {item.caseType}
        </span>
      </span>
    </div>
  </article>
);

export const TestimonialsSection = (): JSX.Element => {
  const cardsPerPage = 3;
  const maxPage = Math.ceil(testimonials.length / cardsPerPage) - 1;
  const [page, setPage] = useState(0);

  const visible = testimonials.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative isolate w-full overflow-hidden bg-[#FFFFFF] text-[#0B1F3A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: grain }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-20 sm:px-10 md:pb-24 md:pt-28 lg:px-20 lg:pb-[120px] lg:pt-[140px]">
        <header className="mx-auto flex flex-col items-center text-center">
          <RevealBlock className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} size={22} />
            ))}
          </RevealBlock>

          <RevealText
            as="h2"
            className="mt-5 font-serifDisplay font-normal leading-[1.04] tracking-[-0.02em] text-[#0B1F3A] text-[clamp(36px,5.5vw,72px)]"
            id="testimonials-heading"
          >
            Trusted by Clients. Rated <span className="text-[#C6A04A]">5 Stars</span><span className="text-[#B88A2D]">.</span>
          </RevealText>

          <RevealBlock
            as="p"
            className="mt-6 max-w-[680px] font-sans text-[18px] leading-[1.6] text-[#3A4A63] lg:text-[19px]"
          >
            Every testimonial represents a life changed.
          </RevealBlock>
        </header>

        <div className="relative mt-14 lg:mt-[64px]">
          {maxPage > 0 && (
            <>
              <button
                aria-label="Previous testimonials"
                className="absolute -left-2 top-[40%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,31,58,0.2)] bg-white text-[#0B1F3A] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[rgba(11,31,58,0.2)] disabled:hover:bg-white disabled:hover:text-[#0B1F3A] lg:-left-5 lg:flex"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                type="button"
              >
                <ChevronLeft />
              </button>

              <button
                aria-label="Next testimonials"
                className="absolute -right-2 top-[40%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,31,58,0.2)] bg-white text-[#0B1F3A] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[rgba(11,31,58,0.2)] disabled:hover:bg-white disabled:hover:text-[#0B1F3A] lg:-right-5 lg:flex"
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                type="button"
              >
                <ChevronRight />
              </button>
            </>
          )}

          <RevealStagger
            amount={STAGGER.grid}
            className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {visible.map((item) => (
              <TestimonialCard item={item} key={item.name} />
            ))}
          </RevealStagger>
        </div>

        {maxPage > 0 && (
          <div className="mt-10 flex items-center justify-center gap-4 lg:hidden">
            <button
              aria-label="Previous testimonials"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(11,31,58,0.2)] text-[#0B1F3A] transition-all duration-200 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              type="button"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  aria-label={`Page ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                    i === page ? "bg-[#C6A04A]" : "bg-[rgba(11,31,58,0.15)]"
                  }`}
                  key={i}
                  onClick={() => setPage(i)}
                  type="button"
                />
              ))}
            </div>

            <button
              aria-label="Next testimonials"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(11,31,58,0.2)] text-[#0B1F3A] transition-all duration-200 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              disabled={page === maxPage}
              onClick={() => setPage((p) => p + 1)}
              type="button"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        <ClientPhotoStrip />

        <p className="mx-auto mt-10 max-w-[620px] text-center font-sans text-[12px] leading-[1.6] text-[#3A4A63]/60">
          Testimonials or endorsements do not constitute a guarantee, warranty,
          or prediction regarding the outcome of your legal matter.
        </p>
      </div>
    </section>
  );
};
