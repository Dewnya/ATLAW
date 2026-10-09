import { Link } from "react-router-dom";

/* ────────────────────────────────────────────────────────────────────────────
   ATLAW — Privacy Policy content data

   Michigan-compliant privacy policy for a PI-only law firm operating from
   Dearborn, MI. Covers: data collection (forms, analytics), cookies,
   third-party services (CXP Legal Tech intake forms, Google Analytics), and contact for privacy
   inquiries (info@atlawgroup.com).

   The screen owns all layout JSX, hooks, motion, icons, and SectionBlock.
   ──────────────────────────────────────────────────────────────────────────── */

const GOLD = "#C9A24B";
const INK = "#0E1B2C";
const INK_SOFT = "#3A4A63";
const STONE = "#7A7466";

export const EMAIL = "info@atlawgroup.com";
export const LAST_UPDATED = "June 26, 2026";

export type Section = {
  id: string;
  num: string;
  indexLabel: string;
  title: string;
  summary: string;
  summaryNode?: React.ReactNode;
  paragraphs: string[];
  body?: React.ReactNode;
  pending?: boolean;
};

const CrossLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}): JSX.Element => (
  <span className="whitespace-normal">
    <span aria-hidden="true" className="mr-0.5 font-serifDisplay text-[0.95em]" style={{ color: GOLD }}>
      &para;
    </span>
    <Link
      to={to}
      className="font-medium underline underline-offset-2 transition hover:text-[#C9A24B]"
      style={{ color: INK }}
    >
      {children}
    </Link>
  </span>
);

const DraftingNote = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <p
    className="rounded-md border border-dashed px-4 py-3 font-sans text-[14px] leading-[1.6]"
    style={{
      borderColor: "rgba(201,162,75,0.55)",
      backgroundColor: "rgba(201,162,75,0.06)",
      color: STONE,
    }}
  >
    <span
      className="mr-2 inline-block font-semibold uppercase tracking-[0.16em]"
      style={{ color: GOLD, fontSize: "10.5px" }}
    >
      Drafting note
    </span>
    {children}
  </p>
);

const cookieRows = [
  {
    name: "__session",
    purpose: "Keeps the site functioning during a visit (login state, preferences)",
    duration: "Session",
    type: "Essential",
  },
  {
    name: "_ga / _ga_*",
    purpose: "Google Analytics — anonymous page-view and device-type measurement",
    duration: "2 years",
    type: "Analytics",
  },
];

