// Content import: content-source/practice/*.md -> src/content/practice[-drafts]/*.json
//
//   npm run import-content
//
// Each source file is a front-matter header (slug, section, status, SEO fields)
// followed by the page copy in Markdown. A city or county page for a practice adds
// `city: <city slug>` and is named <slug>--<city>.md (served at /personal-injury/<slug>/<city>). The import validates every page, turns
// the copy into typed blocks (src/content/types.ts) and writes:
//   - approved pages -> src/content/practice/<slug>.json (published)
//   - drafts         -> src/content/practice-drafts/<slug>.json (dev and preview only)
// It fails on any error, so a broken page never reaches the site. In particular an
// approved page that still contains [CONFIRM …], [VERIFY …] or [ATTORNEY CHECK …]
// is refused. Output is deterministic: re-running on unchanged sources gives no diff.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "content-source", "practice");
const OUT_APPROVED = join(root, "src", "content", "practice");
const OUT_DRAFTS = join(root, "src", "content", "practice-drafts");

const REQUIRED = ["slug", "section", "status", "seoTitle", "seoDescription", "h1", "tagline", "primaryKeyword"];
const PLACEHOLDER = /\[(CONFIRM|VERIFY|ATTORNEY CHECK)\b:?\s*([^\]]*)\]/g;
// Paragraphs the site already shows on every page (footer disclaimer), dropped from the copy.
const TEMPLATE_DISCLAIMER = /^(attorney advertising|results depend on the facts)/i;

