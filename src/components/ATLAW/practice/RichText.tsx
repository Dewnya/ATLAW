import { Fragment } from "react";
import { Link } from "react-router-dom";
import type { Block, Inline } from "../../../content/types";

const INK = "#0B1F3A";
const STONE = "#3A4A63";
const GOLD_ACCENT = "#B88A2D";

/** Plain text of inline nodes (FAQ schema, accessible labels). */
export const inlineText = (nodes: Inline[]): string =>
  nodes
    .map((n) => (n.t === "text" ? n.v : n.t === "placeholder" ? `[${n.kind}: ${n.v}]` : inlineText(n.c)))
    .join("");

/**
 * Renders imported inline copy. Placeholders only exist in drafts (the import
 * refuses approved pages that contain one); they show highlighted so reviewers
 * can find every open item on the preview.
 */
export const RichInline = ({ nodes }: { nodes: Inline[] }): JSX.Element => (
  <>
    {nodes.map((n, i) => {
      switch (n.t) {
        case "text":
          return <Fragment key={i}>{n.v}</Fragment>;
        case "strong":
          return <strong className="font-semibold" key={i} style={{ color: INK }}><RichInline nodes={n.c} /></strong>;
        case "em":
          return <em key={i}><RichInline nodes={n.c} /></em>;
        case "link":
          return n.href.startsWith("/") ? (
            <Link className="font-medium underline decoration-[#B88A2D]/60 underline-offset-[3px] hover:decoration-[#B88A2D]" key={i} style={{ color: INK }} to={n.href}>
              <RichInline nodes={n.c} />
            </Link>
          ) : (
            <a className="font-medium underline decoration-[#B88A2D]/60 underline-offset-[3px] hover:decoration-[#B88A2D]" href={n.href} key={i} rel="noopener noreferrer" style={{ color: INK }} target="_blank">
              <RichInline nodes={n.c} />
            </a>
          );
        case "placeholder":
          return (
            <mark className="rounded-[3px] bg-[#FFE89A] px-1 font-sans text-[0.92em] font-semibold text-[#5A4300]" key={i} title="Open item: needs the firm or attorney before publishing">
              {`[${n.kind}${n.v ? `: ${n.v}` : ""}]`}
            </mark>
          );
      }
    })}
  </>
);

const bodyText = "font-sans text-[17px] leading-[1.7] lg:text-[18px]";

export const RichBlocks = ({ blocks }: { blocks: Block[] }): JSX.Element => (
  <div className="space-y-5">
    {blocks.map((b, i) => {
      switch (b.t) {
        case "p":
          return <p className={bodyText} key={i} style={{ color: STONE }}><RichInline nodes={b.c} /></p>;
        case "h3":
          return (
            <h3 className="pt-2 font-serifDisplay text-[21px] font-normal leading-[1.25] tracking-[-0.01em] lg:text-[23px]" key={i} style={{ color: INK }}>
              <RichInline nodes={b.c} />
            </h3>
          );
        case "ul":
          return (
            <ul className="space-y-3" key={i}>
              {b.items.map((item, j) => (
                <li className={`${bodyText} flex gap-3`} key={j} style={{ color: STONE }}>
                  <span aria-hidden="true" className="mt-[11px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ backgroundColor: GOLD_ACCENT }} />
                  <span><RichInline nodes={item} /></span>
                </li>
              ))}
            </ul>
          );
        case "ol":
          return (
            <ol className="space-y-4" key={i}>
              {b.items.map((item, j) => (
                <li className={`${bodyText} flex gap-4`} key={j} style={{ color: STONE }}>
                  <span
                    aria-hidden="true"
                    className="mt-[2px] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full font-sans text-[13px] font-semibold text-white"
                    style={{ backgroundColor: INK }}
                  >
                    {j + 1}
                  </span>
                  <span><RichInline nodes={item} /></span>
                </li>
              ))}
            </ol>
          );
        case "table":
          return (
            // Wide tables scroll sideways inside their box on phones instead of
            // stretching the page.
            <div className="-mx-1 overflow-x-auto rounded-[12px] border border-[#0B1F3A]/10" key={i} role="region" aria-label="Table" tabIndex={0}>
              <table className="w-full min-w-[520px] border-collapse text-left font-sans text-[15px] leading-[1.5]">
                <thead>
                  <tr style={{ backgroundColor: INK }}>
                    {b.head.map((cell, j) => (
                      <th className="px-4 py-3 align-bottom text-[13px] font-semibold uppercase tracking-[0.06em] text-white" key={j} scope="col">
                        <RichInline nodes={cell} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, r) => (
                    <tr className={r % 2 ? "bg-[#F7F7F5]" : "bg-white"} key={r}>
                      {row.map((cell, j) => (
                        <td className="border-t border-[#0B1F3A]/8 px-4 py-3 align-top" key={j} style={{ color: j === 0 ? INK : STONE }}>
                          <RichInline nodes={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
      }
    })}
  </div>
);
