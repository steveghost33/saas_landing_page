// src/sections/Header.jsx

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { socials } from "../constants/index.jsx";
import { CHATBOT_EVENT_MOBILE_MENU } from "../features/chatbot/chatbotConfig.js";
import { useTheme } from "../context/ThemeContext.jsx";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const firstNavLinkRef = useRef(null);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(CHATBOT_EVENT_MOBILE_MENU, { detail: { open: isOpen } })
    );
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && firstNavLinkRef.current) {
      firstNavLinkRef.current.focus();
    }
  }, [isOpen]);

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ThemeToggle = ({ className = "" }) => (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "flex items-center justify-center w-9 h-9 rounded-full border border-p1/50 bg-s2 text-p1 hover:bg-s3 transition-colors duration-200",
        className
      )}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );

  return (
    <>
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <header
        className={clsx(
          "w-full py-4 transition-all duration-500 max-xl:py-0 max-xl:overflow-x-hidden",
          hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px]"
        )}
      >
        {/* ── Desktop top bar ────────────────────────────────── */}
        <div className="max-xl:hidden container flex justify-between items-center mb-2">
          <a
            href="/#contact"
            className="flex items-center gap-3 px-6 py-3 text-sm font-semibold uppercase text-p1 border border-p1/30 rounded-full hover:bg-p1/10 transition-all duration-300"
          >
            <img src="/images/zap.svg" alt="zap" className="w-5 h-5" />
            Book Us Now
          </a>
          <div className="flex items-center gap-3">
            {socials.map(({ id, url, icon, title }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Ella Tech Solutions on ${title}`}
                className="social-icon w-8 h-8 flex items-center justify-center rounded-full bg-s2 hover:bg-s3 transition-all duration-300"
              >
                <img src={icon} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Desktop logo — full viewport width ──────────────── */}
        <div className="max-xl:hidden w-full">
          <Link to="/" onClick={handleLogoClick} className="block cursor-pointer">
            <img src="/images/ellalogo.svg" alt="Ella Tech Solutions" className="theme-logo w-full h-auto block" />
          </Link>
        </div>

        {/* ── Desktop nav links row — below logo ───────────────── */}
        <div className="max-xl:hidden container flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-p1/30 text-p1 hover:bg-p1/10 transition-all duration-300"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="dot" />
            <a href="/#services" className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1">Services</a>
            <div className="dot" />
            <a href="/#plans" className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1">Plans</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="/#faq" className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1">Faq</a>
            <div className="dot" />
            <a href="/#contact" className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1">Contact</a>
          </div>
        </div>

        {/* ── Mobile header: controls row + full-width logo row ── */}
        <div className="xl:hidden">
          <div className="container flex items-center justify-between gap-3 py-3 relative z-[110]">
            <ThemeToggle className="flex-shrink-0" />

            <button
              className="flex-shrink-0 z-[110] flex items-center gap-2 px-3 py-2 border border-p1/50 rounded-full bg-s2 hover:bg-s3 transition-colors duration-200"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? (
                <img src="/images/close.svg" alt="close" className="w-4 h-4 object-contain" />
              ) : (
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="2" rx="1" fill="#2EF2FF"/>
                  <rect y="5" width="16" height="2" rx="1" fill="#2EF2FF"/>
                  <rect y="10" width="16" height="2" rx="1" fill="#2EF2FF"/>
                </svg>
              )}
              <span className="text-xs font-bold uppercase tracking-widest text-p1">
                {isOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

          {!isOpen && (
            <Link to="/" onClick={handleLogoClick} className="block w-full">
              <img
                src="/images/ellalogo.svg"
                alt="Ella Tech Solutions"
                className="theme-logo w-full h-auto block"
              />
            </Link>
          )}
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────── */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 bg-s2 z-[100] flex flex-col overflow-hidden sidebar-before">
          <div className="flex flex-col min-h-screen p-6 pt-20 max-md:px-4">
            {/* Logo */}
            <Link to="/" className="block w-full cursor-pointer" onClick={handleLogoClick}>
              <img
                src="/images/ellalogo.svg"
                alt="Ella Tech Solutions"
                className="theme-logo w-full h-auto block"
              />
            </Link>

            {/* Socials */}
            <ul className="flex justify-center gap-4 mt-10">
              {socials.map(({ id, url, icon, title }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Ella Tech Solutions on ${title}`}
                    className="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-s3 hover:bg-s4 transition-all duration-300"
                  >
                    <img src={icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Book Us Now */}
            <div className="flex justify-center mt-8 mb-10">
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase text-p1 border border-p1/30 rounded-full hover:bg-p1/10 transition-all duration-300"
              >
                <img src="/images/zap.svg" alt="zap" className="w-5 h-5" />
                Book Us Now
              </a>
            </div>

            {/* Nav links */}
            <nav id="mobile-nav" className="flex-1 flex items-center">
              <ul className="block px-12">
                {["services", "plans", "faq", "contact"].map((title, i) => (
                  <li key={title} className="my-4">
                    <a
                      ref={i === 0 ? firstNavLinkRef : null}
                      href={`/#${title}`}
                      onClick={() => setIsOpen(false)}
                      className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 h5"
                    >
                      {title.charAt(0).toUpperCase() + title.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