// Planned practices, read from the registry so the two can't drift.
const registrySrc = readFileSync(join(root, "src", "data", "practice", "pi", "registry.ts"), "utf-8");
// Resource guides (section "resources", served at /resources/<slug>) share the map.
const resourcesSrc = readFileSync(join(root, "src", "data", "resources.ts"), "utf-8");
const practices = new Map(
  [...registrySrc.matchAll(/\{\s*slug:\s*"([^"]+)",\s*section:\s*"([^"]+)"/g),
   ...resourcesSrc.matchAll(/\{\s*slug:\s*"([^"]+)",\s*section:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
// Guides served at their own top-level path (e.g. /faq).
const resourcePaths = new Set([...resourcesSrc.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]));
// City and county slugs, from the city registry (the header menu's list).
const citiesSrc = readFileSync(join(root, "src", "data", "cities-registry.ts"), "utf-8");
const citySlugs = new Set([...citiesSrc.matchAll(/\{\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const STATIC_ROUTES = new Set(["/", "/about", "/team", "/contact", "/news", "/areas-served", "/privacy", "/terms", "/personal-injury"]);

const slugify = (s) =>
  s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function parseFrontMatter(text, file) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

/** Plain text of inline nodes. */
const plain = (nodes) =>
  nodes.map((n) => (n.t === "text" ? n.v : n.t === "placeholder" ? `[${n.kind}: ${n.v}]` : plain(n.c))).join("");

/** Split a text string into text and placeholder nodes. */
function textNodes(value) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(PLACEHOLDER)) {
    if (m.index > last) out.push({ t: "text", v: value.slice(last, m.index) });
    out.push({ t: "placeholder", kind: m[1], v: m[2].trim() });
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ t: "text", v: value.slice(last) });
  return out;
}

/** marked inline tokens -> Inline[] (merging adjacent text). */
function inline(tokens = []) {
  const out = [];
  for (const tok of tokens) {
    switch (tok.type) {
      case "text":
        out.push(...(tok.tokens ? inline(tok.tokens) : textNodes(decode(tok.text))));
        break;
      case "escape":
      case "codespan":
        out.push(...textNodes(decode(tok.text)));
        break;
      case "strong":
        out.push({ t: "strong", c: inline(tok.tokens) });
        break;
      case "em":
        out.push({ t: "em", c: inline(tok.tokens) });
        break;
      case "link":
        out.push({ t: "link", href: tok.href, c: inline(tok.tokens) });
        break;
      case "br":
        out.push({ t: "text", v: " " });
        break;
      default:
        throw new Error(`unsupported inline Markdown: ${tok.type} (${JSON.stringify(tok.raw).slice(0, 60)})`);
    }
  }
  const merged = [];
  for (const n of out) {
    const prev = merged[merged.length - 1];
    if (n.t === "text" && prev?.t === "text") prev.v += n.v;
    else merged.push(n);
  }
  return merged;
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

/** marked block tokens -> Block[]. */
function blocks(tokens) {
  const out = [];
  for (const tok of tokens) {
    switch (tok.type) {
      case "space":
        break;
      case "paragraph":
        out.push({ t: "p", c: inline(tok.tokens) });
        break;
      case "heading":
        if (tok.depth !== 3) throw new Error(`unexpected heading level ${tok.depth}: "${tok.text}"`);
        out.push({ t: "h3", c: inline(tok.tokens) });
        break;
      case "list":
        out.push({
          t: tok.ordered ? "ol" : "ul",
          items: tok.items.map((item) => {
            const nested = item.tokens.filter((t) => t.type === "list");
            if (nested.length) throw new Error(`nested lists are not supported: "${item.text.slice(0, 50)}"`);
            return inline(item.tokens.flatMap((t) => (t.type === "text" || t.type === "paragraph" ? t.tokens : [])));
          }),
        });
        break;
      case "table":
        out.push({
          t: "table",
          head: tok.header.map((cell) => inline(cell.tokens)),
          rows: tok.rows.map((row) => row.map((cell) => inline(cell.tokens))),
        });
        break;
      default:
        throw new Error(`unsupported Markdown block: ${tok.type} (${JSON.stringify(tok.raw).slice(0, 60)})`);
    }
  }
  return out;
}

/** Every inline node in a block list, for checks. */
function* walk(nodes) {
  for (const n of nodes) {
    if (Array.isArray(n)) yield* walk(n);
    else if (n.t === "p" || n.t === "h3") yield* walk(n.c);
    else if (n.t === "ul" || n.t === "ol") yield* walk(n.items);
    else if (n.t === "table") { yield* walk(n.head); yield* walk(n.rows); }
    else if (n.t === "qa") yield* walk(n.answer);
    else { yield n; if (n.c) yield* walk(n.c); }
  }
}

// A FAQ-format page (front matter `format: faq`) is all questions: each "**Question?** answer"
// paragraph starts a question, and the blocks after it (a table, a list, more paragraphs) are its
// answer until the next question. A paragraph that is entirely italic (a closing disclaimer) stays outside.
function questionBlocks(list) {
  const out = [];
  let current = null;
  for (const b of list) {
    const first = b.t === "p" ? b.c[0] : null;
    if (first?.t === "strong" && plain(first.c).trim().endsWith("?")) {
      const rest = b.c.slice(1);
      if (rest[0]?.t === "text") rest[0] = { t: "text", v: rest[0].v.replace(/^\s+/, "") };
      current = { t: "qa", question: plain(first.c).trim(), answer: rest.some((n) => n.t !== "text" || n.v.trim()) ? [{ t: "p", c: rest }] : [] };
      out.push(current);
    } else if (current && !(b.t === "p" && b.c.length === 1 && b.c[0].t === "em")) {
      current.answer.push(b);
    } else {
      out.push(b);
      current = null;
    }
  }
  return out;
}

function checkLink(href) {
  if (/^(https?:|mailto:|tel:)/.test(href)) return null;
  const path = href.split("#")[0].replace(/\/$/, "") || "/";
  if (STATIC_ROUTES.has(path) || resourcePaths.has(path)) return null;
  const [, section, slug, city] = path.split("/");
  if ((section === "personal-injury" || section === "disability") && practices.get(slug) === section && (!city || citySlugs.has(city))) return null;
  if (section === "areas-served" && slug && !city && citySlugs.has(slug)) return null;
  if (section === "resources" && practices.get(slug) === "resources" && !city) return null;
  return `link to unknown page ${href}`;
}

function importPage(file) {
  const errors = [];
  const warnings = [];
  const { meta, body } = parseFrontMatter(readFileSync(join(SOURCE, file), "utf-8"), file);

  for (const key of REQUIRED) if (!meta[key]) errors.push(`missing "${key}"`);
  // City hubs: slug "areas-served", section "areas-served", city required (served at /areas-served/<city>).
  const isHub = meta.section === "areas-served";
  if (isHub && meta.slug !== "areas-served") errors.push(`an areas-served page must have slug "areas-served", not "${meta.slug}"`);
  if (isHub && !meta.city) errors.push("an areas-served page must name its city");
  if (meta.slug && !isHub && !practices.has(meta.slug)) errors.push(`slug "${meta.slug}" is not in the practice registry`);
  if (meta.slug && practices.get(meta.slug) && practices.get(meta.slug) !== meta.section)
    errors.push(`section "${meta.section}" does not match the registry ("${practices.get(meta.slug)}")`);
  const key = meta.city ? `${meta.slug}--${meta.city}` : meta.slug;
  if (meta.city && !citySlugs.has(meta.city)) errors.push(`city "${meta.city}" is not in the city registry`);
  if (`${key}.md` !== file) errors.push(`file name must be ${key}.md`);
  if (!["draft", "approved"].includes(meta.status)) errors.push(`status must be draft or approved, not "${meta.status}"`);
  if (meta.h1 && meta.seoTitle && meta.h1.trim().toLowerCase() === meta.seoTitle.trim().toLowerCase())
    errors.push("H1 must differ from the title");
  if (meta.seoTitle && (meta.seoTitle.length < 50 || meta.seoTitle.length > 60))
    warnings.push(`title is ${meta.seoTitle.length} characters (plan: 50–60)`);
  if (meta.seoDescription && (meta.seoDescription.length < 140 || meta.seoDescription.length > 155))
    warnings.push(`meta description is ${meta.seoDescription.length} characters (plan: 140–155)`);

  // Split the copy into H2 sections.
  const tokens = marked.lexer(body);
  const raw = [];
  for (const tok of tokens) {
    if (tok.type === "heading" && tok.depth === 2) raw.push({ heading: tok.text.trim(), tokens: [] });
    else if (tok.type === "heading" && tok.depth === 1) errors.push(`H1 inside the copy ("${tok.text}"); the page H1 comes from the front matter`);
    else if (raw.length) raw[raw.length - 1].tokens.push(tok);
    else if (tok.type !== "space") errors.push("copy before the first ## heading");
  }

  let intro = [];
  const sections = [];
  let faqs = [];
  let cta = null;
  const ids = new Set();
  for (const sec of raw) {
    let parsed;
    try {
      parsed = blocks(sec.tokens);
    } catch (e) {
      errors.push(`section "${sec.heading}": ${e.message}`);
      continue;
    }
    const heading = decode(sec.heading.replace(/\\([\\*_`])/g, "$1"));
    if (!intro.length && !sections.length && heading.toLowerCase() === (meta.h1 || "").toLowerCase()) {
      intro = parsed;
    } else if (/^frequently asked questions/i.test(heading)) {
      for (const b of parsed) {
        const first = b.t === "p" ? b.c[0] : null;
        if (!first || first.t !== "strong") { errors.push(`FAQ paragraph without a bold question: "${plain(b.c ?? []).slice(0, 50)}"`); continue; }
        const answer = b.c.slice(1);
        if (answer[0]?.t === "text") answer[0] = { t: "text", v: answer[0].v.replace(/^\s+/, "") };
        faqs.push({ question: plain(first.c).trim(), answer });
      }
    } else {
      let id = slugify(heading) || "section";
      while (ids.has(id)) id += "-2";
      ids.add(id);
      const kept = parsed.filter((b) => !(b.t === "p" && TEMPLATE_DISCLAIMER.test(plain(b.c).trim())));
      if (kept.length < parsed.length) warnings.push(`dropped ${parsed.length - kept.length} disclaimer paragraph(s); the site footer carries it`);
      const section = { id, heading, blocks: meta.format === "faq" ? questionBlocks(kept) : kept };
      // The closing section: "Talk to …" on practice pages, "Questions about …" on resource guides.
      if (/^(talk to|questions about) /i.test(heading)) cta = section;
      else sections.push(section);
    }
  }
  if (!intro.length) errors.push(`no intro: the first ## heading must repeat the H1 ("${meta.h1}")`);
  if (!sections.length) errors.push("no body sections");
  const questions = sections.flatMap((s) => s.blocks).filter((b) => b.t === "qa");
  if (meta.format === "faq" && !questions.length) errors.push("format: faq but no bold questions");
  if (meta.format !== "faq" && !faqs.length) errors.push("no FAQs (a ## Frequently asked questions … section with bold questions)");

  const all = [...intro, ...sections.flatMap((s) => s.blocks), ...faqs.map((f) => ({ t: "p", c: f.answer })), ...(cta?.blocks ?? [])];
  const nodes = [...walk(all)];
  const openItems = nodes.filter((n) => n.t === "placeholder").length
    + faqs.filter((f) => PLACEHOLDER.test(f.question)).length;
  PLACEHOLDER.lastIndex = 0;
  for (const n of nodes) if (n.t === "link") { const problem = checkLink(n.href); if (problem) (meta.status === "approved" ? errors : warnings).push(problem); }
  if (meta.status === "approved" && openItems) errors.push(`approved but ${openItems} [CONFIRM]/[VERIFY]/[ATTORNEY CHECK] item(s) remain`);

  const text = [meta.h1, plain(nodes.filter((n) => n.t === "text" || n.t === "placeholder")), ...sections.map((s) => s.heading), ...faqs.map((f) => f.question), ...questions.map((q) => q.question)].join(" ");
  const content = {
    slug: meta.slug,
    section: meta.section,
    ...(meta.city ? { city: meta.city } : {}),
    status: meta.status,
    seoTitle: meta.seoTitle,
    seoDescription: meta.seoDescription,
    h1: meta.h1,
    tagline: meta.tagline,
    primaryKeyword: meta.primaryKeyword,
    secondaryKeywords: (meta.secondaryKeywords || "").split(",").map((s) => s.trim()).filter(Boolean),
    intro,
    sections,
    faqs,
    cta,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    openItems,
    source: { file: meta.source || file, delivered: meta.delivered || "" },
  };
  return { file, content, errors, warnings };
}

const files = readdirSync(SOURCE).filter((f) => f.endsWith(".md")).sort();
const results = files.map((f) => {
  try {
    return importPage(f);
  } catch (e) {
    return { file: f, content: null, errors: [e.message], warnings: [] };
  }
});

let failed = 0;
for (const r of results) {
  const c = r.content;
  const head = c ? `${c.status.padEnd(8)} ${String(c.wordCount).padStart(5)} words  ${String(c.faqs.length).padStart(2)} FAQs  ${String(c.openItems).padStart(2)} open` : "";
  console.log(`${r.errors.length ? "FAIL" : "ok  "} ${r.file.padEnd(36)} ${head}`);
  for (const e of r.errors) console.log(`       error: ${e}`);
  for (const w of r.warnings) console.log(`       warn:  ${w}`);
  if (r.errors.length) failed++;
}
if (failed) {
  console.error(`\n${failed} page(s) failed; nothing was written.`);
  process.exit(1);
}

for (const dir of [OUT_APPROVED, OUT_DRAFTS]) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}
for (const { content } of results) {
  const dir = content.status === "approved" ? OUT_APPROVED : OUT_DRAFTS;
  writeFileSync(join(dir, `${content.city ? `${content.slug}--${content.city}` : content.slug}.json`), JSON.stringify(content, null, 1) + "\n");
}
const approved = results.filter((r) => r.content.status === "approved").length;
console.log(`\nImported ${results.length} page(s): ${approved} approved, ${results.length - approved} draft(s).`);
