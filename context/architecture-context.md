# Architecture Context

## Stack

| Layer       | Technology                    | Role                                            |
| ----------- | ----------------------------- | ----------------------------------------------- |
| Framework   | React 18 + TypeScript         | Component-based SPA                             |
| Bundler     | Vite 7                        | Dev server, HMR, production builds              |
| Routing     | React Router 6                | Client-side page routing with lazy loading       |
| Styling     | Tailwind CSS 3                | Utility-first styling                           |
| Animation   | GSAP + ScrollTrigger          | Scroll-driven reveals, parallax, counters       |
| Smooth scroll | Lenis                       | Smooth scroll wrapper synced with GSAP          |
| Fonts       | Lustria (serif) + Mulish (sans) | Self-hosted woff2, preloaded                  |
| Intake form | Typeform (external)           | Lead capture — embedded or linked               |

## Project Structure

```
atlaw_start/
├── index.html                    # Entry point, font preloads, LCP image preloads
├── tailwind.config.js            # Theme tokens, font families, color system
├── tailwind.css                  # Tailwind directives + CSS custom properties
├── vite.config.ts                # Vite config with React plugin
├── tsconfig.json                 # TypeScript config
├── src/
│   ├── index.tsx                 # Browser entry: BrowserRouter; hydrates prerendered HTML, else renders
│   ├── App.tsx                   # All routes + site-wide overlays (shared by browser and prerender)
│   ├── entry-server.tsx          # Build-time render of one URL (StaticRouter), not shipped to browsers
│   ├── screens/                  # Page-level components (one per route)
│   ├── components/ATLAW/         # Shared UI components (Header, Footer, sections)
│   │   ├── header/               # Header sub-components (mega menu, mobile drawer)
│   │   └── footer/               # Footer sub-components (newsletter, icons, links)
│   ├── data/                     # Static data files (navigation, practice areas, team)
│   │   ├── practice-areas/       # Category groupings (recover, build, protect, defend)
│   │   └── practice/             # Individual practice area content
│   └── motion/                   # Animation system (GSAP primitives, smooth scroll)
│       └── primitives/           # RevealText, RevealBlock, RevealStagger, etc.
├── public/
│   ├── assets/                   # Images (avif/png/jpg/webp), logos (svg)
│   │   └── hero/                 # Homepage hero images
│   ├── fonts/                    # Self-hosted font files (woff2)
│   └── team imgs/                # Legacy team photos (to be replaced)
├── scripts/                      # Image conversion utilities (sharp); prerender.mjs (build-time HTML)
├── vercel.json                   # SPA rewrite, cleanUrls, 301 redirects for old URLs, noindex on *.vercel.app
└── context/                      # Project context files (this directory)
```

## System Boundaries

- `src/screens/` — Page-level route components. One file per route. Each screen composes section components.
- `src/components/ATLAW/` — Shared section components, header, footer. No business logic.
- `src/data/` — Static content data. Single source of truth for copy, navigation links, team info.
  - `practice/pi/registry.ts` and `cities-registry.ts` are lightweight lists (slug, label, group/county) that the header menus are generated from, so menus update automatically and the long-form copy stays out of the main bundle. `practiceAreaBySlug` must match the practice registry (enforced by `satisfies`); `CityData.slug` is typed against the city registry.
- `src/motion/` — Animation primitives and scroll config. No content or layout.
- `public/` — Static assets served as-is. Images, fonts, logos.

## Routing Model

- Practice pages: one `PracticePage` for `/personal-injury`, `/personal-injury/:practice` and `/disability/:practice`, driven by `src/data/practice/pi/registry.ts` (slug, section, nav group, schema service type). `src/data/practice/pages.ts` says which practices have a page; menus and prerender read it.
- All routes defined in `src/App.tsx`; `src/index.tsx` wraps it in `BrowserRouter`, `src/entry-server.tsx` in `StaticRouter`.
- Homepage is eagerly loaded (LCP route).
- All other pages are lazy-loaded with `React.lazy()` + `<Suspense>`.
- Fallback during lazy load: thin `RouteProgressBar` at the top of the viewport.
- `BrowserRouter` runs with `v7_startTransition`, so the current page stays on screen while the next chunk loads; there is no forced loading screen between pages.
- `ScrollToTop` resets scroll position on route change.
- Unknown URLs hit the `<Route path="*">` catch-all and render `NotFoundPage` (noindex). Dynamic routes with unmatched params (city, practice, news slug) render it too instead of redirecting. A real 404 HTTP status needs `dist/404.html` from the prerender step.

## Content pipeline (imported pages)

