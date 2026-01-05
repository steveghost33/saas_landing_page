// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = ({ offset = 120 }) => {
  const location = useLocation();

  useEffect(() => {
    // Only run when hash is present
    const hash = location.hash;
    if (!hash) return;

    const id = hash.replace("#", "");
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    // Wait a tick so the DOM is fully painted
    window.requestAnimationFrame(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, [location.pathname, location.hash, offset]);

  return null;
};

export default ScrollToHash;
