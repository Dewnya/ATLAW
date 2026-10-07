import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ATLAWLandingPage } from "./screens/ATLAWLandingPage";
import { BackToTop } from "./components/ATLAW/BackToTop";
import { IntakeModal } from "./components/ATLAW/IntakeModal";
import { RouteProgressBar } from "./components/ATLAW/RouteProgressBar";
import { ScrollToTop } from "./components/ATLAW/ScrollToTop";
import { SmoothScroll } from "./motion/SmoothScroll";
import { MotionReady } from "./motion/MotionReady";
import "../tailwind.css";

const AboutUsPage = lazy(() => import("./screens/AboutUsPage").then((m) => ({ default: m.AboutUsPage })));
const OurPeoplePage = lazy(() => import("./screens/OurPeoplePage").then((m) => ({ default: m.OurPeoplePage })));
const ContactPage = lazy(() => import("./screens/ContactPage").then((m) => ({ default: m.ContactPage })));
const PersonalInjuryPage = lazy(() => import("./screens/PersonalInjuryPage").then((m) => ({ default: m.PersonalInjuryPage })));
const AutoAccidentsPage = lazy(() => import("./screens/AutoAccidentsPage").then((m) => ({ default: m.AutoAccidentsPage })));
const MedicalMalpracticePage = lazy(() => import("./screens/MedicalMalpracticePage").then((m) => ({ default: m.MedicalMalpracticePage })));
const WrongfulDeathPage = lazy(() => import("./screens/WrongfulDeathPage").then((m) => ({ default: m.WrongfulDeathPage })));
const PremisesLiabilityPage = lazy(() => import("./screens/PremisesLiabilityPage").then((m) => ({ default: m.PremisesLiabilityPage })));
const DogBitesPage = lazy(() => import("./screens/DogBitesPage").then((m) => ({ default: m.DogBitesPage })));
const WorkersCompensationPage = lazy(() => import("./screens/WorkersCompensationPage").then((m) => ({ default: m.WorkersCompensationPage })));
const CityLandingPage = lazy(() => import("./screens/CityLandingPage").then((m) => ({ default: m.CityLandingPage })));
const AreasServedPage = lazy(() => import("./screens/AreasServedPage").then((m) => ({ default: m.AreasServedPage })));
const NewsPage = lazy(() => import("./screens/NewsPage").then((m) => ({ default: m.NewsPage })));
const NewsPostPage = lazy(() => import("./screens/NewsPostPage").then((m) => ({ default: m.NewsPostPage })));
const PrivacyPolicyPage = lazy(() => import("./screens/PrivacyPolicyPage").then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import("./screens/TermsOfUsePage").then((m) => ({ default: m.TermsOfUsePage })));

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
    <SmoothScroll>
    <BrowserRouter future={{ v7_startTransition: true }}>
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
        <Route path="/personal-injury" element={<PersonalInjuryPage />} />
        <Route path="/personal-injury/auto-accidents" element={<AutoAccidentsPage />} />
        <Route path="/personal-injury/medical-malpractice" element={<MedicalMalpracticePage />} />
        <Route path="/personal-injury/wrongful-death" element={<WrongfulDeathPage />} />
        <Route path="/personal-injury/premises-liability" element={<PremisesLiabilityPage />} />
        <Route path="/personal-injury/dog-bites" element={<DogBitesPage />} />
        <Route path="/personal-injury/workers-compensation" element={<WorkersCompensationPage />} />
        <Route path="/personal-injury/:practice/:city" element={<CityLandingPage />} />
        <Route path="/areas-served" element={<AreasServedPage />} />

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
        <Route path="/news-insights" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
      <IntakeModal />
      <BackToTop />
    </BrowserRouter>
    </SmoothScroll>
    </HelmetProvider>
  </StrictMode>,
);
