/**
 * ROUTE PROGRESS BAR (presentational)
 *
 * A thin indeterminate bar pinned to the top of the viewport. Used as the
 * router's <Suspense fallback> while a lazily-loaded screen chunk downloads.
 *
 * Client-side navigations run inside startTransition (BrowserRouter's
 * v7_startTransition flag), so React keeps the current page on screen while
 * the next chunk loads and this bar only appears on a cold load of a lazy route.
 */

const GOLD = "#C6A04A";

export const RouteProgressBar = (): JSX.Element => {
  return (
    <div
      aria-label="Loading"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] overflow-hidden"
      role="status"
    >
      <span
        aria-hidden="true"
        className="animate-route-progress absolute inset-y-0 left-0 w-1/3 motion-reduce:w-full motion-reduce:animate-none"
        style={{ backgroundColor: GOLD }}
      />
      <span className="sr-only">Loading&hellip;</span>
    </div>
  );
};
