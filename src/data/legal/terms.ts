/* ────────────────────────────────────────────────────────────────────────────
   ATLAW — Terms of Use — content data
   Module-level content moved out of the screen verbatim (strings unchanged).
   The screen keeps all JSX, hooks, helpers, and styling.

   ⚠️ LEGAL SUBSTANCE pending final ATLAW attorney review/approval before
   publication. All sections now contain substantive Michigan-specific language.
   ──────────────────────────────────────────────────────────────────────────── */

export const EMAIL = "info@atlawgroup.com";
export const LAST_UPDATED = "June 26, 2026";

export type Section = {
  id: string;
  num: string;
  indexLabel: string; // short label for the index rail + section eyebrow
  title: string; // H2
  summary: string; // "In plain English"
  paragraphs: string[];
  pending?: boolean; // bracketed clauses awaiting final attorney language
};

export const sections: Section[] = [
  {
    id: "terms-01",
    num: "01",
    indexLabel: "Acceptance",
    title: "Acceptance of these terms",
    summary:
      "Using this site means you agree to these terms. If you don’t agree, don’t use the site.",
    paragraphs: [
      "By accessing or using atlawgroup.com (the “Site”), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, do not use the Site. These terms apply to all visitors and users.",
    ],
  },
  {
    id: "terms-02",
    num: "02",
    indexLabel: "No attorney-client relationship",
    title: "No attorney-client relationship",
    summary:
      "Reading this site, calling us, or sending a message does not make you our client. That only happens when both sides sign an engagement agreement.",
    paragraphs: [
      "Use of this Site, including contacting ATLAW through any form, email, or phone number listed here, does not create an attorney-client relationship. An attorney-client relationship is formed only by a written engagement agreement signed by both you and the firm. Until then, we represent no one by virtue of this Site.",
    ],
  },
  {
    id: "terms-03",
    num: "03",
    indexLabel: "Not legal advice",
    title: "Site content is not legal advice",
    summary:
      "Everything on this site is general information. Your situation is specific. Don’t act on anything here without talking to a lawyer about your facts.",
    paragraphs: [
      "Content on this Site is provided for general informational purposes only and does not constitute legal advice. Laws change and outcomes depend on specific facts. Do not act or refrain from acting based on Site content without obtaining advice from a licensed attorney regarding your particular circumstances.",
    ],
  },
  {
    id: "terms-04",
    num: "04",
    indexLabel: "Confidentiality of submissions",
    title: "Confidentiality of unsolicited submissions",
    summary:
      "Until we’ve agreed to represent you, don’t send us confidential details. Unsolicited information may not be protected and doesn’t prevent us from representing someone else.",
    paragraphs: [
      "Information submitted before an attorney-client relationship exists may not be treated as privileged or confidential, and sending it does not prevent the firm from representing a party adverse to you. Please limit initial communications to general subject matter and contact information; we will tell you when it is appropriate to share details.",
    ],
  },
  {
    id: "terms-05",
    num: "05",
    indexLabel: "Attorney advertising",
    title: "Attorney advertising",
    summary:
      "This website is attorney advertising. Past results don’t guarantee anything about your case.",
    paragraphs: [
      "This Site may be considered attorney advertising under applicable rules of professional conduct. Prior results do not guarantee a similar outcome. Any recognitions or ratings referenced (including Super Lawyers Rising Star) reflect the methodology of the granting organization and are not a promise of results. ATLAW attorneys are licensed in specific jurisdictions; we do not seek to represent anyone in a jurisdiction where this Site fails to comply with applicable rules.",
    ],
  },
  {
    id: "terms-06",
    num: "06",
    indexLabel: "Intellectual property",
    title: "Intellectual property",
    summary:
      "The content, design, and ATLAW name are ours. Read and share links freely; don’t copy or reuse the material commercially.",
    paragraphs: [
      "All content on this Site — including text, graphics, logos, images, page layouts, and the selection and arrangement thereof — is the property of ATLAW Group, PLLC or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.",
      "The ATLAW name, ATLAW logo, and all related names, logos, product and service names, designs, and slogans are trademarks of ATLAW Group, PLLC. You may not use such marks without our prior written permission.",
      "You are granted a limited, revocable, non-exclusive license to access and view the Site for personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any material on the Site without our prior written consent, except that you may print or download one copy of a reasonable number of pages for your own personal, non-commercial use and not for further reproduction, publication, or distribution.",
    ],
  },
  {
    id: "terms-07",
    num: "07",
    indexLabel: "Acceptable use",
    title: "Acceptable use",
    summary:
      "Don’t misuse the site — no scraping, no hacking, no impersonation, no unlawful use.",
    paragraphs: [
      "You agree to use the Site only for lawful purposes and in accordance with these Terms of Use. You agree not to: (a) use the Site in any way that violates any applicable federal, state, or local law or regulation, including Michigan law; (b) impersonate or attempt to impersonate ATLAW, an ATLAW employee, another user, or any other person or entity; (c) engage in any conduct that restricts or inhibits anyone’s use or enjoyment of the Site; (d) use any robot, spider, scraper, or other automated means to access the Site for any purpose without our express written permission; (e) introduce any viruses, trojan horses, worms, or other material that is malicious or technologically harmful; or (f) attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.",
    ],
  },
  {
    id: "terms-08",
    num: "08",
    indexLabel: "Third-party links",
    title: "Third-party links & services",
    summary:
      "We link to outside sites and use a third-party intake form provider. We don’t control them and aren’t responsible for them.",
    paragraphs: [
      "The Site may contain links to third-party websites, services, or content that are not owned or controlled by ATLAW, including but not limited to our third-party intake form provider (CXP Legal Tech, used for the free case review forms), Google Maps, and external legal resources. ATLAW has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.",
      "Your use of any third-party website or service is at your own risk and subject to that third party’s terms and policies. We encourage you to review the terms of use and privacy policies of any third-party site you visit. A link from this Site does not imply endorsement, authorization, sponsorship, or affiliation with the linked site or its operators.",
    ],
  },
  {
    id: "terms-09",
    num: "09",
    indexLabel: "Disclaimers",
    title: "Disclaimers",
    summary:
      "The site is provided as-is. We work to keep it accurate but can’t warrant that everything is complete, current, or error-free.",
    paragraphs: [
      "THE SITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SITE ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.",
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ATLAW DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. ATLAW DOES NOT WARRANT THAT THE SITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.",
      "Nothing in this disclaimer limits or excludes any liability that cannot be limited or excluded under applicable Michigan or federal law.",
    ],
  },
  {
    id: "terms-10",
    num: "10",
    indexLabel: "Limitation of liability",
    title: "Limitation of liability",
    summary:
      "To the extent the law allows, we’re not liable for damages arising from your use of the website itself.",
    paragraphs: [
      "TO THE FULLEST EXTENT PERMITTED BY MICHIGAN AND APPLICABLE FEDERAL LAW, IN NO EVENT SHALL ATLAW GROUP, PLLC, ITS ATTORNEYS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SITE OR ANY CONTENT ON THE SITE.",
      "This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, and whether or not ATLAW has been advised of the possibility of such damage. This limitation of liability does not apply to any liability that cannot be excluded or limited under applicable law, and nothing herein limits ATLAW’s professional responsibilities under the Michigan Rules of Professional Conduct.",
    ],
  },
  {
    id: "terms-11",
    num: "11",
    indexLabel: "Governing law",
    title: "Governing law & disputes",
    summary: "Michigan law governs these terms. Disputes go to Wayne County courts.",
    paragraphs: [
      "These Terms of Use and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of the State of Michigan, without regard to its conflict-of-law provisions.",
      "Any legal action or proceeding arising under these Terms of Use shall be brought exclusively in the state or federal courts located in Wayne County, Michigan, and you consent to the personal jurisdiction and venue of such courts. You waive any objection to the laying of venue of any such action or proceeding in such courts.",
    ],
  },
  {
    id: "terms-12",
    num: "12",
    indexLabel: "Changes",
    title: "Changes to these terms",
    summary:
      "If we update these terms, we’ll change the date at the top. Continued use means you accept the update.",
    paragraphs: [
      "We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when posted on this page, and apply to all access to and use of the Site thereafter. The “Last updated” date at the top of this page indicates when these Terms were last revised.",
      "Your continued use of the Site following the posting of revised Terms of Use means you accept and agree to the changes. You are expected to check this page periodically so you are aware of any changes, as they are binding on you.",
    ],
  },
  {
    id: "terms-13",
    num: "13",
    indexLabel: "Contact",
    title: "Contact",
    summary: "Questions about these terms? Email us.",
    paragraphs: [
      `Questions regarding these Terms of Use may be directed to ${EMAIL} or ATLAW Group, PLLC, 3 Park Lane Blvd Suite 400W, Dearborn, MI 48126.`,
    ],
  },
];
