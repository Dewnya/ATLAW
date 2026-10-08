# UI Context

## Theme

Light editorial. The visual language is "quiet authority" — cream/white canvases, deep navy sections, serif display headlines, and gold/amber micro-accents. Every surface alternates between light (ivory/white) and dark (navy) to create visual rhythm.

## Color System

| Role                | Hex         | Usage                                     |
| ------------------- | ----------- | ----------------------------------------- |
| Ivory / White       | `#FFFFFF`   | Light section backgrounds                 |
| Navy canvas         | `#0e1b33`   | Dark section background (gradient start)  |
| Navy deep           | `#0a1428`   | Dark section background (gradient end)    |
| Ink                 | `#0B1F3A`   | Primary headings on light backgrounds     |
| Ink alt             | `#0E1B2C`   | Hero headline color                       |
| Stone               | `#3A4A63`   | Body copy on light backgrounds            |
| Stone alt           | `#3A4A5E`   | Eyebrow text                              |
| Muted               | `#7A7466`   | Labels, metadata                          |
| Gold primary        | `#B88A2D`   | Section labels, dividers, micro-accents   |
| Gold bright         | `#C6A04A`   | Hero accents, CTA highlights, brand dots  |
| Gold dim            | `#C9A85C`   | Accent plaque borders                     |
| White text on navy  | `#FFFFFF`   | Headings on dark sections                 |
| Muted white         | `rgba(255,255,255,0.75-0.85)` | Body copy on dark sections |
| Faint white         | `rgba(255,255,255,0.45-0.55)` | Metadata on dark sections  |

## Typography

| Role            | Font Family  | Variable       | Characteristics                    |
| --------------- | ------------ | -------------- | ---------------------------------- |
| Display/Heading | Lustria      | `font-serifDisplay` | Serif, editorial, large headlines |
| Body/UI         | Mulish       | `font-sans`    | Clean sans-serif, variable weight  |

Both fonts self-hosted as woff2 in `/public/fonts/`, preloaded in `index.html`.

### Headline Conventions

- Section labels: `font-sans text-[11-13px] font-semibold uppercase tracking-[0.18-0.22em]` in gold.
- Main headings: `font-serifDisplay text-[clamp(...)] leading-[1.02-1.18] tracking-[-0.02em]` in ink (light) or white (dark).
- Body copy: `font-serifDisplay text-[18-19px] leading-[1.55-1.7]` in stone (light) or muted white (dark).
- Small UI text: `font-sans text-[12-15px]` in various tones.

## Decorative Elements

### Film Grain
SVG fractal noise overlay at 3-6% opacity, applied to both light and dark sections. Creates editorial texture.

### Ghost Watermark
Oversized "ATLAW" text behind content at 1.5-3% opacity. Serif display font, uppercase, centered.

### Curved Linework
Faint SVG path curves sweeping across sections at 5-14% opacity. Gold on dark, navy on light.

### Gold Micro-Accents
- Amber dots between metadata tokens (`h-1 w-1 rounded-full bg-[#B88A2D]`).
- Hairline rules (`h-px bg-[#B88A2D]`) as section dividers.
- Quatrefoil ornaments (4 overlapping circles in SVG).
- Corner bracket marks on award plaques.
- Brand period: gold dot at end of headlines (`.text-[#B88A2D]`).

## Section Pattern

Every homepage section follows this editorial pattern:

1. **Eyebrow** — Gold number + dash + uppercase tracked label (e.g., "01 — PRACTICE AREAS").
2. **Headline** — Large serif display heading with optional gold brand period.
3. **Body** — Serif body copy, max-width constrained.
4. **Content** — Cards, stats, plaques, or other structured content.
5. **CTA** — Rounded-full buttons or phone links.

## Component Patterns

### Buttons (CTA)
- Primary: `rounded-full bg-[#0E1B2C] text-white h-[56-68px] px-8-9` with arrow icon.
- Secondary: `rounded-full border border-[rgba(14,27,44,0.35)] bg-transparent` with hover fill.
- On dark: `rounded-full bg-white text-[#0B1F3A]` with shadow hover.

### Cards
- `rounded-[24px] border bg-white shadow` with hover lift (`hover:-translate-y-[3px]`).
- Gold uppercase label at top, serif title, sans body, "Key Areas" list at bottom.

### Header
- Sticky top, always visible, navy background, blur on scroll.
- Logo left, nav center, gold "I NEED HELP" CTA right.
- Nav: PRACTICE AREAS and AREAS WE SERVE are dropdowns (full-width navy panel, gold uppercase group headings, "see all" link at the bottom); ABOUT, OUR TEAM, NEWS, CONTACT are direct links. Dropdowns open on mouse hover or click/Enter; Escape closes and returns focus.
- 1024–1279px uses tighter cell padding and letter-spacing so all six items fit.
- Mobile: hamburger → drawer; the two dropdowns become accordion sections.

### Footer
- Deep navy gradient background with grain overlay.
- 4-column grid: brand + description, practice areas, company links, contact.
- Newsletter signup bar.
- Attorney advertising disclaimer at bottom.

## Section Rhythm (Homepage)

| #  | Section          | Background  | Canvas |
| -- | ---------------- | ----------- | ------ |
| 1  | Hero             | Navy/Dark   | Dark   |
| 2  | Trust Bar        | White       | Light  |
| 3  | Case Results     | White       | Light  |
| 4  | What We Handle   | Light Gray  | Light  |
| 5  | About Dewnya     | White       | Light  |
| 6  | No Fee Banner    | Navy        | Dark   |
| 7  | How It Works     | White       | Light  |
| 8  | Testimonials     | White       | Light  |
| 9  | FAQ Preview      | Light Gray  | Light  |
| 10 | Intake Form      | Navy/Dark   | Dark   |
| 11 | Final CTA        | Navy        | Dark   |
| 12 | Footer           | Navy        | Dark   |

## Responsive Approach

Mobile-first with breakpoints:
- `sm:` (640px) — Two-column layouts.
- `md:` (768px) — Expanded padding, larger type.
- `lg:` (1024px) — Full desktop layouts, sidebars.
- `xl:` (1280px) — Max-width containers, 4-column grids.

## Icons

Inline SVGs — no icon library. Arrow icons, chevrons, phone/mail/pin icons are hand-coded SVG in components.
