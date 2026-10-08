# Progress Tracker

## Current Phase: Phase 1 — PI Pivot

### Completed

- [x] Read all project materials (meeting notes, briefs, staff directory, photos, logos)
- [x] Read existing codebase (`atlaw_start/`)
- [x] Analyze Mike Morris website (166 screenshots, 20 page types, 5 parallel analyses)
- [x] Create context files (project-overview, architecture, code-standards, ui-context, ai-workflow-rules)
- [x] Create Mike Morris design reference (`context/mike-morris-reference.md`)
- [x] Write feature spec 01 — PI Pivot Navigation
- [x] Write feature spec 02 — Homepage Rebuild (updated with Mike Morris patterns)
- [x] Write feature spec 03 — PI Practice Area Pages (updated with 14-section template)
- [x] Write feature spec 04 — SEO City Landing Pages (updated with Areas Served index)
- [x] Write feature spec 05 — About & Team Pages (updated with founder-as-brand pattern)
- [x] Write feature spec 06 — Contact & Intake (updated with Mike Morris contact pattern)
- [x] Write feature spec 07 — SEO Meta & Schema
- [x] Write feature spec 08 — Photo Asset Integration
- [x] Write feature spec 09 — Legal Compliance

- [x] Implement Spec 01 — PI Pivot Navigation (June 22, 2026)
  - Navigation data: stripped to PI, ABOUT, OUR TEAM, CONTACT
  - Header: removed mega-menu/dropdowns, direct links only, mobile drawer simplified
  - Footer: PI sub-areas only, updated firm description, removed Global Reach/News links
  - Routes: `/personal-injury/*` structure, `/team` replaces `/our-people`, legacy redirects
  - Deleted: CapabilitiesMegaMenu, NewsInsightsDropdown, MobileDrawer, useCategoryGroups, Icons (header/)
  - Created: PremisesLiabilityPage, DogBitesPage stub pages
  - Removed routes: all non-PI practice areas, global-reach, news-insights, capabilities landing

- [x] Implement Spec 02 — Homepage Rebuild (June 22, 2026)
  - 12-section homepage mirroring Mike Morris depth with ATLAW branding
  - Hero: dark bg, Dewnya cutout right, PI headline, gold CTA → Typeform, stat bar
  - TrustBar: "Awarded. Featured. Trusted." with Super Lawyers, Avvo, NAOPIA badges
  - CaseResultsSection: 3-card carousel, insurance offer vs. ATLAW recovery, [CONFIRM] placeholders
  - CapabilitiesSection: 2×3 PI icon card grid, light gray bg, links to sub-practice pages
  - AboutDewnyaSection: two-column bio + portrait, PI-focused, "See More" toggle, stats strip
  - NoFeeBanner: navy full-width "NO FEES. NO RISK." with Call/Email buttons
  - ProcessSection: 4-step cards (Call, Investigate, Fight, Recover)
  - TestimonialsSection: 3-card carousel with gold stars, [CONFIRM] placeholder quotes
  - FAQPreviewSection: 5-question accordion, light gray bg
  - IntakeFormSection: dark section with portrait bg, "See How Much We Can Win" + Typeform CTA
  - FinalCtaSection: navy gradient, "FREE Case Evaluation", gold Call button, phone band
  - Removed from homepage: OneFirmSection, FirmStatementSection, RecognitionSection, ServiceAreas
  - All [CONFIRM] placeholders clearly marked for client approval
  - CTA appears every 2-3 sections, phone number repeated 3+ times
  - Zero build errors, zero TypeScript errors

- [x] Homepage Enhancement — Mike Morse Alignment (June 23, 2026)
  - Hero stat bar: replaced static "Super Lawyers" text with 4 animated counter stats (Founded 2013, Avvo 10.0, 3× Super Lawyers, Top 10 Under 40)
  - AwardsMarquee: replaced static TrustBar with CSS-animated auto-scrolling award badges (marquee pattern from Morse)
  - HiringUsSection: NEW — dark bg "Hiring Us Means More Money" visual comparison (insurance offer $15K → ATLAW recovered $127.5K), [CONFIRM] placeholders
  - WinningsTicker: NEW — auto-scrolling horizontal strip of dollar amounts with case types (dark bg, gold numbers), [CONFIRM] placeholders
  - MobileFloatingCTA: NEW — fixed-position pulsing gold phone button on mobile (<1024px), always visible
  - Tailwind config: added marquee, marquee-slow, pulse-glow keyframe animations
  - Section reorder to match Morse flow: Hero → Awards → Results → NoFee → Capabilities → HiringUs → About → Testimonials → Process → WinningsTicker → Intake → FAQ → FinalCTA
  - Removed TrustBar import (replaced by AwardsMarquee)
  - Zero build errors, zero TypeScript errors

