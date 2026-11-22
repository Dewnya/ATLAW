import { StrictMode } from "react";
import { renderToReadableStream } from "react-dom/server.browser";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { App } from "./App";
import { cityContentPages, hasPracticeContent } from "./content";
import { newsPosts } from "./data/news";
import { practicesWithPages } from "./data/practice/pages";
import { cityPageHref, practiceHref } from "./data/practice/pi/registry";
import { resourceHref, resourceRegistry } from "./data/resources";
import { templateCityRoutes } from "./data/site-map";
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

/** Pages with no content import that the app always serves (App.tsx routes). */
const STATIC_ROUTES = ["/", "/about", "/team", "/contact", "/areas-served", "/news", "/privacy", "/terms", "/site-map"];

/**
 * Every indexable URL, deduplicated: the static pages, the news posts, every
 * practice page, resource guide and city page with imported copy, and the
 * original template city pages. All of them are written as static HTML at build
 * time (scripts/prerender.mjs) and listed in dist/sitemap.xml, so no page
 * depends on JavaScript to be read or found.
 */
export function prerenderRoutes(): string[] {
  return [...new Set([
    ...STATIC_ROUTES,
    ...newsPosts.map((n) => `/news/${n.slug}`),
    ...practicesWithPages().map((p) => practiceHref(p.slug)),
    ...resourceRegistry.filter((r) => hasPracticeContent(r.slug)).map((r) => resourceHref(r.slug)),
    ...cityContentPages().map((p) => cityPageHref(p.practice, p.city)),
    ...templateCityRoutes().map((p) => cityPageHref(p.practice, p.city)),
  ])];
}

/** The sitemap lists exactly the prerendered pages. */
export const sitemapRoutes = prerenderRoutes;

/** A path no route matches, so the router renders NotFoundPage (written to dist/404.html). */
export const NOT_FOUND_ROUTE = "/__not-found__";
