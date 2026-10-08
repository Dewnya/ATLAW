import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GOLD, NAVY_PANEL, type NavMenu } from "../../../data/navigation";

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className={`ml-2 h-3 w-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 12 12"
  >
    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

/* ── Desktop: hover/click dropdown panel ─────────────────────────────────────
   Mouse hover opens it; a click after hovering pins it, a second click closes.
   Touch and keyboard use click/Enter. Escape or focus leaving the menu closes
   it and Escape returns focus to the trigger. */

interface DesktopNavMenuProps {
  menu: NavMenu;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerClassName: string;
}

export const DesktopNavMenu = ({ menu, open, onOpenChange, triggerClassName }: DesktopNavMenuProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedByHover = useRef(false);
  const panelId = `nav-menu-${menu.id}`;

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  useEffect(() => cancelClose, []);

  return (
    <div
      className="flex items-stretch"
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) onOpenChange(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          onOpenChange(false);
          buttonRef.current?.focus();
        }
      }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        if (!open) {
          openedByHover.current = true;
          onOpenChange(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        closeTimer.current = window.setTimeout(() => onOpenChange(false), 150);
      }}
      ref={wrapperRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={triggerClassName}
        onClick={() => {
          if (open && openedByHover.current) {
            openedByHover.current = false; // pin it instead of closing
            return;
          }
          openedByHover.current = false;
          onOpenChange(!open);
        }}
        ref={buttonRef}
        type="button"
      >
        {menu.label}
        <Chevron open={open} />
      </button>

      {open && (
        <div
          className="absolute inset-x-0 top-full border-t border-white/10 shadow-[0_24px_48px_rgba(5,15,28,0.35)]"
          id={panelId}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) onOpenChange(false);
          }}
          style={{ backgroundColor: NAVY_PANEL }}
        >
          <div
            className="mx-auto grid w-full max-w-[1180px] gap-x-10 gap-y-8 px-8 py-10"
            style={{ gridTemplateColumns: `repeat(${menu.groups.length}, minmax(0, 1fr))` }}
          >
            {menu.groups.map((group) => (
              <div key={group.label}>
                <GroupHeading group={group} />
                {group.links.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          className="font-sans text-[15px] text-white/80 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none"
                          to={link.to}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto w-full max-w-[1180px] px-8 py-4">
              <Link
                className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-white focus-visible:underline focus-visible:outline-none"
                to={menu.overview.to}
              >
                {menu.overview.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GroupHeading = ({ group }: { group: NavMenu["groups"][number] }) => {
  const className = "block font-sans text-[11px] font-semibold uppercase tracking-[0.2em]";
  if (!group.to) {
    return (
      <p className={className} style={{ color: GOLD }}>
        {group.label}
      </p>
    );
  }
  return (
    <Link
      className={`${className} transition-opacity hover:opacity-80 focus-visible:underline focus-visible:outline-none`}
      style={{ color: GOLD }}
      to={group.to}
    >
      {group.label} <span aria-hidden="true">→</span>
    </Link>
  );
};

/* ── Mobile drawer: accordion section ───────────────────────────────────────── */

interface MobileNavMenuProps {
  menu: NavMenu;
  onNavigate: () => void;
}

export const MobileNavMenu = ({ menu, onNavigate }: MobileNavMenuProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const sectionId = `mobile-nav-menu-${menu.id}`;

  return (
    <div className="border-b border-white/10">
      <button
        aria-controls={sectionId}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFFFFF]"
        onClick={() => setExpanded((v) => !v)}
        type="button"
      >
        {menu.label}
        <Chevron open={expanded} />
      </button>

      {expanded && (
        <div
          className="pb-5"
          id={sectionId}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) onNavigate();
          }}
        >
          {menu.groups.map((group) => (
            <div className="mt-3 first:mt-0" key={group.label}>
              <GroupHeading group={group} />
              {group.links.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link className="block py-1.5 font-sans text-[15px] text-white/85" to={link.to}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link
            className="mt-4 inline-block font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85"
            to={menu.overview.to}
          >
            {menu.overview.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </div>
  );
};
