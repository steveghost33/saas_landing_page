import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const getLinkClass = ({ isActive }) => {
    const base =
      "px-4 py-2 rounded-xl text-sm font-semibold transition duration-200";
    const active = "bg-s2 text-white";
    const inactive = "text-white hover:bg-white/10";
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-s1/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Home">
          <img
            src="/images/ella-tech-logo.png"
            alt="Ella Tech Solutions"
            className="h-10 w-auto"
          />
          <span className="text-white font-extrabold text-lg tracking-wide">
            Ella Tech Solutions
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={getLinkClass} end>
            Home
          </NavLink>

          <NavLink to="/tech-solutions" className={getLinkClass}>
            Tech Solutions
          </NavLink>

          <NavLink to="/web-projects" className={getLinkClass}>
            Web Projects
          </NavLink>

          <a
            href="/#contact"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition duration-200"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden px-3 py-2 rounded-xl text-white font-semibold hover:bg-white/10 transition duration-200"
          aria-label="Toggle menu"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          Menu
        </button>
      </div>

      {menuOpen ? (
        <div className="md:hidden border-t border-white/10 bg-s1/98 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            <NavLink
              to="/"
              className={getLinkClass}
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/tech-solutions"
              className={getLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Tech Solutions
            </NavLink>

            <NavLink
              to="/web-projects"
              className={getLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Web Projects
            </NavLink>

            <a
              href="/#contact"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
