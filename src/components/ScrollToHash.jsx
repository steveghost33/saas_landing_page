// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = ({ offset = 140 }) => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    if (!id) return;

    let attempts = 0;
    const maxAttempts = 25;

    const tryScroll = () => {
      const el = document.getElementById(id);

      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
  }, [location.pathname, location.hash, offset]);

  return null;
};

export default ScrollToHash;

