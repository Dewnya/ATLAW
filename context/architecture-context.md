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
│   ├── index.tsx                 # React root, BrowserRouter, all routes
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
├── scripts/                      # Image conversion utilities (sharp)
└── context/                      # Project context files (this directory)
```

## System Boundaries

- `src/screens/` — Page-level route components. One file per route. Each screen composes section components.
- `src/components/ATLAW/` — Shared section components, header, footer. No business logic.
- `src/data/` — Static content data. Single source of truth for copy, navigation links, team info.
- `src/motion/` — Animation primitives and scroll config. No content or layout.
- `public/` — Static assets served as-is. Images, fonts, logos.

## Routing Model

- All routes defined in `src/index.tsx`.
- Homepage is eagerly loaded (LCP route).
- All other pages are lazy-loaded with `React.lazy()` + `<Suspense>`.
- Fallback during lazy load: thin `RouteProgressBar` at the top of the viewport.
- `BrowserRouter` runs with `v7_startTransition`, so the current page stays on screen while the next chunk loads; there is no forced loading screen between pages.
- `ScrollToTop` resets scroll position on route change.

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
