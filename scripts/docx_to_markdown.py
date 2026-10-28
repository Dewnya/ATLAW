"""Convert content-batch Word docs into Markdown source files for the content import.

The writers deliver each page as a Word doc (Pandoc layout): a "Page metadata"
table, the "Page copy" and a "For the firm to confirm" table. This writes
content-source/practice/<slug>.md with a front-matter header and the page copy in
Markdown, which `npm run import-content` then validates and turns into JSON.

Usage: python scripts/docx_to_markdown.py <folder with .docx files> [output folder]

Bridge only: once the writers hand over Markdown (or the content sheet), drop
those files into content-source/practice/ directly and skip this script.
"""
import os
import re
import sys
from datetime import datetime

from docx import Document
from docx.table import Table
from docx.text.hyperlink import Hyperlink
from docx.text.paragraph import Paragraph

SRC = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), "..", "content-source", "practice")
NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

FIELDS = {
    "Title tag": "seoTitle",
    "Meta description": "seoDescription",
    "H1": "h1",
    "Tagline": "tagline",
    "Primary keyword": "primaryKeyword",
    "Secondary keywords": "secondaryKeywords",
}


def escape(text: str) -> str:
    return re.sub(r"([\\*_`])", r"\\\1", text)


def runs_to_md(items) -> str:
    """Runs and hyperlinks -> Markdown, merging neighbouring runs with the same bold/italic."""
    parts = []  # (text, bold, italic, href)
    for item in items:
        if isinstance(item, Hyperlink):
            parts.append((item.text, False, False, item.address))
        else:
            parts.append((item.text, bool(item.bold), bool(item.italic), None))
    merged = []
    for text, bold, italic, href in parts:
        if merged and href is None and merged[-1][3] is None and merged[-1][1:3] == (bold, italic):
            merged[-1] = (merged[-1][0] + text, bold, italic, None)
        else:
            merged.append((text, bold, italic, href))
    out = []
    for text, bold, italic, href in merged:
        if not text:
            continue
        if href:
            out.append(f"[{escape(text)}]({href})")
            continue
        lead = text[: len(text) - len(text.lstrip())]
        trail = text[len(text.rstrip()):]
        core = escape(text.strip())
        if core and bold:
            core = f"**{core}**"
        if core and italic:
            core = f"*{core}*"
        out.append(lead + core + trail)
    return "".join(out).strip()


def paragraph_md(p: Paragraph) -> str:
    return runs_to_md(p.iter_inner_content())


def list_kind(p: Paragraph, numbering):
    """'ol' / 'ul' and indent level for a numbered paragraph, else None."""
    numPr = p._p.find(f"{NS}pPr/{NS}numPr")
    if numPr is None or numbering is None:
        return None
    num_id = numPr.find(f"{NS}numId").get(f"{NS}val")
    ilvl_el = numPr.find(f"{NS}ilvl")
    ilvl = ilvl_el.get(f"{NS}val") if ilvl_el is not None else "0"
    num = numbering.find(f"{NS}num[@{NS}numId='{num_id}']")
    if num is None:
        return None
    abstract_id = num.find(f"{NS}abstractNumId").get(f"{NS}val")
    lvl = numbering.find(f"{NS}abstractNum[@{NS}abstractNumId='{abstract_id}']/{NS}lvl[@{NS}ilvl='{ilvl}']")
    fmt = lvl.find(f"{NS}numFmt").get(f"{NS}val") if lvl is not None else "bullet"
    return ("ul" if fmt == "bullet" else "ol"), int(ilvl)


def table_md(t: Table) -> str:
    rows = []
    for r in t.rows:
        cells = [" ".join(paragraph_md(p) for p in c.paragraphs).replace("|", "\\|").strip() for c in r.cells]
        rows.append(cells)
    if not rows:
        return ""
    width = max(len(r) for r in rows)
    rows = [r + [""] * (width - len(r)) for r in rows]
    lines = ["| " + " | ".join(rows[0]) + " |", "| " + " | ".join(["---"] * width) + " |"]
    lines += ["| " + " | ".join(r) + " |" for r in rows[1:]]
    return "\n".join(lines)


