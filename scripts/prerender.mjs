// Build-time prerender: writes real HTML for the listed routes into dist/ so
// search engines and link previews get the page content without running
// JavaScript. The browser then hydrates that HTML (see src/index.tsx).
//
// Run after both builds: `npm run build:prerender`.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const { render, prerenderRoutes } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
// Every practice page with content (from the registry). Other page types follow in week 2.
const ROUTES = prerenderRoutes();
// Production builds must never contain open items (launch gate: no CONFIRM in dist/).
const SHOW_DRAFTS = process.env.VITE_SHOW_DRAFTS === "true";
const template = readFileSync(join(dist, "index.html"), "utf-8");

// The page's own <title>, description, Open Graph, Twitter and JSON-LD tags come
// from PageMeta; drop the template defaults so no tag appears twice.
const baseHead = template
  .replace(/<title>[\s\S]*?<\/title>\s*/, "")
  .replace(/<meta name="description"[^>]*>\s*/, "")
  .replace(/<meta (property="og:[^"]+"|name="twitter:[^"]+")[^>]*>\s*/g, "");

for (const route of ROUTES) {
  const { html, head } = await render(route);
  if (!html.trim()) throw new Error(`prerender: ${route} rendered empty`);
  // React separates adjacent text with <!-- --> markers; ignore them when scanning.
  if (!SHOW_DRAFTS && /\[(CONFIRM|VERIFY|ATTORNEY CHECK)\b/.test(html.replace(/<!-- -->/g, ""))) throw new Error(`prerender: ${route} contains an open [CONFIRM]-type item in a production build`);

  const page = baseHead
    .replace("</head>", `${head}\n</head>`)
    .replace('<div id="app"></div>', `<div id="app">${html}</div>`);

  // "/a/b" -> dist/a/b.html. Vercel serves it at "/a/b" through `cleanUrls`
  // (vercel.json); a "/a/b/index.html" folder would not match without a slash.
  const file = route === "/" ? join(dist, "index.html") : join(dist, `${route}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`prerendered ${route} -> ${file.slice(root.length + 1)} (${Math.round(page.length / 1024)} KB)`);
}
console.log(`${ROUTES.length} page(s) prerendered${SHOW_DRAFTS ? " (drafts included)" : ""}.`);
