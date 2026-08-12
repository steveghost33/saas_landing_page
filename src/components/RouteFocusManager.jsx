// src/components/RouteFocusManager.jsx
//
// Client-side route changes (react-router) don't reload the page, so nothing
// moves keyboard/screen-reader focus or resets the reading position the way
// a full navigation would. Move focus to the main landmark on each pathname
// change so assistive tech users land at the top of the new page instead of
// staying on the nav link they just activated.
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const RouteFocusManager = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Don't steal focus on initial page load, only on subsequent
      // client-side navigations.
      isFirstRender.current = false;
      return;
    }

    // Hash-only navigation (e.g. "/#services") is an in-page anchor jump
    // handled by ScrollToHash, not a route change, focus should follow
    // the anchor experience there rather than jump to the top of main.
    // (Read hash fresh from window rather than depending on location.hash,
    // so an anchor click alone doesn't re-run this effect.)
    if (window.location.hash) return;

    const main = document.getElementById("main-content");
    main?.focus();
  }, [location.pathname]);

  return null;
};

export default RouteFocusManager;
