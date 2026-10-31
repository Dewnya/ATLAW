import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./config";

gsap.registerPlugin(ScrollTrigger);

// Expose the active Lenis instance so leaf components (e.g. a "back to top"
// button) can call lenis.scrollTo without prop-drilling through the SPA.
let lenisInstance: Lenis | null = null;
export const getLenis = (): Lenis | null => lenisInstance;

/**
 * SmoothScroll — mounts once at the app root (around the Router in index.tsx).
 *
 * Drives Lenis from GSAP's ticker so smooth scrolling and ScrollTrigger share a
 * single clock (no double-RAF jitter). Desktop pointers only: with reduced
 * motion, a touch screen, or a viewport under 1024px we skip Lenis entirely
 * and getLenis() returns null, so callers fall back to native scrolling.
 *
 * Renders its children untouched — it is a behavioural wrapper, not a layout one.
 */
export const SmoothScroll = ({ children }: { children: React.ReactNode }): JSX.Element => {
  useEffect(() => {
    // Reduced motion → no Lenis. ScrollTrigger still works on native scroll;
    // the reveal primitives independently collapse to instant fades.
    // Touch devices and narrow screens also keep native scroll: smoothing there
    // fights trackpad/flick momentum and makes the site feel laggy.
    const nativeOnly =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches;
    if (prefersReducedMotion() || nativeOnly) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      // Higher lerp = less trailing. (Lenis ignores `duration` when lerp is set.)
      lerp: 0.15,
      smoothWheel: true,
    });
    lenisInstance = lenis;

    // Keep ScrollTrigger in lockstep with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // gsap.ticker is in seconds; Lenis wants milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    // Let GSAP own the frame loop; disable its internal lag smoothing so scroll
    // velocity stays accurate under CPU throttle.
    gsap.ticker.lagSmoothing(0);

    // Recalculate trigger positions once everything (incl. fonts/images) settles.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};
