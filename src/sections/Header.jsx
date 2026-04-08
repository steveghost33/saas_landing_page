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
      className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
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
        "w-full py-10 transition-all duration-500 max-lg:py-4",
        hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px]"
      )}
    >
      {/* Top Bar Desktop Only */}
      <div className="container flex justify-between items-center mb-4 max-lg:hidden">
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

      <div className="container flex h-14 items-center max-lg:px-5">
        {/* Mobile logo only when menu closed */}
        {!isOpen && (
          <Link
            to="/"
            className="lg:hidden flex-1 cursor-pointer z-2"
            onClick={handleLogoClick}
          >
            <img src="/images/ellalogo.svg" alt="logo" className="w-56 h-auto" />
          </Link>
        )}

        {/* Mobile Menu Overlay */}
        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-screen max-lg:bg-s2 max-lg:opacity-0 max-lg:z-[100]",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:pt-20 max-lg:overflow-hidden sidebar-before max-md:px-4">
            {/* Mobile Logo in Menu */}
            <Link
              to="/"
              className="lg:hidden flex justify-center cursor-pointer z-2"
              onClick={handleLogoClick}
            >
              <img
                src="/images/ellalogo.svg"
                alt="logo"
                className="w-[320px] max-w-[88vw] h-auto"
              />
            </Link>

            {/* Mobile Social Media Links */}
            <ul className="lg:hidden flex justify-center gap-4 mt-10">
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
            <div className="lg:hidden flex justify-center mt-8 mb-10">
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
            <nav className="max-lg:relative max-lg:z-2 max-lg:flex-1 max-lg:flex max-lg:items-center">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="nav-li">
                  <NavLink title="services" />
                  <div className="dot" />
                  <NavLink title="plans" />
                </li>

                <li className="nav-logo">
                  <Link
                    to="/"
                    className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                    onClick={handleLogoClick}
                  >
                    <img src="/images/ellalogo.svg" width={950} height={950} alt="logo" />
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

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden z-[110] flex items-center gap-2 px-3 py-2 border border-p1/50 rounded-full bg-s2 hover:bg-s3 transition-colors duration-200"
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
