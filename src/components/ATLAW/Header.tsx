import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVY, GOLD, navItems, type NavMenu } from "../../data/navigation";
import { DesktopNavMenu, MobileNavMenu } from "./header/NavMenus";

const desktopCellClass =
  "relative flex items-center whitespace-nowrap border-r border-white/10 px-3.5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#FFFFFF]/85 transition-all duration-150 hover:bg-white/[0.04] hover:text-[#FFFFFF] focus-visible:bg-white/10 focus-visible:outline-none xl:px-6 xl:tracking-[0.18em]";

export const Header = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavMenu["id"] | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // A pinned (clicked/tapped) dropdown closes when you tap anywhere outside the header.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  // Header stays pinned; scrolling only switches it to the translucent blurred style.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b border-white/10 transition-colors duration-300 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
      style={{ backgroundColor: scrolled ? "rgba(14,27,51,0.82)" : NAVY }}
    >
      <div className="flex h-[72px] w-full items-stretch lg:h-[88px]">
        {/* Logo */}
        <Link
          aria-label="ATLAW home"
          className="flex shrink-0 items-center border-r border-white/10 px-6 xl:px-8"
          onClick={() => {
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          to="/"
        >
          <img alt="ATLAW" className="h-6 w-auto lg:h-7" src="/assets/atlaw logo.svg" />
        </Link>

        {/* Desktop nav — dropdown menus + direct links */}
        <nav aria-label="Primary" className="hidden flex-1 items-stretch lg:flex">
          {navItems.map((item) =>
            item.kind === "menu" ? (
              <DesktopNavMenu
                key={item.id}
                menu={item}
                onOpenChange={(open) => setOpenMenu(open ? item.id : null)}
                open={openMenu === item.id}
                triggerClassName={`${desktopCellClass} ${openMenu === item.id ? "bg-white/[0.06] text-[#FFFFFF]" : ""}`}
              />
            ) : (
              <Link className={desktopCellClass} key={item.label} to={item.to}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Spacer */}
        <div className="hidden flex-1 lg:flex" />

        {/* I NEED HELP CTA */}
        <Link
          aria-label="I need help — contact ATLAW"
          className="hidden items-center whitespace-nowrap px-5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-all xl:px-7 xl:tracking-[0.22em] duration-150 hover:bg-[#0E2C4F] focus-visible:outline-none focus-visible:bg-[#0E2C4F] lg:flex"
          style={{
            backgroundColor: "rgba(211,154,42,0.06)",
            color: GOLD,
            borderLeft: "1px solid rgba(211,154,42,0.5)",
          }}
          to="/contact"
        >
          I need help
          <span aria-hidden="true" className="ml-2">→</span>
        </Link>

        {/* Mobile menu button */}
        <button
          aria-controls="atlaw-mobile-nav"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="ml-auto flex items-center px-5 text-[#FFFFFF] focus-visible:outline-none focus-visible:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          type="button"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeWidth={1.8} />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeWidth={1.8} />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile primary"
          className="border-t border-white/10 lg:hidden"
          id="atlaw-mobile-nav"
          style={{ backgroundColor: NAVY }}
        >
          <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-5 pb-8 pt-3">
            {navItems.map((item) =>
              item.kind === "menu" ? (
                <MobileNavMenu key={item.id} menu={item} onNavigate={() => setMobileOpen(false)} />
              ) : (
                <Link
                  className="block border-b border-white/10 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFFFFF]"
                  key={item.label}
                  onClick={() => setMobileOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ),
            )}

            <Link
              className="mt-6 flex items-center justify-center px-6 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em]"
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: "rgba(211,154,42,0.08)",
                color: GOLD,
                border: "1px solid rgba(211,154,42,0.5)",
              }}
              to="/contact"
            >
              I need help <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
    </>
  );
};
