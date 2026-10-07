import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVY, GOLD, navLinks } from "../../data/navigation";

export const Header = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

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
      className={`sticky top-0 z-50 w-full border-b border-white/10 transition-colors duration-300 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
      style={{ backgroundColor: scrolled ? "rgba(14,27,51,0.82)" : NAVY }}
    >
      <div className="flex h-[72px] w-full items-stretch lg:h-[88px]">
        {/* Logo */}
        <Link
          aria-label="ATLAW home"
          className="flex shrink-0 items-center border-r border-white/10 px-6 lg:px-8"
          onClick={() => {
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          to="/"
        >
          <img alt="ATLAW" className="h-6 w-auto lg:h-7" src="/assets/atlaw logo.svg" />
        </Link>

        {/* Desktop nav — direct links only */}
        <nav aria-label="Primary" className="hidden flex-1 items-stretch lg:flex">
          {navLinks.map(({ label, to }) => (
            <Link
              className="relative flex items-center whitespace-nowrap border-r border-white/10 px-5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#FFFFFF]/85 transition-all duration-150 hover:bg-white/[0.04] hover:text-[#FFFFFF] focus-visible:bg-white/10 focus-visible:outline-none xl:px-6"
              key={label}
              to={to}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="hidden flex-1 lg:flex" />

        {/* I NEED HELP CTA */}
        <Link
          aria-label="I need help — contact ATLAW"
          className="hidden items-center whitespace-nowrap px-7 font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] transition-all duration-150 hover:bg-[#0E2C4F] focus-visible:outline-none focus-visible:bg-[#0E2C4F] lg:flex"
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
            {navLinks.map(({ label, to }) => (
              <Link
                className="block border-b border-white/10 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFFFFF]"
                key={label}
                onClick={() => setMobileOpen(false)}
                to={to}
              >
                {label}
              </Link>
            ))}

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
