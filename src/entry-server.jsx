import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

// react-helmet-async renders real <title>/<meta>/<link> host elements on
// React 19, which React itself hoists to the front of the renderToString
// output (React 19's built-in document-metadata hoisting) — so the resolved
// per-page tags come back inline in `html` rather than via HelmetProvider's
// legacy context object.
export function render(url) {
  const html = renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  return { html };
}
