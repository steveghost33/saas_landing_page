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
      {/* Top Bar - Book Us Button (Left) & Social Links (Right) - Desktop Only */}
      <div className="container flex justify-between items-center mb-4 max-lg:hidden">
        {/* Book Us Now Button - Small */}
        <a
          href="/#contact"
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-p1 border border-p1/30 rounded-full hover:bg-p1/10 transition-all duration-300"
        >
          <img src="/images/zap.svg" alt="zap" className="w-4 h-4" />
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
              <img
                src={icon}
                alt={title}
                className="w-4 h-4 object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="container flex h-14 items-center max-lg:px-5">
        {/* Mobile logo - Only show when menu is CLOSED */}
        {!isOpen && (
          <Link
            to="/"
            className="lg:hidden flex-1 cursor-pointer z-2"
            onClick={handleLogoClick}
          >
            <img src="/images/ellalogo.svg" width={900} height={300} alt="logo" />
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
            {/* Mobile Logo in Menu - Centered at top */}
            <Link
              to="/"
              className="lg:hidden flex justify-center cursor-pointer z-2"
              onClick={handleLogoClick}
            >
              {/* ONLY CHANGE: make logo larger to match Book Us Now button weight */}
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
                    <img
                      src={icon}
                      alt={title}
                      className="w-5 h-5 object-contain"
                    />
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

                {/* Center logo routes to top of Home (Desktop Only) */}
                <li className="nav-logo">
                  <Link
                    to="/"
                    className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                    onClick={handleLogoClick}
                  >
                    <img
                      src="/images/ellalogo.svg"
                      width={950}
                      height={950}
                      alt="logo"
                    />
                  </Link>
                </li>

                <li className="nav-li">
                  <NavLink title="faq" />
                  <div className="dot" />
                  <NavLink title="contact" />
                </li>
              </ul>
            </nav>

            {/* Background Decorations */}
            <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90 pointer-events-none">
              <img
                src="/images/bg-outlines.svg"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 mix-blend-soft-light opacity-5"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden z-[110] size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="toggle menu"
            className="size-1/2 object-contain"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
