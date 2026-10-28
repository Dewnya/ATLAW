// Content Tracker check: compares the firm's page list (the shared Google Sheet)
// with what the site has, and prints what to do next.
//
//   npm run tracker                 read the live sheet (view link)
//   npm run tracker -- --file x.csv read a saved CSV export of the "pages" tab instead
//
// Read-only: it never writes to the sheet or to the site. It answers:
//   1. Where do the 277 pages stand (sheet Status, per batch)?
//   2. Which approved pages still need importing?
//   3. Which pages are live on the site but not yet marked "Imported" in the sheet?
//   4. Which sheet URLs can't the site serve yet (code still to build)?
//   5. Where do the sheet and the imported copy disagree (H1, keyword, missing Drive file)?
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SHEET_ID = "1bjeNmpWWnLXDdWaR9xAru3c6DyO575zWpTRKMwCAeAg";
const SHEET_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=pages`;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Minimal RFC 4180 CSV parser (quoted fields, doubled quotes, newlines in quotes). */
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim()));
}

async function loadSheet() {
  const i = process.argv.indexOf("--file");
  const text = i > 0 ? readFileSync(process.argv[i + 1], "utf-8") : await (await fetch(SHEET_CSV)).text();
  if (text.trimStart().startsWith("<")) throw new Error("the sheet didn't come back as CSV: is it still shared by link (Viewer)?");
  const [header, ...rows] = parseCsv(text);
  return rows.map((r, idx) => ({ sheetRow: idx + 2, ...Object.fromEntries(header.map((h, j) => [h, (r[j] ?? "").trim()])) }));
}

// ── What the site has ────────────────────────────────────────────────────────
const read = (p) => readFileSync(join(root, p), "utf-8");
const practices = new Map([...read("src/data/practice/pi/registry.ts").matchAll(/slug: "([^"]+)", section: "([^"]+)"[^\n]*?(legacy: true)?\s*\}/g)]
  .map((m) => [m[1], { section: m[2], legacy: Boolean(m[3]) }]));
const cities = new Set([...read("src/data/cities-registry.ts").matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));

// Imported copy, from the Markdown sources (front matter only).
const content = new Map();
const srcDir = join(root, "content-source", "practice");
for (const f of existsSync(srcDir) ? readdirSync(srcDir).filter((f) => f.endsWith(".md")) : []) {
  const fm = read(join("content-source", "practice", f)).match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const meta = Object.fromEntries(fm[1].split(/\r?\n/).map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]));
  const url = (meta.slug === "personal-injury" ? "/personal-injury" : `/${meta.section}/${meta.slug}`) + (meta.city ? `/${meta.city}` : "");
  // "Live" = an approved JSON exists (a production build publishes it).
  const live = existsSync(join(root, "src", "content", "practice", `${meta.city ? `${meta.slug}--${meta.city}` : meta.slug}.json`));
  content.set(url, { ...meta, live });
}

/** How the site handles a sheet URL today. */
function siteState(url) {
  const c = content.get(url);
  if (c) return c.live ? "live (approved)" : "draft imported";
  const parts = url.split("/").filter(Boolean);
  if (url === "/personal-injury" || ((parts[0] === "personal-injury" || parts[0] === "disability") && parts.length === 2)) {
    const p = practices.get(parts[1] ?? "personal-injury");
    if (!p || p.section !== parts[0]) return "not built: practice not in the registry";
    return p.legacy ? "old page only" : "ready for content";
  }
  if (parts[0] === "personal-injury" && parts.length === 3) {
    const p = practices.get(parts[1]);
    if (p?.legacy && cities.has(parts[2])) return "old template only";
    return "not built: city page";
  }
  if (parts[0] === "disability" && parts.length === 3) return "not built: disability city page";
  if (parts[0] === "areas-served") return "not built: city/county overview page";
  return "not built: guide page";
}

// ── Report ───────────────────────────────────────────────────────────────────
const rows = await loadSheet();
const count = (list, key) => list.reduce((m, r) => m.set(r[key], (m.get(r[key]) ?? 0) + 1), new Map());
const line = (s = "") => console.log(s);
const fmtMap = (m) => [...m].map(([k, v]) => `${k} ${v}`).join(" · ");

line(`Content Tracker — ${rows.length} pages (read ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC)`);
line(`  Status: ${fmtMap(count(rows, "Status"))}`);
for (const b of [...new Set(rows.map((r) => r.Batch))]) {
  const rs = rows.filter((r) => r.Batch === b);
  const st = count(rs, "Status");
  line(`  Batch ${b}: ${rs.length} pages · to the firm ${rs[0]["Reaches firm"]} · approval due ${rs[0]["Approval due"]} · approved ${st.get("Approved") ?? 0} · imported ${st.get("Imported") ?? 0}`);
}

const section = (title, items, fmt, empty = "none") => {
  line(); line(`${title} (${items.length})`);
  if (!items.length) line(`  ${empty}`);
  for (const it of items) line(`  ${fmt(it)}`);
};

section("1. Approved in the sheet, not live on the site yet → import these",
  rows.filter((r) => r.Status === "Approved" && !content.get(r.URL)?.live),
  (r) => `row ${r.sheetRow}  ${r.URL}  ${content.has(r.URL) ? "(source ready: set status: approved, run npm run import-content)" : "(no source yet: convert its Word file first)"}`);

section("2. Live on the site, sheet not marked Imported → Mo: set Status = Imported",
  rows.filter((r) => content.get(r.URL)?.live && r.Status !== "Imported"),
  (r) => `row ${r.sheetRow}  ${r.URL}  (sheet says: ${r.Status})`);

section("3. Marked Imported in the sheet but not live → check",
  rows.filter((r) => r.Status === "Imported" && !content.get(r.URL)?.live),
  (r) => `row ${r.sheetRow}  ${r.URL}`);

const states = rows.map((r) => ({ ...r, site: siteState(r.URL) }));
line(); line("4. What the site can serve today, by page type");
for (const type of [...new Set(rows.map((r) => r["Page type"]))]) {
  const rs = states.filter((r) => r["Page type"] === type);
  line(`  ${type.padEnd(19)} ${String(rs.length).padStart(3)}: ${fmtMap(count(rs, "site"))}`);
}
const nextBatch = rows.find((r) => r.Status !== "Imported")?.Batch;
section(`   Not built yet in the next open batch (${nextBatch}) → code to build`,
  states.filter((r) => r.Batch === nextBatch && r.site.startsWith("not built")),
  (r) => `row ${r.sheetRow}  ${r.URL}  — ${r.site.replace("not built: ", "")}`);

const mismatches = [];
for (const r of rows) {
  const c = content.get(r.URL);
  if (c && r["Title (H1)"] && c.h1 !== r["Title (H1)"]) mismatches.push(`row ${r.sheetRow}  H1: sheet "${r["Title (H1)"]}" · page "${c.h1}"`);
  if (c && r["Primary keyword"] && c.primaryKeyword.toLowerCase() !== r["Primary keyword"].toLowerCase()) mismatches.push(`row ${r.sheetRow}  keyword: sheet "${r["Primary keyword"]}" · page "${c.primaryKeyword}"`);
  if (["Ready for attorney", "Approved", "Imported"].includes(r.Status) && !r["Drive file"]) mismatches.push(`row ${r.sheetRow}  ${r.URL}: status "${r.Status}" but no Drive file`);
  if (["Ready for attorney", "Approved"].includes(r.Status) && !c) mismatches.push(`row ${r.sheetRow}  ${r.URL}: status "${r.Status}" but no copy received here`);
}
section("5. Sheet vs imported copy", mismatches, (m) => m);