- [x] Implement Spec 03 — PI Practice Area Pages (June 23, 2026)
  - PracticeAreaDetailTemplate: 14-section reusable template component
    - StickySubNav: dark navy bar, 5 anchor tabs (Overview/What To Do/Testimonials/FAQ/Related), IntersectionObserver active highlighting, gold underline
    - Hero: light bg, breadcrumb nav, clamp-sized h1, gold social proof line, dark CTA pill → Typeform
    - Overview: two-column (62%/35%), "Why Choose ATLAW?" content left, sticky sidebar CTA right (3 gold buttons: Call/Email/Free Case Review), collapses inline on mobile
    - CaseResultsComparison: dark navy bg, 3-card carousel with prev/next, insurance offer (struck through) vs recovered amount, gold case type pill, [CONFIRM] placeholders
    - WhatToDoSteps: 4 navy gradient step cards + No Fee Banner (full-width dark strip with Call/Email)
    - LongFormContent: Michigan law sections, serif headings, centered max-width column, CTA at bottom
    - Testimonials: light gray bg, 3-card carousel with gold stars, speech bubble cards with avatar pointers, pagination, [CONFIRM] placeholders
    - FAQAccordion: 10-15 questions per page, CSS grid-rows animation, chevron rotation, proper aria-expanded
    - RelatedCasesStrip: dark navy bg, horizontal scroll with prev/next, dollar amounts + case types, [CONFIRM]
    - RelatedPages: 3-card grid linking to sibling sub-practices, dark navy cards with gold "Learn More"
    - IntakeForm: dark section with Dewnya portrait bg, Typeform CTA, "See How Much We Can Win"
    - AdditionalResources: two-column bulleted links to other practice areas
    - CityLinks: pill-shaped city links grid, routes to city SEO pages
    - FinalCTABand: navy gradient, gold Call + ghost Email buttons, phone number band
  - 7 data files in src/data/practice/pi/:
    - personal-injury.ts — landing page, links to all 6 sub-practices
    - auto-accidents.ts — Michigan No-Fault, PIP, mini-tort, 15 FAQs
    - medical-malpractice.ts — NOI/Affidavit of Merit, 2-year SOL, 10 FAQs
    - wrongful-death.ts — MCL 600.2922, estate vs survivor damages, sensitive tone, 10 FAQs
    - premises-liability.ts — invitee/licensee/trespasser duty, comparative fault, 10 FAQs
    - dog-bites.ts — MCL 287.351 strict liability, insurance coverage, 10 FAQs
    - workers-compensation.ts — no-fault system, denial appeals, retaliation protections, 12 FAQs
  - PracticeAreaPI type interface at src/data/practice/pi/types.ts
  - All 7 screen files rewritten to use template + data pattern
  - Unique h1, seoTitle, seoDescription per page
  - CTA every 2-3 sections (5+ per page)
  - Related practice areas link to siblings
  - City links connect to city SEO pages
  - [CONFIRM] placeholders on case results, testimonials, related cases
  - Mobile responsive (sidebar collapses inline)
  - pi-reveal CSS animations (existing PersonalInjury.css)
  - Zero TypeScript errors, zero build errors

