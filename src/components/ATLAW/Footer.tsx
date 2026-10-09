import { Link } from "react-router-dom";
import { RevealStagger, DrawRule } from "../../motion/primitives";
import { STAGGER } from "../../motion/config";
import {
  practiceAreaLinks,
  companyLinks,
  socialLinks,
  legalLinks,
  MAP_URL,
} from "../../data/footer";
import { renderNavLink } from "./footer/navLink";
import { PhoneIcon, MailIcon, PinIcon } from "./footer/icons";
import { NewsletterForm } from "./footer/NewsletterForm";

/* ────────────────────────────────────────────────────────────────────────────
   ATLAW global footer — dark editorial direction.
   Matches the "editorial law as quiet authority" system established by the Hero
   and the "06 — Final CTA" section that sits directly above it (also navy):
   deep-navy canvas, white ink, hairline amber micro-accents, serif display.
   Tokens: navy canvas #0B1F3A · white text (with /75, /55 mutes) · amber #B88A2D.
   ──────────────────────────────────────────────────────────────────────────── */

// Same film grain used across the page so the footer reads as one canvas.
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Fraunces variable axes for the display lockup (mirrors Hero / Final CTA).
const headlineAxes = "'opsz' 144, 'wght' 380, 'SOFT' 0, 'WONK' 0";

