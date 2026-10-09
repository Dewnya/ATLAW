import { useState } from "react";
import { Header } from "../components/ATLAW/Header";
import { Footer } from "../components/ATLAW/Footer";
import { PageMeta } from "../components/ATLAW/PageMeta";
import { RevealText, RevealBlock, RevealStagger } from "../motion/primitives";
import { STAGGER } from "../motion/config";
import { contactPageSchema } from "../data/schema-org";
import { YEARS_SERVING } from "../data/firm";
import { openIntakeModal } from "../components/ATLAW/IntakeModal";
import { TestimonialsSection } from "../components/ATLAW/TestimonialsSection";
import { IntakeFormSection } from "../components/ATLAW/IntakeFormSection";
import { ProcessSection } from "../components/ATLAW/ProcessSection";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const headlineAxes = "'opsz' 144, 'wght' 380, 'SOFT' 0, 'WONK' 0";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={`h-[14px] w-[14px] transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M5 12h14M13 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const PhoneIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <rect height="16" rx="2" width="20" x="2" y="4" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PinIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 shrink-0 text-[#B88A2D] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M6 9l6 6 6-6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

/* ─── Section 1: Hero with Inline CTA ─────────────────────────────────── */

const ContactHero = () => (
  <section
    aria-labelledby="contact-hero-heading"
    className="relative isolate w-full overflow-hidden bg-[#0e1b33] lg:min-h-[540px]"
  >
    <img
      aria-hidden="true"
      alt=""
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%] opacity-20"
      src="/assets/dewnya/dewnya-navy-pinstripe.avif"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(10,20,40,0.94)] via-[rgba(14,27,51,0.88)] to-[rgba(14,27,51,0.65)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{ backgroundImage: grain }}
    />

    <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 sm:px-10 md:py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:py-[100px]">
      {/* Left: text */}
      <div className="lg:basis-[55%]">
        <p className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-[72px] shrink-0 bg-[#C6A04A]" />
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.24em] text-white/70">
            Contact ATLAW
          </span>
        </p>

        <RevealText
          as="h1"
          className="mt-6 font-serifDisplay font-normal leading-[1.06] tracking-[-0.02em] text-white text-[clamp(38px,5.5vw,68px)]"
          id="contact-hero-heading"
          style={{ fontVariationSettings: headlineAxes }}
        >
          We&rsquo;re Here for You. Let&rsquo;s Get Started<span className="text-[#B88A2D]">.</span>
        </RevealText>

        <RevealBlock
          as="p"
          className="mt-5 max-w-[540px] font-sans text-[18px] leading-[1.6] text-white/80 lg:text-[20px]"
        >
          Free case review. No fees unless we win.
        </RevealBlock>

        <RevealBlock className="mt-6 flex items-center gap-3">
          <a
            className="font-serifDisplay text-[clamp(24px,3.5vw,36px)] font-normal leading-none tracking-[-0.02em] text-[#C6A04A] transition-colors duration-200 hover:text-[#d4b35a]"
            href="tel:+13134067606"
            style={{ fontVariationSettings: headlineAxes }}
          >
            (313) 406-7606
          </a>
        </RevealBlock>
      </div>

      {/* Right: CTA card */}
      <div className="lg:basis-[45%] lg:max-w-[480px]">
        <RevealBlock>
          <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm lg:p-10">
            <h2 className="font-serifDisplay text-[28px] font-normal leading-[1.12] tracking-[-0.02em] text-white lg:text-[32px]" style={{ fontVariationSettings: headlineAxes }}>
              Free Case Review
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-[1.6] text-white/70">
              Tell us what happened. We&rsquo;ll review your case and advise on your options &mdash; at no cost to you.
            </p>
            <button
              className="group mt-7 inline-flex h-[60px] w-full items-center justify-center gap-2.5 rounded-full bg-[#C6A04A] px-9 font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-[#0E1B2C] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#d4b35a] hover:shadow-[0_8px_24px_rgba(198,160,74,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A04A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1b33] lg:h-[64px]"
              onClick={openIntakeModal}
              type="button"
            >
              Start Your Free Case Review
              <ArrowRight className="group-hover:translate-x-1" />
            </button>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
);

/* ─── Section 2: Stats Bar ─────────────────────────────────────────────── */

const stats = [
  { label: "Serving Clients", value: `${YEARS_SERVING} Years` },
  { label: "Location", value: "Dearborn, MI" },
  { label: "Super Lawyers", value: "Rising Star" },
  { label: "Avvo Rating", value: "10.0" },
];

const StatsBar = () => (
  <section aria-label="Firm credentials" className="w-full bg-white">
    <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-6 gap-y-4 px-6 py-6 sm:gap-x-10 md:py-8 lg:gap-x-14">
      {stats.map((stat, i) => (
        <RevealBlock key={stat.label} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-[#B88A2D] sm:block" />
          )}
          <div className="text-center">
            <p className="font-serifDisplay text-[22px] font-normal leading-none tracking-[-0.01em] text-[#0B1F3A] md:text-[26px]">
              {stat.value}
            </p>
            <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A7466]">
              {stat.label}
            </p>
          </div>
        </RevealBlock>
      ))}
    </div>
  </section>
);

/* ─── Section 3: Direct Contact — 3 Ways to Reach Us ─────────────────── */

type ContactMethod = {
  icon: JSX.Element;
  title: string;
  primary: string;
  secondary: string;
  href: string;
};

const contactMethods: ContactMethod[] = [
  {
    icon: <PhoneIcon className="h-8 w-8 text-[#C6A04A]" />,
    title: "Call",
    primary: "(313) 406-7606",
    secondary: "Monday–Friday, 9 AM – 5 PM",
    href: "tel:+13134067606",
  },
  {
    icon: <MailIcon className="h-8 w-8 text-[#C6A04A]" />,
    title: "Email",
    primary: "info@atlawgroup.com",
    secondary: "We respond within 24 hours.",
    href: "mailto:info@atlawgroup.com",
  },
  {
    icon: <PinIcon className="h-8 w-8 text-[#C6A04A]" />,
    title: "Visit",
    primary: "3 Park Lane Blvd., Suite 400W",
    secondary: "Dearborn, MI 48126",
    href: "https://maps.google.com/?q=3+Park+Lane+Blvd+Suite+400W+Dearborn+MI+48126",
  },
];

const DirectContact = () => (
  <section aria-labelledby="direct-contact-heading" className="w-full bg-white">
    <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:py-20 lg:px-20">
      <header className="flex flex-col items-center text-center">
        <RevealBlock
          as="p"
          className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em] text-[#B88A2D]"
        >
          01 &mdash; Reach Us
        </RevealBlock>
        <RevealText
          as="h2"
          className="mt-5 font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-[#0B1F3A] text-[clamp(30px,4.5vw,52px)]"
          id="direct-contact-heading"
          style={{ fontVariationSettings: headlineAxes }}
        >
          3 Ways to Reach Us<span className="text-[#B88A2D]">.</span>
        </RevealText>
      </header>

      <RevealStagger
        amount={STAGGER.items}
        className="mx-auto mt-14 grid max-w-[1080px] gap-6 sm:grid-cols-3 lg:mt-16"
      >
        {contactMethods.map((method) => (
          <a
            key={method.title}
            href={method.href}
            target={method.title === "Visit" ? "_blank" : undefined}
            rel={method.title === "Visit" ? "noopener noreferrer" : undefined}
            className="group flex flex-col items-center rounded-[20px] border border-[#0B1F3A]/8 bg-white px-6 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A2D] lg:py-12"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C6A04A]/10">
              {method.icon}
            </div>
            <h3 className="mt-5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-[#B88A2D]">
              {method.title}
            </h3>
            <p className="mt-3 font-serifDisplay text-[18px] leading-[1.35] tracking-[-0.01em] text-[#0B1F3A] lg:text-[20px]">
              {method.primary}
            </p>
            <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-[#3A4A63]">
              {method.secondary}
            </p>
          </a>
        ))}
      </RevealStagger>
    </div>
  </section>
);

/* ─── Section 5: Office Location ───────────────────────────────────────── */

const OfficeLocation = () => (
  <section aria-labelledby="office-location-heading" className="w-full bg-white">
    <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:py-20 lg:px-20">
      <header className="flex flex-col items-center text-center">
        <RevealBlock
          as="p"
          className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em] text-[#B88A2D]"
        >
          03 &mdash; Our Office
        </RevealBlock>
        <RevealText
          as="h2"
          className="mt-5 font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-[#0B1F3A] text-[clamp(30px,4.5vw,52px)]"
          id="office-location-heading"
          style={{ fontVariationSettings: headlineAxes }}
        >
          Visit Us in Dearborn<span className="text-[#B88A2D]">.</span>
        </RevealText>
      </header>

      <RevealBlock className="mx-auto mt-14 grid max-w-[1120px] gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
        {/* Map */}
        <div className="aspect-[4/3] w-full overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:aspect-auto lg:min-h-[420px]">
          <iframe
            title="ATLAW Group office location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2953.8!2d-83.2454!3d42.3222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b34e3f5c3d2f1%3A0x1234567890abcdef!2s3%20Park%20Ln%20Blvd%20Suite%20400W%2C%20Dearborn%2C%20MI%2048126!5e0!3m2!1sen!2sus!4v1"
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <img
            alt="ATLAW Group office in Dearborn, Michigan"
            className="mb-8 h-auto w-full rounded-[16px] object-cover shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            loading="lazy"
            src="/assets/office/office-reception-desk.avif"
          />

          <address className="not-italic">
            <div className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#B88A2D]" />
              <div>
                <p className="font-serifDisplay text-[18px] leading-[1.4] text-[#0B1F3A]">
                  3 Park Lane Blvd., Suite 400W
                </p>
                <p className="font-serifDisplay text-[18px] leading-[1.4] text-[#0B1F3A]">
                  Dearborn, MI 48126
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 shrink-0 text-[#B88A2D]" />
              <a
                className="font-sans text-[16px] font-medium text-[#0B1F3A] transition-colors duration-200 hover:text-[#B88A2D]"
                href="tel:+13134067606"
              >
                (313) 406-7606
              </a>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <MailIcon className="h-5 w-5 shrink-0 text-[#B88A2D]" />
              <a
                className="font-sans text-[16px] font-medium text-[#0B1F3A] transition-colors duration-200 hover:text-[#B88A2D]"
                href="mailto:info@atlawgroup.com"
              >
                info@atlawgroup.com
              </a>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[#B88A2D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
              <p className="font-sans text-[16px] font-medium text-[#0B1F3A]">
                Monday–Friday, 9 AM – 5 PM
              </p>
            </div>
          </address>

          <p className="mt-8 font-sans text-[15px] leading-[1.6] text-[#3A4A63] lg:text-[16px]">
            Serving clients across Michigan &mdash; Dearborn, Detroit, Dearborn Heights, Ann Arbor, and beyond.
          </p>
        </div>
      </RevealBlock>
    </div>
  </section>
);

/* ─── Section 6: Reassurance Section ───────────────────────────────────── */

const ReassuranceSection = () => (
  <section
    aria-labelledby="reassurance-heading"
    className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#0e1b33_0%,#0a1428_100%)]"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{ backgroundImage: grain }}
    />

    <div className="relative mx-auto flex w-full max-w-[1080px] flex-col items-center px-6 py-16 text-center sm:px-10 md:py-20 lg:py-24">
      <RevealText
        as="h2"
        className="font-serifDisplay font-normal leading-[1.06] tracking-[-0.02em] text-white text-[clamp(30px,5vw,56px)]"
        id="reassurance-heading"
        style={{ fontVariationSettings: headlineAxes }}
      >
        You Don&rsquo;t Pay Unless We Win<span className="text-[#B88A2D]">.</span>
      </RevealText>

      <RevealBlock
        as="p"
        className="mt-5 max-w-[560px] font-sans text-[17px] leading-[1.6] text-white/75 lg:text-[19px]"
      >
        Your consultation is free. Your information is confidential.
      </RevealBlock>

      <RevealBlock className="mt-10">
        <button
          className="group inline-flex h-[60px] items-center justify-center gap-2.5 rounded-full bg-[#C6A04A] px-9 font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-[#0E1B2C] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#d4b35a] hover:shadow-[0_8px_24px_rgba(198,160,74,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A04A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1b33] lg:h-[64px] lg:px-10"
          onClick={openIntakeModal}
          type="button"
        >
          Start Your Free Case Review
          <ArrowRight className="group-hover:translate-x-1" />
        </button>
      </RevealBlock>
    </div>
  </section>
);

/* ─── Section 7: FAQ ───────────────────────────────────────────────────── */

type FAQItem = { question: string; answer: string };

const faqs: FAQItem[] = [
  {
    question: "How much does a consultation cost?",
    answer: "Nothing. Your initial consultation is completely free, and there is no obligation to hire us.",
  },
  {
    question: "Do I need to come to the office?",
    answer: "No. We offer phone and video consultations for your convenience. In-person meetings are also welcome at our Dearborn office.",
  },
  {
    question: "What should I bring to my consultation?",
    answer: "Any documents related to your case: police reports, medical records, insurance correspondence, photographs of injuries or the accident scene, and any communication from the other party or their insurance company.",
  },
  {
    question: "How long does it take to hear back?",
    answer: "We respond to all inquiries within 24 hours. If you call during business hours, we answer live.",
  },
  {
    question: "What if I'm not sure I have a case?",
    answer: "Let us evaluate it for you — no obligation. Many clients are unsure when they first reach out, and that is exactly what the free consultation is for.",
  },
  {
    question: "Do I have to pay anything upfront?",
    answer: "No. We work on a contingency fee basis. You pay nothing unless we win your case.",
  },
];

const AccordionItem = ({ item }: { item: FAQItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#0B1F3A]/10">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-150 hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A2D]/60 focus-visible:ring-offset-2"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="font-serifDisplay text-[18px] leading-[1.4] tracking-[-0.01em] text-[#0B1F3A] lg:text-[20px]">
          {item.question}
        </span>
        <Chevron open={open} />
      </button>
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 font-sans text-[15px] leading-[1.7] text-[#3A4A63] lg:text-[16px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactFAQ = () => (
  <section aria-labelledby="contact-faq-heading" className="relative isolate w-full overflow-hidden bg-[#F7F7F5]">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
      style={{ backgroundImage: grain }}
    />

    <div className="relative mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:py-20 lg:px-20">
      <header className="flex flex-col items-center text-center">
        <RevealBlock
          as="p"
          className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.22em] text-[#B88A2D]"
        >
          04 &mdash; FAQ
        </RevealBlock>
        <RevealText
          as="h2"
          className="mt-5 font-serifDisplay font-normal leading-[1.08] tracking-[-0.02em] text-[#0B1F3A] text-[clamp(30px,4.5vw,52px)]"
          id="contact-faq-heading"
          style={{ fontVariationSettings: headlineAxes }}
        >
          Frequently Asked Questions<span className="text-[#B88A2D]">.</span>
        </RevealText>
      </header>

      <RevealStagger
        amount={STAGGER.items}
        className="mx-auto mt-14 max-w-[820px] border-t border-[#0B1F3A]/10 lg:mt-16"
      >
        {faqs.map((item) => (
          <AccordionItem item={item} key={item.question} />
        ))}
      </RevealStagger>
    </div>
  </section>
);

/* ─── Page Assembly ────────────────────────────────────────────────────── */

export const ContactPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageMeta
        title="Contact Us | Free Case Evaluation | ATLAW — Dearborn Personal Injury Lawyers"
        description="Contact ATLAW for a free personal injury case evaluation. Call (313) 406-7606 or visit our Dearborn office. No fee unless we win your case."
        canonical="/contact"
        schema={contactPageSchema()}
      />
      <Header />
      <main id="main-content" className="[zoom:1.12]">
        <ContactHero />
        <StatsBar />
        <DirectContact />
        <ProcessSection />
        <OfficeLocation />
        <ReassuranceSection />
        <ContactFAQ />
        <TestimonialsSection />
        <IntakeFormSection />
      </main>
      <Footer />
    </div>
  );
};
