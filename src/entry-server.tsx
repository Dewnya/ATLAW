import { StrictMode } from "react";
import { renderToReadableStream } from "react-dom/server.browser";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { App } from "./App";
import { cityContentPages, hasPracticeContent } from "./content";
import { cities } from "./data/cities";
import { newsPosts } from "./data/news";
import { practicesWithPages } from "./data/practice/pages";
import { practiceAreaBySlug } from "./data/practice/pi";
import { cityPageHref, practiceHref } from "./data/practice/pi/registry";
import { resourceHref, resourceRegistry } from "./data/resources";
import { SmoothScroll } from "./motion/SmoothScroll";

export interface RenderResult {
  /** Markup that goes inside <div id="app">. */
  html: string;
  /** Per-page <title>, meta, canonical and JSON-LD collected by PageMeta. */
  head: string;
}

/**
 * Build-time render of one URL (used by scripts/prerender.mjs, never shipped to
 * the browser). Waits for every lazy route to load (allReady) so the page's
 * real content is in the HTML, not the Suspense fallback. Uses the web-stream
 * renderer, which Node 18+ runs natively.
 */
export async function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState | null } = {};
  // Errors inside a Suspense boundary don't reject the stream (React would
  // silently leave that part to the browser), so collect and fail the build.
  const errors: unknown[] = [];

  const stream = await renderToReadableStream(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <SmoothScroll>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </SmoothScroll>
      </HelmetProvider>
    </StrictMode>,
    {
      onError(error) {
        errors.push(error);
      },
    },
  );
  await stream.allReady;
  const html = await new Response(stream).text();
  if (errors.length) throw errors[0];

  const h = helmetContext.helmet;
  const head = h
    ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n")
    : "";

  return { html, head };
}

/**
 * URLs written as static HTML at build time. Practice pages and resource guides
 * come from their registries, so every one with content (and only those) is prerendered.
 */
export function prerenderRoutes(): string[] {
  return [
    ...practicesWithPages().map((p) => practiceHref(p.slug)),
    ...resourceRegistry.filter((r) => hasPracticeContent(r.slug)).map((r) => resourceHref(r.slug)),
    ...cityContentPages().map((p) => cityPageHref(p.practice, p.city)),
  ];
}

/** Pages with no content import that the app always serves (App.tsx routes). */
const STATIC_ROUTES = ["/", "/about", "/team", "/contact", "/areas-served", "/news", "/privacy", "/terms"];

/**
 * Every indexable URL for dist/sitemap.xml (written by scripts/prerender.mjs):
 * the static pages, the news posts, every prerendered content page, and the
 * original template city pages (the hand-written cities in cities.ts for the
 * original practices in practice/pi), which CityLandingPage still renders when
 * no imported copy replaces them. Deduplicated, in that order.
 */
export function sitemapRoutes(): string[] {
  const template = cities.flatMap((c) => Object.keys(practiceAreaBySlug).map((practice) => cityPageHref(practice, c.slug)));
  return [...new Set([
    ...STATIC_ROUTES,
    ...newsPosts.map((n) => `/news/${n.slug}`),
    ...prerenderRoutes(),
    ...template,
  ])];
}