- [x] Implement Spec 04 — SEO City Landing Pages (June 23, 2026)
  - CityData interface + 7 city data objects in `src/data/cities.ts`
    - Dearborn, Detroit, Dearborn Heights, Ann Arbor, Wayne County, Oakland County, Macomb County
    - Each: slug, name, county, localContext (3 paragraphs), localExpertise (6 bullets), nearbyLandmarks, localCourts, hospitals, faqs (6 city-specific FAQs)
  - Practice area slug→data lookup in `src/data/practice/pi/index.ts`
  - CityLandingTemplate: 10-section template in `src/components/ATLAW/CityLandingTemplate.tsx`
    - Hero: breadcrumb (ATLAW > PI > Practice > City), city-specific h1, tagline, gold CTA → Typeform
    - StatsBar: Founded 2013, county, Super Lawyers, Avvo 10.0
    - CityContext: two-column (62%/35%), city-specific paragraphs left, sticky sidebar CTA right
    - PracticeOverview: reuses parent practice area overview + first Michigan law section, localized heading
    - LocalExpertise: 2-col grid of 6 city-specific bullet cards
    - CaseResults: 3-card carousel with insurance offer vs. recovered, [CONFIRM] placeholders
    - CityFAQ: 6 city-specific questions, accordion with CSS grid-rows animation
    - OtherPracticeAreas: 3-col card grid linking to other PI sub-practices in same city
    - OtherCities: pill-shaped links to same practice area in other cities
    - IntakeForm + FinalCTABand: dark section with Dewnya portrait bg, Typeform CTA, phone band
  - CityLandingPage screen: reads `:practice` and `:city` params, looks up both, 404 → redirect if invalid
  - AreasServedPage: hero + sticky sidebar nav (7 cities) + stacked city cards with county/context/learn more
  - Routes added: `/personal-injury/:practice/:city` → CityLandingPage, `/areas-served` → AreasServedPage
  - Footer updated: "Areas Served" link added to company links
  - Unique `<title>` and meta description per city page
  - CTA appears every 2-3 sections (5+ per page)
  - Internal linking: practice ↔ city, city ↔ sibling cities, city ↔ other practices
  - [CONFIRM] placeholders on case results
  - Mobile responsive (sidebar collapses inline)
  - 7 practice areas × 7 cities = 49 city pages + 1 areas-served index
  - Zero TypeScript errors, zero build errors

- [x] Implement Spec 05 — About & Team Pages (June 23, 2026)
  - About page rebuilt with 8 sections per spec:
    - Hero: dark overlay on group photo, "Our Story" heading, firm mission subtitle
    - Founder Feature: two-column (55%/45%), "Hi, I'm Dewnya Bazzi." personal heading, gold "Founder & CEO", multi-paragraph bio with "unreasonable hospitality" philosophy, "See More" expandable, navy CTA → /contact
    - Timeline: vertical timeline layout, 6 milestones (2013 founding → 2026 3rd Rising Star), gold year markers, navy dot on vertical line, alternating left/right on desktop, mobile single-column
    - Firm Values: 3 cards with icons (Unreasonable Hospitality, Strategic Advocacy, Cultural Awareness)
    - Awards/Media Strip: "Awarded. Featured. Trusted." + 5 gold badge chips (SL 2024-2026, Avvo, NAOPIA)
    - By The Numbers: navy stats strip (Founded 2013 · 29 Team Members · Dearborn, MI · 3× Rising Star)
    - Inline Intake CTA: dark section with Dewnya portrait bg, Typeform CTA, phone number
    - Footer
  - Team page rebuilt with 6 sections per spec:
    - Hero: dark overlay on group photo, "Meet Your Team" centered, subtitle
    - Founder Feature Card: full-width white card, two-column (bio left 55%, photo right 45%), name in large serif, gold "Founder & CEO", shorter bio, navy "View Full Bio" → /about
    - Attorneys Grid: 3 columns centered, circular-cropped headshots (Deanna Leila, Hassan Harp, Ahmad Berry)
    - Key Staff Grid: 4 columns, circular headshots (Lamis Baydoun, Abeer Almalahi, Mazen Alsamawi, Madison Misovich)
    - Bottom CTA: "Get a FREE Case Evaluation Today!" + CALL/EMAIL buttons + phone band
    - Footer
  - Team data rebuilt: typed TeamMember interface, founder/attorneys/staff arrays, PI-focused team only
  - 13 photos converted from source JPGs to AVIF in public/assets/team/
    - Professional Headshots: 10 team members (dewnya-bazzi, deanna-leila, hassan-harp, ahmad-berry, lamis-baydoun, abeer-almalahi, mazen-alsamawi, madison-misovich, deema-ghamloush, mahmoud-mansour)
    - DB Creative Shots: 2 Dewnya feature photos (dewnya-creative-1, dewnya-creative-2)
    - Group Shot: 1 team photo (group-shot) for hero backgrounds
  - About data rebuilt: timeline events, firm values, founder bio content, by-the-numbers stats
  - Removed: old multi-location team data (Dubai/Manila/Baghdad/Kuwait/Beirut), OurPeoplePieces component, ServiceAreas import, location filters
  - Unique SEO titles and meta descriptions per page
  - Mike Morris patterns followed: founder card above grid, circular headshots, dark hero with overlay, vertical timeline with year markers, personal storytelling
  - No "100+ team members," no "Dubai/Manila" — accurate PI-focused team only
  - Bio tone: warm, personal, "unreasonable hospitality" — not corporate
  - Mobile responsive (single-column on mobile, full grid on desktop)
  - Zero TypeScript errors, zero build errors