- Writers' copy → `content-source/practice/<slug>.md` (front matter + Markdown; `scripts/docx_to_markdown.py` converts Word deliveries) → `npm run import-content` → `src/content/practice/*.json` (approved) or `src/content/practice-drafts/*.json` (drafts). JSON is committed, so builds never need the source or the network.
- City and county pages for a practice use the same pipeline: `content-source/practice/<slug>--<city>.md` with `city: <city slug>` in the front matter (the converter reads it from the doc's `/personal-injury/<practice>/<city>` URL), imported as `<slug>--<city>.json`, served at `/personal-injury/<practice>/<city>` by `CityLandingPage` through `CityLongFormPage` (city hero and stats bar + the long-form body). A practice/city pair without imported copy still renders the original `CityLandingTemplate` from `cities.ts`, for the original practices only.
- City hub pages use the same pipeline with `slug: areas-served`, `section: areas-served`, `city: <city slug>` (the converter reads it from the doc's `/areas-served/<city>` URL): `content-source/practice/areas-served--<city>.md` → `areas-served--<city>.json`, served at `/areas-served/<city>` by `CityHubPage` through the same `CityLongFormPage` (Areas We Serve breadcrumb, canonical `/areas-served/<city>`, and an "Our Practice Areas in <city>" card grid of every practice page that exists for the city). A city without hub copy returns the 404 page. `cityHref()` in `cities-registry.ts` points a nav or card link at the hub when its copy is imported, else the city's personal-injury page, else the `/areas-served` index; it reads `src/content/index.ts` (the lazy loader map only, no copy) for that.
- Copy is stored as typed blocks (`src/content/types.ts`), never HTML; the site renders it with its own components.
- The import is the gate: approved pages with any [CONFIRM]/[VERIFY]/[ATTORNEY CHECK] are refused.
- `src/content/index.ts` maps slugs to lazy JSON loaders; drafts are included only in dev or with `VITE_SHOW_DRAFTS=true` (Vercel previews). `PracticePage` renders `PracticeLongFormPage` when a slug has content, else the original hand-written page.
- Drafts render with a review banner, highlighted open items and `noindex`.
- `npm run tracker` compares the firm's Content Tracker sheet (277 pages, read-only via its view link) with the registry and imported content: what to import, which sheet rows to mark Imported, and what the site can't serve yet.

## Prerender (build-time HTML)

- `npm run build` = client build, SSR build of `src/entry-server.tsx` into `dist-ssr/` (gitignored), then `scripts/prerender.mjs` (`npm run build:spa` = client build only).
- Routes come from `prerenderRoutes()` in `src/entry-server.tsx` (every practice with a page). For each, the script renders the page with React's web-stream renderer (waits for lazy routes), writes `dist/<route>.html` with the page's own `<title>`, meta, canonical and JSON-LD (template defaults removed, so no tag appears twice), and the markup inside `#app`.
- The browser entry hydrates that HTML (`hydrateRoot`) when `#app` already has content; other URLs keep the client-only render through the SPA rewrite.
- Vercel serves `/a/b` from `a/b.html` through `cleanUrls`; existing files win over the rewrite.
- Any render error fails the build (errors inside Suspense boundaries are collected and rethrown).
- Status (Oct 10, 2026): every practice page is prerendered and `npm run build` prerenders. Other page types follow in week 2. A production build fails if a page contains [CONFIRM]/[VERIFY]/[ATTORNEY CHECK].
- Components must not touch `window`/`document` during render (effects only); otherwise the prerender fails.

## Image Strategy

- Primary format: AVIF (with PNG/JPG/WebP fallbacks where needed).
- Hero images preloaded in `index.html` `<head>` for LCP.
- Conversion scripts in `scripts/` use sharp.
- New photos from `Website Materials/ATLAW Updated Photos/` to replace placeholder images.

## Animation System

- GSAP ScrollTrigger drives all scroll-based animations.
- Lenis provides smooth scroll, synced with GSAP's scroll clock.
- Motion primitives in `src/motion/primitives/`:
  - `RevealText` — word-by-word text reveal on scroll.
  - `RevealBlock` — fade-up block reveal.
  - `RevealStagger` — staggered children reveals.
  - `RevealImage` — image reveal with curtain effect.
  - `DrawRule` — animated horizontal rule.
  - `Counter` — animated number count-up.
  - `Parallax` — depth-shifted background elements.
- `prefersReducedMotion()` check disables animations for a11y.

## Invariants

1. No practice areas other than PI sub-practices appear in navigation or marketing copy.
2. Dewnya Bazzi is the only attorney featured on the homepage hero.
3. Intake form links point to the Typeform URL — no custom form backend.
4. Attorney advertising disclaimer appears in the footer of every page.
5. All images use AVIF with appropriate fallbacks.
6. Font files are self-hosted, not loaded from Google Fonts CDN.
7. Every page includes Header and Footer components.
