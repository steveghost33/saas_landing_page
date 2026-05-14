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

const MenuIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="16" height="2" rx="1" fill="#2EF2FF" />
    <rect y="5" width="16" height="2" rx="1" fill="#2EF2FF" />
    <rect y="10" width="16" height="2" rx="1" fill="#2EF2FF" />
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
    if (isOpen && window.innerWidth < 1280) {
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

  const MenuToggle = ({ className = "" }) => (
    <button
      className={clsx(
        "flex h-9 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-p1/50 bg-s2 px-3 text-sm font-semibold uppercase tracking-[0.08em] text-p1 hover:bg-s3 transition-colors duration-200",
        className
      )}
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="site-nav"
    >
      {isOpen ? (
        <img src="/images/close.svg" alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
      ) : (
        <>
          <span>Menu</span>
          <MenuIcon />
        </>
      )}
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
        <div className="container relative z-[110]">
          <div className="flex items-center justify-between gap-4 py-3 xl:py-4">
            <div className="flex min-w-0 items-center gap-3 xl:gap-4">
              <ThemeToggle />
              <Link to="/" onClick={handleLogoClick} className="block min-w-0 cursor-pointer">
                <img
                  src="/images/ellalogo.svg"
                  alt="Ella Tech Solutions"
                  className="theme-logo h-auto w-[220px] max-w-full sm:w-[280px] lg:w-[360px] xl:w-[420px]"
                />
              </Link>
            </div>

            <MenuToggle />
          </div>

          {isOpen && (
            <div className="relative hidden xl:block">
              <div className="absolute right-0 top-2 w-[340px] rounded-[28px] border border-white/10 bg-s2/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <nav id="site-nav" aria-label="Desktop menu">
                  <ul className="space-y-2">
                    {["services", "plans", "faq", "contact"].map((title, i) => (
                      <li key={title}>
                        <a
                          ref={i === 0 ? firstNavLinkRef : null}
                          href={`/#${title}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-lg font-semibold uppercase tracking-[0.04em] text-p4 transition-colors duration-300 hover:bg-white/5 hover:text-p1"
                        >
                          <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
                          <span className="text-p1/70">+</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="my-5 h-px bg-white/10" />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {socials.map(({ id, url, icon, title }) => (
                      <a
                        key={id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Ella Tech Solutions on ${title}`}
                        className="social-icon flex h-10 w-10 items-center justify-center rounded-full bg-s3 hover:bg-s4 transition-all duration-300"
                      >
                        <img src={icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                      </a>
                    ))}
                  </div>

                  <a
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-full border border-p1/30 px-4 py-2 text-xs font-semibold uppercase text-p1 transition-all duration-300 hover:bg-p1/10"
                  >
                    <img src="/images/zap.svg" alt="zap" className="h-4 w-4" />
                    Book Us Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile site menu overlay ───────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-s2 sidebar-before xl:hidden">
          <div className="flex min-h-screen flex-col p-6 pt-24 max-md:px-4 xl:px-10">
            <div className="mx-auto flex w-full max-w-[540px] flex-1 flex-col items-center xl:max-w-[680px] xl:justify-center xl:gap-8 xl:pt-4">
            {/* Socials */}
              <ul className="flex justify-center gap-4">
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
              <div className="mt-8 flex justify-center xl:mt-0">
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
              <nav id="site-nav" className="flex flex-1 items-center justify-center xl:flex-none">
                <ul className="block px-8 text-center xl:px-12">
                  {["services", "plans", "faq", "contact"].map((title, i) => (
                    <li key={title} className="my-4 xl:my-3">
                      <a
                        ref={i === 0 ? firstNavLinkRef : null}
                        href={`/#${title}`}
                        onClick={() => setIsOpen(false)}
                        className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 h5 xl:text-[2rem] xl:leading-[2.5rem]"
                      >
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