- [x] Implement Spec 06 — Contact & Intake (June 23, 2026)
  - Full rewrite of ContactPage with 8 sections per spec:
    - ContactHero: dark bg with Dewnya photo overlay, two-column (left text + right CTA card), gold "Start Your Free Case Review" → Typeform popup card with glassmorphic border
    - StatsBar: white strip with Founded 2013 · Dearborn, MI · Super Lawyers Rising Star · Avvo 10.0, gold dot separators
    - DirectContact: "3 Ways to Reach Us" — 3 icon cards (Call/Email/Visit) with gold icon circles, hover lift, clickable links
    - WhatToExpect: "What Happens Next" — 3 navy gradient step cards (Free Consultation → Case Evaluation → We Get to Work) matching ProcessSection pattern
    - OfficeLocation: two-column (Google Maps embed left, group photo + address/phone/email right), serving Michigan cities note
    - ReassuranceSection: navy bg, centered "You Don't Pay Unless We Win." white serif, confidentiality message, gold Typeform CTA
    - ContactFAQ: 6 intake-specific questions, accordion with CSS grid-rows animation, chevron rotation, proper aria-expanded
    - IntakeCTA: dark section with Dewnya portrait bg, "Get a FREE Case Evaluation Today!" + Call/Email buttons + phone number band
  - Typeform integration: popup-style CTA card in hero, direct link buttons throughout, URL = https://j098jiq3pk7.typeform.com/to/Mslg7Y7f
  - Contact info updated: phone (313) 406-7606, email db@atlawgroup.com, address 3 Park Lane Blvd Suite 400W
  - MobileFloatingCTA included for persistent mobile phone button
  - Phone number visible without scrolling (hero + direct contact)
  - CTA appears every 2-3 sections (hero, reassurance, intake — 3+ CTAs)
  - "No fee unless we win" messaging in hero, reassurance, and intake sections
  - Mike Morris patterns followed: dark hero with form/CTA, stats bar, office section, FAQ accordion
  - Removed old ContactForm (custom form replaced by Typeform), removed ServiceAreas import
  - Motion primitives: RevealText, RevealBlock, RevealStagger with consistent grain overlay
  - Mobile responsive (single-column → two-column on lg)
  - Zero TypeScript errors, zero build errors

- [x] Implement Spec 07 — SEO Meta & Schema (June 23, 2026)
  - Installed `react-helmet-async` for full `<head>` management
  - Created `PageMeta` component (`src/components/ATLAW/PageMeta.tsx`):
    - Props: title, description, canonical, schema (single or array), ogImage, ogType
    - Renders: `<title>`, meta description, canonical link, OG tags, Twitter card, JSON-LD structured data
    - Default OG image: `/assets/atlaw-og-share.png`
    - Base URL: `https://atlawgroup.com`
  - Wrapped app with `<HelmetProvider>` in `src/index.tsx`
  - Created `src/data/schema-org.ts` with Schema.org structured data generators:
    - `homepageSchema()` — LegalService with full firm details
    - `practiceAreaSchema()` — LegalService per practice area
    - `cityPracticeSchema()` — LegalService with city-specific areaServed
    - `attorneySchema()` — Attorney (Dewnya Bazzi) with awards
    - `aboutPageSchema()` — Organization with founding details
    - `contactPageSchema()` — LegalService with contact info + hours
  - Added `<PageMeta>` to all 15 active pages:
    - Homepage: unique title + LegalService schema
    - 7 PI practice area pages: seoTitle from data + practiceAreaSchema
    - City landing pages (49 dynamic): city+practice title + cityPracticeSchema
    - About page: Organization schema
    - Team page: Attorney schema
    - Contact page: LegalService + contact schema
    - Areas Served page
    - Privacy Policy page
    - Terms of Use page
  - Replaced all `document.title` / `querySelector('meta[name="description"]')` patterns with Helmet
  - Open Graph tags on every page: og:title, og:description, og:image, og:type, og:site_name, og:url
  - Twitter Card tags on every page: summary_large_image
  - Fixed `index.html`: removed duplicate charset/viewport, updated default title, added OG defaults
  - Created `public/robots.txt`: Allow all crawlers, Sitemap reference
  - Created `public/sitemap.xml`: 63 URLs (7 static + 7 practice areas + 49 city pages)
  - Every page has unique `<title>` and meta description — no duplicates
  - Zero build errors

