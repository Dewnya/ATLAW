import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ATLAWLandingPage } from "./screens/ATLAWLandingPage";
import { BackToTop } from "./components/ATLAW/BackToTop";
import { IntakeModal } from "./components/ATLAW/IntakeModal";
import { MobileActionBar } from "./components/ATLAW/MobileActionBar";
import { RouteProgressBar } from "./components/ATLAW/RouteProgressBar";
import { ScrollToTop } from "./components/ATLAW/ScrollToTop";
import { MotionReady } from "./motion/MotionReady";

const AboutUsPage = lazy(() => import("./screens/AboutUsPage").then((m) => ({ default: m.AboutUsPage })));
const OurPeoplePage = lazy(() => import("./screens/OurPeoplePage").then((m) => ({ default: m.OurPeoplePage })));
const ContactPage = lazy(() => import("./screens/ContactPage").then((m) => ({ default: m.ContactPage })));
const PracticePage = lazy(() => import("./screens/PracticePage").then((m) => ({ default: m.PracticePage })));
const CityLandingPage = lazy(() => import("./screens/CityLandingPage").then((m) => ({ default: m.CityLandingPage })));
const AreasServedPage = lazy(() => import("./screens/AreasServedPage").then((m) => ({ default: m.AreasServedPage })));
const CityHubPage = lazy(() => import("./screens/CityHubPage").then((m) => ({ default: m.CityHubPage })));
const ResourcePage = lazy(() => import("./screens/ResourcePage").then((m) => ({ default: m.ResourcePage })));
const NewsPage = lazy(() => import("./screens/NewsPage").then((m) => ({ default: m.NewsPage })));
const NewsPostPage = lazy(() => import("./screens/NewsPostPage").then((m) => ({ default: m.NewsPostPage })));
const PrivacyPolicyPage = lazy(() => import("./screens/PrivacyPolicyPage").then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import("./screens/TermsOfUsePage").then((m) => ({ default: m.TermsOfUsePage })));
const NotFoundPage = lazy(() => import("./screens/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

/**
 * App — every route plus the site-wide overlays. Shared by the browser entry
 * (src/index.tsx, inside BrowserRouter) and the build-time prerender
 * (src/entry-server.tsx, inside StaticRouter), so both render the same tree.
 */
export const App = (): JSX.Element => (
  <>
    <ScrollToTop />
    <MotionReady />
    <Suspense fallback={<RouteProgressBar />}>
    <Routes>
      <Route path="/" element={<ATLAWLandingPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/team" element={<OurPeoplePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:slug" element={<NewsPostPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfUsePage />} />

      {/* PI routes */}
      <Route path="/personal-injury" element={<PracticePage section="personal-injury" slug="personal-injury" />} />
      <Route path="/personal-injury/:practice" element={<PracticePage section="personal-injury" />} />
      <Route path="/disability/:practice" element={<PracticePage section="disability" />} />
      <Route path="/personal-injury/:practice/:city" element={<CityLandingPage />} />
      <Route path="/disability/:practice/:city" element={<CityLandingPage />} />
      <Route path="/areas-served" element={<AreasServedPage />} />
      <Route path="/areas-served/:city" element={<CityHubPage />} />
      <Route path="/resources/:slug" element={<ResourcePage />} />
      <Route path="/faq" element={<ResourcePage slug="faq" />} />

      {/* Legacy redirects */}
      <Route path="/our-people" element={<Navigate to="/team" replace />} />
      <Route path="/practice-areas/personal-injury" element={<Navigate to="/personal-injury" replace />} />
      <Route path="/practice-areas/auto-accidents" element={<Navigate to="/personal-injury/auto-accidents" replace />} />
      <Route path="/practice-areas/medical-malpractice" element={<Navigate to="/personal-injury/medical-malpractice" replace />} />
      <Route path="/practice-areas/wrongful-death" element={<Navigate to="/personal-injury/wrongful-death" replace />} />
      <Route path="/practice-areas/workers-compensation" element={<Navigate to="/personal-injury/workers-compensation" replace />} />

      {/* Catch removed routes */}
      <Route path="/practice-areas/*" element={<Navigate to="/" replace />} />
      <Route path="/global-reach" element={<Navigate to="/" replace />} />
      <Route path="/news-insights" element={<Navigate to="/news" replace />} />

      {/* Anything else */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
    <MobileActionBar />
    <IntakeModal />
    <BackToTop />
  </>
);