const CookieTable = (): JSX.Element => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-left font-sans text-[14px]">
      <caption className="sr-only">Cookies used on this site</caption>
      <thead>
        <tr className="border-b" style={{ borderColor: "rgba(14,27,44,0.20)" }}>
          {["Cookie", "Purpose", "Duration", "Type"].map((h) => (
            <th
              key={h}
              scope="col"
              className="py-3 pr-5 align-bottom font-sans text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: STONE }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cookieRows.map((row) => (
          <tr key={row.name} className="border-b" style={{ borderColor: "rgba(14,27,44,0.09)" }}>
            <td className="py-4 pr-5 align-top font-medium tabular-nums" style={{ color: INK }}>
              {row.name}
            </td>
            <td className="py-4 pr-5 align-top leading-[1.5]" style={{ color: INK_SOFT }}>
              {row.purpose}
            </td>
            <td className="py-4 pr-5 align-top whitespace-nowrap" style={{ color: INK_SOFT }}>
              {row.duration}
            </td>
            <td className="py-4 align-top whitespace-nowrap" style={{ color: INK_SOFT }}>
              {row.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const sections: Section[] = [
  {
    id: "privacy-01",
    num: "01",
    indexLabel: "What you send us",
    title: "What you send us",
    summary:
      "When you contact us, we use what you share to respond and evaluate your matter. Until we formally take you on as a client, limit details.",
    summaryNode: (
      <>
        When you contact us, we use what you share to respond and evaluate your matter. Until we
        formally take you on as a client, limit details &mdash;{" "}
        <CrossLink to="/terms#terms-04">here&rsquo;s why</CrossLink>.
      </>
    ),
    paragraphs: [],
    body: (
      <p className="font-serifDisplay text-[16px] leading-[1.65]" style={{ color: INK_SOFT }}>
        When you submit a form (including through our third-party intake form provider), email us, or call, we
        collect what you choose to provide: your name, contact details, and a description of your
        situation. We use it to respond, run conflict checks, and evaluate whether we can help. Note:
        information sent before an engagement agreement exists may not be privileged &mdash; see{" "}
        <CrossLink to="/terms#terms-04">
          Terms of Use, &ldquo;Confidentiality of unsolicited submissions.&rdquo;
        </CrossLink>{" "}
        We will tell you when it is appropriate to share details.
      </p>
    ),
  },
  {
    id: "privacy-02",
    num: "02",
    indexLabel: "Collected automatically",
    title: "What we collect automatically",
    summary:
      "Like most websites, we get basic technical data — pages visited, device type, approximate location — through analytics.",
    paragraphs: [
      "When you visit atlawgroup.com, our hosting provider and analytics tools automatically collect certain technical information. This includes your IP address (which may indicate your approximate geographic location), browser type and version, operating system, referring URL, pages visited, time spent on pages, and the date and time of your visit.",
      "We use Google Analytics for anonymous, aggregated usage measurement. Google Analytics uses cookies to collect this data. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.",
      "Our hosting provider (Vercel) may collect server access logs, including IP addresses and request data, as part of standard web hosting operations.",
      "If you interact with our intake form, our third-party form provider (CXP Legal Tech) may collect technical data associated with your form submission, including your IP address, browser information, and submission timestamp. These forms are hosted on the provider’s own domain and are subject to their privacy policy.",
    ],
  },
  {
    id: "privacy-03",
    num: "03",
    indexLabel: "How we use it",
    title: "How we use information",
    summary:
      "To respond to you, evaluate matters, run the firm, improve the site, and meet legal obligations. That's it.",
    paragraphs: [
      "We use the information we collect for the following purposes:",
      "Responding to inquiries: When you contact us via form, email, or phone, we use your information to respond and evaluate whether we may be able to assist you.",
      "Conflict checks: Before taking on any matter, we are professionally obligated to check for conflicts of interest. Your name and basic information may be used for this purpose.",
      "Client onboarding: If you become a client, information you provide is used to open your file and represent you.",
      "Site improvement: We use aggregated analytics data to understand how visitors use our site and to improve its content and functionality.",
      "Communications: If you subscribe to our newsletter, we use your email address to send firm updates. You may unsubscribe at any time.",
      "Legal compliance and security: We may use information as necessary to comply with applicable laws, respond to legal process, or protect the rights, safety, and property of the firm, our clients, or others.",
    ],
  },
  {
    id: "privacy-04",
    num: "04",
    indexLabel: "When we share it",
    title: "When we share information",
    summary:
      "We don't sell it. We share only with service providers who help us operate (under contract), within the firm working on your matter, or when the law requires.",
    paragraphs: [
      "We do not sell your personal information to anyone — not to advertisers, data brokers, or any other third party.",
      "We may share information in the following limited circumstances:",
      "Service providers: We use third-party service providers who assist us in operating the site and the firm. These include our hosting provider (Vercel), analytics provider (Google Analytics), intake form provider (CXP Legal Tech), email service provider, and case management software. These providers access information only as needed to perform their services and are contractually obligated to protect it.",
      "Within the firm: Attorneys and staff at ATLAW Group may access your information as necessary to evaluate, manage, or work on your matter.",
      "Legal requirements: We may disclose information when required by law, court order, subpoena, or other legal process, or when we believe disclosure is necessary to protect the rights, safety, or property of the firm, our clients, or the public.",
      "Professional obligations: As attorneys, we are bound by the Michigan Rules of Professional Conduct regarding the confidentiality of client information. Information protected by attorney-client privilege or the duty of confidentiality is handled in accordance with those obligations.",
    ],
  },
  {
    id: "privacy-05",
    num: "05",
    indexLabel: "Cookies & analytics",
    title: "Cookies & analytics",
    summary:
      "We use a small set of cookies to make the site work and to understand how it's used. You can control them.",
    paragraphs: [],
    body: (
      <div className="space-y-5">
        <p className="font-serifDisplay text-[16px] leading-[1.65]" style={{ color: INK_SOFT }}>
          Cookies are small text files stored on your device when you visit a website. We use cookies
          for essential site functionality and anonymous analytics. You can control cookies through your
          browser settings — most browsers allow you to block or delete cookies. Note that disabling
          essential cookies may affect site functionality.
        </p>
        <CookieTable />
        <DraftingNote>
          If the firm adds additional third-party tools (e.g., live chat, embedded video, remarketing
          pixels), update this table accordingly and consider implementing a cookie consent banner.
        </DraftingNote>
      </div>
    ),
  },
  {
    id: "privacy-06",
    num: "06",
    indexLabel: "Data retention",
    title: "Data retention",
    summary:
      "We keep information as long as needed for the purpose we collected it — and where you become a client, as long as professional rules require us to keep files.",
    paragraphs: [
      "We retain personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law.",
      "Inquiry data: If you contact us but do not become a client, we retain your inquiry information for a reasonable period to check for conflicts of interest and to respond to follow-up questions, after which it is securely deleted.",
      "Client files: If you become a client, we retain your case file in accordance with the Michigan Rules of Professional Conduct and applicable record-retention requirements. Michigan attorneys are required to maintain client files for a reasonable period after the conclusion of a matter.",
      "Analytics data: Aggregated, non-identifiable analytics data may be retained indefinitely for trend analysis and site improvement.",
      "Newsletter subscriptions: We retain your email address until you unsubscribe or request deletion.",
    ],
  },
  {
    id: "privacy-07",
    num: "07",
    indexLabel: "Security",
    title: "Security",
    summary:
      "We use reasonable safeguards to protect your information. No website can promise perfect security, and we won't pretend otherwise.",
    paragraphs: [
      "We implement reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, disclosure, alteration, or destruction.",
      "These measures include: encryption of data in transit (HTTPS/TLS), access controls limiting who within the firm can view personal information, secure hosting infrastructure, and regular review of our data practices.",
      "No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security. If you have reason to believe your interaction with us is no longer secure, please contact us immediately at info@atlawgroup.com.",
    ],
  },
  {
    id: "privacy-08",
    num: "08",
    indexLabel: "Your rights & choices",
    title: "Your rights & choices",
    summary:
      "You can ask what we have about you, ask us to correct or delete it, and unsubscribe from the newsletter anytime. Email us and we'll handle it.",
    paragraphs: [
      "Regardless of where you reside, we extend the following rights to all individuals whose information we hold:",
      "Access: You may request a copy of the personal information we hold about you.",
      "Correction: You may request that we correct inaccurate or incomplete personal information.",
      "Deletion: You may request that we delete personal information we hold about you, subject to our legal and professional retention obligations.",
      "Newsletter opt-out: You may unsubscribe from our newsletter at any time by using the unsubscribe link in any email or by contacting us directly.",
      "Cookie controls: You may control cookies through your browser settings, as described in the Cookies & Analytics section above.",
      "To exercise any of these rights, email us at info@atlawgroup.com. We will respond to your request within 30 days. We may need to verify your identity before processing your request. Note that certain information may be exempt from deletion where we are required to retain it by law or professional obligation.",
    ],
  },
  {
    id: "privacy-09",
    num: "09",
    indexLabel: "Where data is stored",
    title: "Where data is stored",
    summary:
      "We operate from the United States. Your information is stored and processed in the US.",
    paragraphs: [
      "ATLAW Group operates from Dearborn, Michigan, and your information is stored and processed in the United States. Our hosting provider (Vercel) and third-party service providers may process data at facilities located in the United States.",
      "If you are accessing this site from outside the United States, please be aware that your information will be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your jurisdiction.",
    ],
  },
  {
    id: "privacy-10",
    num: "10",
    indexLabel: "Children",
    title: "Children",
    summary:
      "This site isn't directed at children, and we don't knowingly collect their information.",
    paragraphs: [
      "This website is not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will promptly delete it.",
      "Personal injury matters involving minors are handled through their parents or legal guardians. In such cases, we collect information from and communicate with the parent or guardian, not the minor.",
      "If you believe a child under 13 has provided us with personal information, please contact us at info@atlawgroup.com so we can take appropriate action.",
    ],
  },
  {
    id: "privacy-11",
    num: "11",
    indexLabel: "Changes",
    title: "Changes to this policy",
    summary:
      "If we change this policy, we'll update the date at the top. Material changes get a notice on this page.",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the \"Last updated\" date at the top of this page.",
      "If we make material changes to how we collect, use, or share your personal information, we will post a prominent notice on this page prior to the change becoming effective.",
      "We encourage you to review this page periodically. Your continued use of the site after any changes constitutes your acceptance of the updated policy.",
    ],
  },
  {
    id: "privacy-12",
    num: "12",
    indexLabel: "Contact",
    title: "Contact",
    summary: "Privacy questions or requests: email us.",
    paragraphs: [
      `For privacy questions, data requests, or concerns about this policy, contact us at ${EMAIL} or write to: ATLAW Group, 3 Park Lane Blvd Suite 400W, Dearborn, MI 48126.`,
      "We take every privacy inquiry seriously and will respond within 30 days.",
    ],
  },
];