export const Footer = (): JSX.Element => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0e1b33_0%,#0a1428_100%)] text-white"
      aria-labelledby="site-footer-heading"
    >
      <h2 id="site-footer-heading" className="sr-only">
        ATLAW site footer
      </h2>

      {/* ── Decorative layers (behind everything) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
      >
        {/* subtle grain overlay on the navy canvas */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: grain }}
        />
        {/* faint curved linework sweeping in from the right */}
        <svg
          className="absolute inset-0 hidden h-full w-full md:block"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 900"
        >
          <g className="opacity-[0.13]" stroke="#B88A2D" strokeWidth="1">
            <path d="M1640 120 C 1180 300 980 200 640 360" />
            <path d="M1640 40 C 1220 220 1020 130 700 260" />
          </g>
          <g className="opacity-[0.07]" stroke="#FFFFFF" strokeWidth="1">
            <path d="M1660 860 C 1200 700 980 800 560 660" />
          </g>
        </svg>
        {/* oversized ghost ATLAW wordmark behind the newsletter / bottom rows */}
        <span
          className="absolute bottom-[-3%] left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-serifDisplay font-normal uppercase leading-none tracking-[-0.045em] text-white opacity-[0.025] md:block"
          style={{ fontVariationSettings: headlineAxes, fontSize: "clamp(160px, 26vw, 460px)" }}
        >
          ATLAW
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-12 pt-[88px] sm:px-10 md:pb-14 md:pt-[112px] lg:px-16">
        {/* ── Main grid ── */}
        <RevealStagger
          amount={STAGGER.items}
          className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-[1.7fr_1.05fr_1.05fr_1.35fr] lg:gap-y-0"
        >
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Link to="/" className="inline-flex items-center" aria-label="ATLAW home">
              <img
                alt="ATLAW"
                className="h-8 w-auto md:h-9"
                src="/assets/atlaw-wordmark.svg"
              />
            </Link>
            <DrawRule className="mt-5 block h-px w-14 bg-[#B88A2D]/70" origin="left" />
            <p className="mt-6 max-w-[340px] font-sans text-[14.5px] leading-[1.65] text-white/75">
              Dearborn's personal injury law firm. We fight for the injured and
              hold negligent parties accountable — because your recovery matters.
            </p>
          </div>

          {/* Practice areas — top 8 by client demand + full index */}
          <nav
            aria-label="Practice areas"
            className="min-w-0 lg:border-l lg:border-white/[0.12] lg:pl-8"
          >
            <h4 className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B88A2D]">
              PRACTICE AREAS
            </h4>
            <ul className="mt-6 space-y-3">
              {practiceAreaLinks.map((link) => (
                <li key={link.label}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="min-w-0">
            <h4 className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B88A2D]">
              COMPANY
            </h4>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/[0.12] lg:pl-8">
            <h4 className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B88A2D]">
              TALK TO US
            </h4>
            <address className="mt-6 not-italic">
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="tel:+13134067606"
                    className="group inline-flex items-center gap-2.5 font-sans text-[15px] leading-[1.4] text-white transition hover:text-[#B88A2D]"
                  >
                    <PhoneIcon />
                    +1 (313) 406-7606
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@atlawgroup.com"
                    className="group inline-flex items-center gap-2.5 font-sans text-[15px] leading-[1.4] text-white transition hover:text-[#B88A2D]"
                  >
                    <MailIcon className="h-[17px] w-[17px] text-[#B88A2D]" />
                    info@atlawgroup.com
                  </a>
                </li>
              </ul>

              <div className="my-6 h-px w-full bg-[#B88A2D]/25" />

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5">
                  <PinIcon />
                </span>
                <div>
                  <p className="font-sans text-[13px] leading-[1.4] text-white/55">
                    Headquarters:
                  </p>
                  <p className="font-sans text-[15px] leading-[1.5] text-white">
                    3 Park Lane Blvd., Suite 400W
                  </p>
                  <p className="font-sans text-[15px] leading-[1.5] text-white">
                    Dearborn, MI 48126
                  </p>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1.5 inline-flex items-center font-sans text-[14px] font-medium text-[#B88A2D] transition hover:text-white"
                  >
                    View on map
                    <span className="ml-1.5 transition duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>

              <p className="mt-5 font-sans text-[13px] leading-[1.4] text-white/55">
                Office hours:{" "}
                <span className="text-white/80">Mon–Fri, 9 AM – 5 PM</span>
              </p>
            </address>
          </div>
        </RevealStagger>

        {/* ── Newsletter bar ── */}
        <div className="mt-16 flex flex-col gap-7 rounded-2xl border border-[#B88A2D]/35 bg-white/[0.05] px-6 py-7 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-8">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#B88A2D]/50 text-[#B88A2D]"
            >
              <MailIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B88A2D]">
                Stay Informed
              </p>
              <p className="mt-1.5 max-w-[420px] font-sans text-[14.5px] leading-[1.55] text-white/75">
                Insights, news, and firm announcements, delivered monthly.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <NewsletterForm />
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="mt-12 border-t border-[#B88A2D]/20 pt-7">
          <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:gap-8 lg:text-left">
            <p className="order-3 font-sans text-[13px] text-white/55 lg:order-1">
              &copy; {year} AT Law Group, PLLC. All rights reserved.
            </p>

            <ul className="order-1 flex flex-wrap items-center justify-center gap-y-2 lg:order-2">
              {socialLinks.map((social, idx) => (
                <li key={social.label} className="flex items-center">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] text-white/75 transition hover:text-[#B88A2D]"
                  >
                    {social.label}
                  </a>
                  {idx < socialLinks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-3 inline-block h-1 w-1 rounded-full bg-[#B88A2D]/60"
                    />
                  )}
                </li>
              ))}
            </ul>

            <ul className="order-2 flex flex-wrap items-center justify-center gap-y-2 lg:order-3">
              {legalLinks.map((link, idx) => (
                <li key={link.label} className="flex items-center">
                  <Link
                    to={link.to}
                    className="font-sans text-[13px] text-white/55 transition hover:text-[#B88A2D]"
                  >
                    {link.label}
                  </Link>
                  {idx < legalLinks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-3 inline-block h-1 w-1 rounded-full bg-[#B88A2D]/60"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Attorney advertising disclaimer + careers (replaces the Careers link) */}
          <div className="mt-6 flex flex-col items-center gap-3 text-center lg:flex-row lg:justify-between lg:gap-8 lg:text-left">
            <p className="max-w-[740px] font-sans text-[12px] leading-[1.6] text-white/45">
              This website is attorney advertising and for general information only.
              It is not legal advice and does not create an attorney-client
              relationship. Past results do not guarantee future outcomes.
            </p>
            <p className="shrink-0 font-sans text-[12px] leading-[1.6] text-white/45">
              Interested in joining ATLAW?{" "}
              <a
                href="mailto:careers@atlawgroup.com"
                className="text-white/65 underline underline-offset-2 transition hover:text-[#B88A2D]"
              >
                careers@atlawgroup.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