- [x] Implement Spec 08 — Photo & Asset Integration (June 23, 2026)
  - Dewnya Creative Shots: 5 selected from 18, converted to AVIF, placed in `public/assets/dewnya/`
    - dewnya-standing-black (IMG_5303) — full-body black suit, hero/featured
    - dewnya-seated-desk (IMG_5341) — warm approachable desk shot, about section
    - dewnya-chair-portrait (IMG_5377) — white suit chair portrait, founder feature
    - dewnya-navy-pinstripe (IMG_5585) — navy close-up, intake backgrounds
    - dewnya-merch-branded (IMG_5633) — ATLAW merch shop, brand imagery
  - Office Photos: 6 selected from 24, converted to AVIF, placed in `public/assets/office/`
    - office-entrance-sign (DSC06554) — AT LAW GROUP entrance sign
    - office-case-posters (DSC06558) — client case story posters
    - office-tagline-poster (DSC06562) — "If it's law, it's ATLAW" poster
    - office-reception-entry (DSC06572) — reception through glass doors
    - office-reception-desk (DSC06574) — reception desk with 3D ATLAW letters
    - office-lounge-area (DSC06576) — client lounge with case posters
  - Corporate Portrait: Dewnya Bazzi white-bg cutout → `hero/dewnya-corporate-cutout.avif` + `dewnya/dewnya-corporate-portrait.avif`
  - Team additions: nehme-bazzi.avif, team-composite-2026.avif, group-shot-hero.avif
  - Image replacements:
    - Hero cutout: `atlaw-portrait.png` → `hero/dewnya-corporate-cutout.avif` (real corporate portrait)
    - Hero background: `hero/office-hero-bg.jpg` → `office/office-reception-desk.avif` (real office)
    - About Dewnya: `dewnya-creative.jpg` → `dewnya/dewnya-seated-desk.avif`
    - Intake backgrounds (5 files): `dewnya-intake-bg.avif` → `dewnya/dewnya-navy-pinstripe.avif`
    - About founder: `team/dewnya-creative-1.avif` → `dewnya/dewnya-chair-portrait.avif`
    - Team page founder: `team/dewnya-creative-2.avif` → `dewnya/dewnya-standing-black.avif`
    - Contact office: `team/group-shot.avif` → `office/office-reception-desk.avif`
  - LCP hero images preloaded in `index.html` (updated to new paths)
  - All images AVIF format, quality 75-80, max 1920px wide (heroes) / 800px (portraits)
  - Conversion script: `scripts/convert-photos.mjs`
  - Originals untouched in `Website Materials/`
  - Team headshots already done in Spec 05 — kept as-is
  - Existing SVG logos kept per spec (no updated versions from client)
  - No broken image links — all 12 code references verified against actual files
  - Zero TypeScript errors, zero build errors