def convert(path: str) -> tuple[str, str]:
    doc = Document(path)
    try:
        numbering = doc.part.numbering_part.element
    except Exception:
        numbering = None

    meta, status_line = {}, ""
    body, section, list_counter = [], None, {}
    for child in doc.element.body.iterchildren():
        tag = child.tag.replace(NS, "")
        if tag == "p":
            p = Paragraph(child, doc)
            text = p.text.strip()
            style = p.style.name if p.style is not None else ""
            if style == "Heading 1":
                section = text.lower()
                continue
            if section is None:
                if text.startswith("Status:"):
                    status_line = text
                continue
            if not section.startswith("page copy") or not text:
                continue
            if style.startswith("Heading"):
                level = int(style.split()[-1]) if style.split()[-1].isdigit() else 2
                body.append("#" * level + " " + paragraph_md(p))
                list_counter = {}
                continue
            kind = list_kind(p, numbering)
            if kind:
                k, lvl = kind
                list_counter[lvl] = list_counter.get(lvl, 0) + 1
                marker = f"{list_counter[lvl]}." if k == "ol" else "-"
                body.append("    " * lvl + f"{marker} {paragraph_md(p)}")
                continue
            list_counter = {}
            body.append(paragraph_md(p))
        elif tag == "tbl":
            t = Table(child, doc)
            if section is not None and section.startswith("page metadata"):
                for r in t.rows[1:]:
                    key, value = r.cells[0].text.strip(), r.cells[1].text.strip()
                    if key in FIELDS:
                        meta[FIELDS[key]] = value
            elif section is not None and section.startswith("page copy"):
                body.append(table_md(t))
                list_counter = {}

    # Status: Draft for attorney review · URL: /personal-injury/auto-accidents · Delivered: October 12, 2026
    # City pages: URL: /personal-injury/auto-accidents/detroit -> auto-accidents--detroit.md with "city: detroit"
    fields = dict(
        (k.strip().lower(), v.strip())
        for k, v in (part.split(":", 1) for part in status_line.split("·") if ":" in part)
    )
    url = re.sub(r"\s*\([^)]*\)\s*$", "", fields.get("url", "")).strip().rstrip("/")  # "… (new)" notes
    parts = [x for x in url.split("/") if x]
    section_name = parts[0] if parts else "personal-injury"
    slug = parts[1] if len(parts) > 1 else parts[0]
    # /personal-injury/<practice>/<city>: a city or county page for that practice.
    city = parts[2] if len(parts) > 2 else ""
    status = "approved" if fields.get("status", "").lower().startswith("approved") else "draft"
    delivered = fields.get("delivered", "")
    try:
        delivered = datetime.strptime(delivered, "%B %d, %Y").strftime("%Y-%m-%d")
    except ValueError:
        pass

    front = [
        "---",
        f"slug: {slug}",
        f"section: {section_name}",
        *([f"city: {city}"] if city else []),
        f"status: {status}",
        *(f"{key}: {meta.get(key, '')}" for key in FIELDS.values()),
        f"source: {os.path.basename(path)}",
        f"delivered: {delivered}",
        "---",
    ]
    # Blank line between blocks, but keep consecutive list items together.
    lines = []
    for i, line in enumerate(body):
        is_item = bool(re.match(r"^\s*(-|\d+\.) ", line))
        prev_item = i > 0 and bool(re.match(r"^\s*(-|\d+\.) ", body[i - 1]))
        if lines and not (is_item and prev_item):
            lines.append("")
        lines.append(line)
    return (f"{slug}--{city}" if city else slug), "\n".join(front) + "\n\n" + "\n".join(lines) + "\n"


def main():
    os.makedirs(OUT, exist_ok=True)
    files = sorted(f for f in os.listdir(SRC) if f.lower().endswith(".docx") and not f.startswith("~$"))
    for name in files:
        slug, md = convert(os.path.join(SRC, name))
        target = os.path.join(OUT, f"{slug}.md")
        with open(target, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(md)
        print(f"{name} -> content-source/practice/{slug}.md")


if __name__ == "__main__":
    main()
