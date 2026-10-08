import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVY, GOLD, navItems, type NavMenu } from "../../data/navigation";
import { PHONE_DISPLAY, PHONE_HREF, SMS_NUMBER, smsHref } from "../../data/contact";
import { DesktopNavMenu, MobileNavMenu } from "./header/NavMenus";
import { PhoneIcon } from "./footer/icons";
import { openIntakeModal } from "./IntakeModal";

const desktopCellClass =
  "relative flex items-center whitespace-nowrap border-r border-white/10 px-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#FFFFFF]/85 transition-all duration-150 hover:bg-white/[0.04] hover:text-[#FFFFFF] focus-visible:bg-white/10 focus-visible:outline-none xl:px-6 xl:tracking-[0.18em]";

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

        {/* Call + (Text) + Free Case Review — desktop. Mobile uses MobileActionBar. */}
        <a
          aria-label={`Call ATLAW at ${PHONE_DISPLAY}`}
          className="hidden items-center gap-2 whitespace-nowrap border-l border-white/10 px-3.5 font-sans text-[13px] font-semibold tracking-[0.04em] text-[#FFFFFF] transition-colors duration-150 hover:bg-white/[0.04] focus-visible:bg-white/10 focus-visible:outline-none lg:flex xl:px-5"
          href={PHONE_HREF}
        >
          <PhoneIcon />
          <span className="hidden min-[1440px]:inline">{PHONE_DISPLAY}</span>
        </a>
        {SMS_NUMBER && (
          <a
            className={`${desktopCellClass} hidden border-l xl:flex`}
            href={smsHref(SMS_NUMBER)}
          >
            Text Us
          </a>
        )}
        <button
          className="hidden items-center whitespace-nowrap px-4 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#0E1B2C] transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white lg:flex xl:px-6 xl:tracking-[0.18em]"
          onClick={openIntakeModal}
          style={{ backgroundColor: GOLD }}
          type="button"
        >
          Free Case Review
        </button>

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
          <div className="max-h-[calc(100vh-132px)] overflow-y-auto px-5 pb-8 pt-3">
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

            <button
              className="mt-6 flex w-full items-center justify-center px-6 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0E1B2C]"
              onClick={() => {
                setMobileOpen(false);
                openIntakeModal();
              }}
              style={{ backgroundColor: GOLD }}
              type="button"
            >
              Free Case Review
            </button>
          </div>
        </nav>
      )}
    </header>
    </>
  );
};
