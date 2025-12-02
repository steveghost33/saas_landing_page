// src/sections/Header.jsx

import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ title }) => (
      <a
          href={`/#${title}`}
          onClick={() => setIsOpen(false)}
          className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
      >
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </a>
  );

  return (
      <header
          className={clsx(
              "w-full py-10 transition-all duration-500 max-lg:py-4",
              hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px]"
          )}
      >
        <div className="container flex h-14 items-center max-lg:px-5">
          {/* Logo scrolls to top/hero */}
          <ScrollLink
              to="hero"
              offset={-250}
              spy
              smooth
              className="lg:hidden flex-1 cursor-pointer z-2"
              onClick={() => setIsOpen(false)}
          >
            <img src="/images/ellalogo.svg" width={900} height={300} alt="logo" />
          </ScrollLink>

          <div
              className={clsx(
                  "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
                  isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
              )}
          >
            <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
              <nav className="max-lg:relative max-lg:z-2 max-lg:my-auto">
                <ul className="flex max-lg:block max-lg:px-12">
                  <li className="nav-li">
                    <NavLink title="services" />
                    <div className="dot" />
                    <NavLink title="pricing" />
                  </li>

                  <li className="nav-logo">
                    <ScrollLink
                        to="hero"
                        offset={-250}
                        spy
                        smooth
                        className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                      <img
                          src="/images/ellalogo.svg"
                          width={950}
                          height={950}
                          alt="logo"
                      />
                    </ScrollLink>
                  </li>

                  <li className="nav-li">
                    <NavLink title="faq" />
                    <div className="dot" />
                    <NavLink title="contact" />
                  </li>
                </ul>
              </nav>

              <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90">
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

          <button
              className="lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
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