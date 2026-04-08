// src/sections/Header.jsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { socials } from "../constants/index.jsx";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Tell other UI (chatbot) when the mobile menu opens or closes
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ets:mobileMenu", { detail: { open: isOpen } })
    );
  }, [isOpen]);

  const NavLink = ({ title }) => (
    <a
      href={`/#${title}`}
      onClick={() => setIsOpen(false)}
      className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-xl:my-4 max-xl:h5"
    >
      {title.charAt(0).toUpperCase() + title.slice(1)}
    </a>
  );

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={clsx(
        "w-full py-10 transition-all duration-500 max-xl:py-4",
        hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px]"
      )}
    >
      {/* Top Bar Desktop Only */}
      <div className="container flex justify-between items-center mb-4 max-xl:hidden">
        {/* DESKTOP Book Us Now Button */}
        <a
          href="/#contact"
          className="flex items-center gap-3 px-6 py-3 text-sm font-semibold uppercase text-p1 border border-p1/30 rounded-full hover:bg-p1/10 transition-all duration-300"
        >
          <img src="/images/zap.svg" alt="zap" className="w-5 h-5" />
          Book Us Now
        </a>

        {/* Social Media Links */}
        <div className="flex items-center gap-3">
          {socials.map(({ id, url, icon, title }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-8 h-8 flex items-center justify-center rounded-full bg-s2 hover:bg-s3 transition-all duration-300"
            >
              <img src={icon} alt={title} className="w-4 h-4 object-contain" />
            </a>
          ))}
        </div>
      </div>

      <div className="container flex items-center max-xl:px-5 max-xl:py-3">
        {/* Mobile logo only when menu closed */}
        {!isOpen && (
          <Link
            to="/"
            className="xl:hidden flex-1 cursor-pointer z-2"
            onClick={handleLogoClick}
          >
            <img src="/images/ellalogo.svg" alt="logo" className="w-full h-auto" />
          </Link>
        )}

        {/* Mobile Menu Overlay */}
        <div
          className={clsx(
            "w-full max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:w-full max-xl:h-screen max-xl:bg-s2 max-xl:opacity-0 max-xl:z-[100]",
            isOpen ? "max-xl:opacity-100" : "max-xl:pointer-events-none"
          )}
        >
          <div className="max-xl:relative max-xl:flex max-xl:flex-col max-xl:min-h-screen max-xl:p-6 max-xl:pt-20 max-xl:overflow-hidden sidebar-before max-md:px-4">
            {/* Mobile Logo in Menu */}
            <Link
              to="/"
              className="xl:hidden flex justify-center cursor-pointer z-2"
              onClick={handleLogoClick}
            >
              <img
                src="/images/ellalogo.svg"
                alt="logo"
                className="w-[320px] max-w-[88vw] h-auto"
              />
            </Link>

            {/* Mobile Social Media Links */}
            <ul className="xl:hidden flex justify-center gap-4 mt-10">
              {socials.map(({ id, url, icon, title }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-s3 hover:bg-s4 transition-all duration-300"
                  >
                    <img src={icon} alt={title} className="w-5 h-5 object-contain" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Book Us Now Button */}
            <div className="xl:hidden flex justify-center mt-8 mb-10">
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase text-p1 border border-p1/30 rounded-full hover:bg-p1/10 transition-all duration-300"
              >
                <img src="/images/zap.svg" alt="zap" className="w-5 h-5" />
                Book Us Now
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="max-xl:relative max-xl:z-2 max-xl:flex-1 max-xl:flex max-xl:items-center">
              <ul className="flex max-xl:block max-xl:px-12">
                <li className="nav-li">
                  <NavLink title="services" />
                  <div className="dot" />
                  <NavLink title="plans" />
                </li>

                <li className="nav-logo">
                  <Link
                    to="/"
                    className="max-xl:hidden transition-transform duration-500 cursor-pointer"
                    onClick={handleLogoClick}
                  >
                    <img src="/images/ellalogo.svg" alt="logo" className="w-[560px] h-auto" />
                  </Link>
                </li>

                <li className="nav-li">
                  <NavLink title="faq" />
                  <div className="dot" />
                  <NavLink title="contact" />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Menu Toggle Button */}
        <button
          className="xl:hidden z-[110] flex items-center gap-2 px-3 py-2 border border-p1/50 rounded-full bg-s2 hover:bg-s3 transition-colors duration-200"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
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
    </header>
  );
};

export default Header;