- [x] Implement Spec 09 — Legal Compliance (June 26, 2026)
  - Attorney Advertising Disclaimer: updated Footer to full Michigan-compliant text
    - "This website is attorney advertising and for general information only. It is not legal advice and does not create an attorney-client relationship. Past results do not guarantee future outcomes."
    - Persists on every page via global Footer component
  - Privacy Policy (`/privacy`): full Michigan-compliant rewrite
    - EMAIL updated to db@atlawgroup.com per spec
    - All 12 sections filled with real legal content (no pending sections)
    - Removed Dubai/Manila/international references (PI-only single-office)
    - Section 09 renamed "Where data is stored" — US-only
    - Cookie table updated: __session, Google Analytics (_ga), Typeform (tf_*)
    - Typeform mentioned as third-party intake service
    - Contact address: 3 Park Lane Blvd Suite 400W, Dearborn, MI 48126
    - LAST_UPDATED set to June 26, 2026
  - Terms of Use (`/terms`): full Michigan-specific rewrite
    - All 13 sections filled with substantive content (no pending sections)
    - Section 05: attorney advertising notice with Michigan MRPC reference
    - Section 11: Michigan law governs, Wayne County venue
    - Section 08: mentions Typeform, Google Maps as third-party services
    - Contact address and email updated
    - LAST_UPDATED set to June 26, 2026
  - Case Results Disclaimer added to 6 locations:
    - CaseResultsSection (homepage)
    - CaseResultsComparison (practice area template)
    - CaseResultsSection (city landing template)
    - HiringUsSection (homepage)
    - WinningsTicker (homepage, sr-only)
    - RelatedCasesStrip (practice area template)
    - Text: "Case results depend on a variety of factors unique to each case. Case results do not guarantee or predict a similar result in any future case."
  - Testimonial Disclaimer added to 2 locations:
    - TestimonialsSection (homepage)
    - TestimonialsSection (practice area template)
    - Text: "Testimonials or endorsements do not constitute a guarantee, warranty, or prediction regarding the outcome of your legal matter."
  - Fee Language: NoFeeBanner "You Only Pay When We Win" — approved PI fee language kept
  - ADA Compliance:
    - Global `:focus-visible` style: 2px solid gold (#C9A24B) outline, 2px offset
    - Skip-to-content link: keyboard-accessible, visible on focus, targets #main-content
    - `id="main-content"` added to `<main>` on all 15 active pages
    - All decorative images already have `alt=""` + `aria-hidden="true"` (correct per WCAG)
    - All interactive elements already use `focus-visible:` Tailwind classes
    - Screen reader landmarks: `<header>`, `<main>`, `<footer>`, `<nav aria-label>`, `<section aria-labelledby>` throughout
    - `aria-expanded` on all accordions and mobile menu
    - Print stylesheets on Privacy and Terms pages
  - Zero TypeScript errors, zero build errors

### Next — Implementation Order

All Phase 1 specs (01–09) complete. Open questions resolved (see below).

- [x] Open-Questions Resolution — Client Answers Implemented (July 14, 2026)
  - **Credibility metrics** (real, client-confirmed): 538 Cases Closed · $7,163,973 Recovered
    - NEW ResultsStatBar on homepage (after AwardsMarquee): 3 animated counters (538 / $7,163,973 / 2013) + case-results disclaimer
    - About "By The Numbers" strip: added Cases Closed 538 + Recovered $7,163,973
    - Counter primitive enhanced: thousands separators via toLocaleString (also fixes HiringUsSection $127,500)
    - Per-case results & testimonials LEFT AS TEMPLATE per client ([CONFIRM] placeholders retained — testimonial copy still in progress)
  - **Intake forms** — replaced single Typeform link with 3-language CXP Legal Tech forms (EN/AR/ES)
    - `src/data/intake.ts` — form URLs + language config
    - NEW `IntakeModal.tsx` — language-choice popup (external store + `openIntakeModal()`), mounted once at app root
    - ALL intake CTAs sitewide converted from `<a href=Typeform>` to `<button onClick={openIntakeModal}>` (Hero, IntakeFormSection, HiringUsSection, PracticeAreaDetailTemplate ×4, CityLandingTemplate ×5, ContactPage ×3, AreasServedPage, about/sections)
    - Legal text (privacy, terms) updated: Typeform → CXP Legal Tech; removed tf_* cookie row (forms now external)
    - Dead GlobalReach/OurPeople Typeform consts removed/left (unrouted)
  - **Office hours** — 9 AM – 5 PM, Mon–Fri
    - Contact page: Call card secondary + OfficeLocation hours row (clock icon)
    - Footer: office hours line added
    - Schema already had `Mo-Fr 09:00-17:00`
  - **City pages content** — city-specific photos integrated (Areas Served folder)
    - 8 photos → AVIF in `public/assets/cities/` via `scripts/convert-city-photos.mjs`
    - City landing hero: framed 16:7 city banner with "Serving {city} & {county}" caption
    - AreasServedPage: real city photo as card background (navy overlay) + Michigan photo in hero
  - **Blog** — full press-release build
    - `src/data/news.ts` — NewsPost model + 3 DRAFT releases (grounded in confirmed facts, flagged for client copy)
    - NEW `/news` (NewsPage index) + `/news/:slug` (NewsPostPage article template, dateline, related, NewsArticle schema)
    - Nav "NEWS" link + Footer "News" link + sitemap (4 URLs) + `newsArticleSchema()` generator
  - **Team page scope** — confirmed attorneys + key PI staff only (already built in Spec 05, no change)
  - Bonus fixes found while editing: Footer "Headquarters: Detroit, MI" → correct Dearborn address; map URL + Dearborn city data suite "1500" → "400W"
  - Zero TypeScript errors, zero build errors

### Phase 2 — Launch build (Oct 7–30, 2026 · branch `mo-dev`)

Plan: `context/project-plan.md` and `context/ATLAW-Build-Plan-Developer-SEO-Scope.pdf`.

- [x] Day-1 setup (Oct 7, 2026)
  - `package-lock.json`: 79 URLs moved from `registry.npmmirror.com` to `registry.npmjs.org` (versions and integrity unchanged; clean `npm ci` verified)
  - `npm run build` clean; one pre-existing TS error in unrouted `src/screens/global-reach/shared.tsx`
- [x] Navigation and UX — loading screen and header (Oct 7, 2026)
  - Deleted `NavigationLoader` (700 ms full-screen overlay on every route change + same-page reload) and `LoaderOverlay`
  - New `RouteProgressBar`: thin top bar used as the `<Suspense>` fallback
  - `BrowserRouter` runs with `v7_startTransition`, so the current page stays visible while the next chunk loads
  - Header: removed the GSAP hide-on-scroll; header always pinned, scroll only toggles the blurred background (now also with reduced motion)
  - `SmoothScroll` (protected, changed per build plan): Lenis off on touch devices and below 1024px; `lerp` 0.1 → 0.15 (the old `duration` was ignored by Lenis)
- [x] 404 page (Oct 7, 2026)
  - New `NotFoundPage` (noindex): message, homepage + call CTAs, links to PI, Areas Served, Team, Contact
  - `<Route path="*">` catch-all; unknown URLs no longer render a blank page
  - Invalid `/personal-injury/:practice/:city` and `/news/:slug` render the 404 instead of redirecting
  - `PageMeta` gained a `noindex` prop (also needed later for unapproved pages)
  - Verified in headless Chrome: 3 bad URLs show the 404 with `robots: noindex`; valid city page unaffected; desktop + mobile layout checked
  - Still open: real 404 HTTP status (needs `dist/404.html` from prerender + Vercel config)
- [x] Header dropdown menus (Oct 8, 2026)
  - PRACTICE AREAS: groups Auto & No-Fault / Injury / Medical / Work & Disability + "All personal injury cases"
  - AREAS WE SERVE: one column per county (county heading links to the county page) + "All areas we serve"
  - Generated from new `src/data/practice/pi/registry.ts` and `src/data/cities-registry.ts` (new practices/cities appear automatically; main bundle +2.5 kB gzip)
  - City links point to `/personal-injury/personal-injury/:city` via `cityHref()`; switch to `/areas-served/:city` when hubs exist
  - Mobile drawer: accordion sections; desktop: hover/click, Enter/Tab/Escape keyboard support, `aria-expanded`
  - Verified with a headless-Chrome script: hover/pin/leave, link click closes panel, keyboard open/Tab/Escape with focus return, 1024px header fits (0 overflow), 390px drawer with no horizontal scroll
- [x] Call / Free Case Review on every breakpoint (Oct 8, 2026)
  - Layout chosen with Mo instead of the plan's top strip (a top strip would push every hero and sticky offset by 36px)
  - Desktop header: phone cell + solid gold "Free Case Review" (opens intake modal), replacing "I need help"
  - Mobile (<1024px): new `MobileActionBar` fixed to the bottom of every page — Call | Free Case Review; footer spacer; back-to-top lifted above it
  - Removed `MobileFloatingCTA` (was only on 4 pages; the bar covers it everywhere)
  - New `src/data/contact.ts` (phone + `SMS_NUMBER`); **Text Us is built but hidden** until `SMS_NUMBER` is set — see Open Questions
  - Verified: header fits at 1024/1280/1440 (0 overflow), both Free Case Review buttons open the modal, 390px bar 60px at bottom, no horizontal scroll
- [x] Stats: "13 Years Serving Clients"; unverified totals held (Oct 9, 2026) — revision brief C
  - New `src/data/firm.ts`: `YEARS_SERVING = 13` (bump yearly) and `VERIFIED_TOTALS = null`
  - "Since 2013 / Founded 2013" stats → 13 years on the homepage hero strip, homepage stat bar, homepage Dewnya section, About numbers, Contact stats and city-page badges
  - Cases closed / total recovered (10,000+ / $100M+) hidden until the firm confirms exact figures; set `VERIFIED_TOTALS` to show them (the case-results disclaimer returns with them)
  - Homepage stat bar meanwhile: 13 Years Serving Clients · 10.0 Avvo Rating · 3× Super Lawyers Rising Star
  - Kept as history: About timeline "2013" and Dewnya's "I founded ATLAW in 2013"
  - Still open: the draft news post "ATLAW Surpasses $7 Million…" quotes 538 / $7,163,973 (handled with the news-posts task)
  - Verified: built bundle has no "10,000" / "$100M"; screenshots of all six places on desktop + mobile
- [x] Header/footer kept out of the 1.12 zoom (Oct 9, 2026)
  - Homepage and Contact wrapped the whole page, header and footer included, in `[zoom:1.12]`, so the header was 12% larger there and "Free Case Review" was cut off at 1440px
  - Zoom moved to `<main>` on both pages: content keeps its approved scale; header and footer are identical on every page
  - Verified: header overflow 0 and height 89px on /, /contact and /about at 1024/1280/1440
- [x] Results: approved headline, no invented results (Oct 9, 2026) — revision brief D
  - New `src/data/caseResults.ts` (`approvedCaseResults`, empty) is the only source for results; new `src/data/testimonials.ts` holds the real Google reviews, shared by `TestimonialsSection` and the homepage results section
  - Headline "They Offered Less. We Fought for More." → "Insurance companies fight to pay less. ATLAW fights for what you deserve." (homepage, practice and city templates)
  - Homepage results section: shows approved results when there are any; until then 3 real Google reviews (Mike Esseily, Prophet J.E. Lykes Sr., Moe Fares)
  - "Hiring Us Means More Money." → "Hiring ATLAW Means More Money for You and Your Family." (brief: name the beneficiary); "We don't let them" → "ATLAW doesn't let them"; the invented $15,000 → $127,500 example only renders for an approved result with an insurer offer
  - `WinningsTicker` reads approved results only and renders nothing while empty
  - Practice and city results sections hide while empty; "Recent Case Results — [CONFIRM]" heading fixed
  - Deleted invented data from all 7 practice files: `caseResults`, `relatedCases` and the unrendered `[CONFIRM]` testimonials (they still shipped in the bundle)
  - Verified: built bundle has no "CONFIRM", "Sarah M.", "Offered Less" or "15,000"; screenshots desktop + mobile; practice and city pages render without the results blocks
- [x] Unverified claims removed (Oct 9, 2026)
  - "You Pay Nothing Unless We Win Your Case — Guaranteed." → "…Your Case." on the homepage final CTA, practice and city templates (no outcome guarantees)
  - Dearborn city copy: removed "steps from the 19th District Court" (×4), "directly off Michigan Avenue" and "Free parking is available on-site"; the office FAQ now gives the address and office hours (Mon–Fri 9–5, from the firm's brief); court names kept
  - Left for the copy rewrite (approximate, not location facts): Detroit "less than 15 minutes from downtown", Dearborn Heights "one of the closest personal injury law firms"
  - Verified: none of the removed phrases in the built bundle or on /, a practice page and the Dearborn page

### Open Questions

- [ ] **PRE-LAUNCH — Text Us number.** Confirm with the firm whether (313) 406-7606 can receive SMS, or get a dedicated SMS number. Then set `SMS_NUMBER` in `src/data/contact.ts` (the Text buttons in the header and mobile bar appear automatically).

- [ ] **Testimonials copy** — still pending from client; homepage + practice-area testimonials remain [CONFIRM] template (client working on copy).
- [ ] **Email inconsistency** (pre-existing, needs client decision) — site mixes `info@atlawgroup.com` (Footer, templates, NoFeeBanner) and `db@atlawgroup.com` (Contact, legal, schema). Not changed — confirm which is the public contact address, then standardize.
- [ ] **News content** — 3 press releases are DRAFTS built from confirmed facts. Replace with client-approved announcements as issued.

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| PI-only site | Yes | Meeting directive — no Visionary Builders, no coaching |
| Dubai/Manila removed | Yes | Single office: Dearborn |
| Model site | mikemorris.com | Client directive from meeting |
| Intake method | CXP Legal Tech, 3-lang (EN/AR/ES) | Client-confirmed forms; language-choice modal replaces Typeform |
| Design system | Keep existing navy/gold/white | Already built, works well |
| Animation system | Keep GSAP/ScrollTrigger | Already built, well-structured |
| Photo format | AVIF primary | Existing pipeline with sharp scripts |
| Tone | "Unreasonable hospitality" | Will Guidara book — warm, strategic, client-first |
| Staff count display | 29 (real) not "100+" | Accuracy over inflation |

### Session Notes

- Client meeting (June 17, 2026) confirmed PI-only pivot. Dewnya Bazzi made the decision.
- Sam Kassem leading project from agency side. Arlyn Dungao is firm-side contact.
- Updated photos, headshots, and brand guide available in `Website Materials/ATLAW Updated Photos/`.
