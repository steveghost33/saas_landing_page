import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash({ defaultToTop = false, topBehavior = "smooth" } = {}) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      const scroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      // Wait for images and layout to settle before scrolling, otherwise
      // content loading above the target shifts the scroll position mid-flight.
      if (document.readyState === "complete") {
        setTimeout(scroll, 100);
      } else {
        window.addEventListener("load", () => setTimeout(scroll, 100), { once: true });
      }
      return;
    }

    if (defaultToTop) {
      window.scrollTo({ top: 0, behavior: topBehavior });
    }
  }, [defaultToTop, hash, topBehavior]);
}

