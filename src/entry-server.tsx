import { StrictMode } from "react";
import { renderToReadableStream } from "react-dom/server.browser";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { App } from "./App";
import { cityContentPages } from "./content";
import { practicesWithPages } from "./data/practice/pages";
import { practiceHref } from "./data/practice/pi/registry";
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
 * URLs written as static HTML at build time. Practice pages come from the
 * registry, so every practice with content (and only those) is prerendered.
 */
export function prerenderRoutes(): string[] {
  return [
    ...practicesWithPages().map((p) => practiceHref(p.slug)),
    ...cityContentPages().map((p) => `${p.practice === "personal-injury" ? "/personal-injury/personal-injury" : practiceHref(p.practice)}/${p.city}`),
  ];
}
