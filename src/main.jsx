import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// React's document-metadata hoisting (used by react-helmet-async on React 19)
// adds title/meta/link tags as new elements rather than replacing existing
// ones, so the static fallback tags in index.html must be removed before the
// app mounts its own — otherwise both stick around side by side.
document.querySelectorAll("[data-rh-static]").forEach((el) => el.remove());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
