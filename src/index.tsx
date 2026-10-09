import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";
import { SmoothScroll } from "./motion/SmoothScroll";
import "../tailwind.css";

const container = document.getElementById("app") as HTMLElement;

const tree = (
  <StrictMode>
    <HelmetProvider>
    <SmoothScroll>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
    </SmoothScroll>
    </HelmetProvider>
  </StrictMode>
);

// Prerendered pages arrive with their HTML already inside #app: hydrate it
// instead of throwing it away. Every other URL still renders from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
