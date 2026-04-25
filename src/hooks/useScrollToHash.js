import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash({ defaultToTop = false, topBehavior = "smooth" } = {}) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    if (defaultToTop) {
      window.scrollTo({ top: 0, behavior: topBehavior });
    }
  }, [defaultToTop, hash, topBehavior]);
}

