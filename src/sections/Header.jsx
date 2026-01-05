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
    document.body.style.overflow = isOpen ? "hidden" : "unset";
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
      {/* Top Bar - Desktop Only */}
      <div className="container flex justify-between items-center mb-4 max-lg:hidden">
        {/* Desktop Book Us Now Button - LARGER */}
        <a
          href="/#contact"
          className="
            flex items-center gap-3
            px-6 py-3
            text-sm font-semibold uppercase
            text-p1
            border border-p1/40
            rounded-full
            hover:bg-p1/15
            transition-all duration-300
          "
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
        {/* Mobile logo */}
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
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-screen max-lg:bg-s2 max-lg:opacity-0 max-lg:z-[100]",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
          )}
        >
          <div className="max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:pt-20">
            {/* Mobile Logo */}
            <Link
              to="/"
              className="lg:hidden flex justify-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src="/images/ellalogo.svg"
                alt="logo"
                className="w-[320px] max-w-[88vw] h-auto"
              />
            </Link>

            {/* Mobile Socials */}
            <ul className="lg:hidden flex justify-center gap-4 mt-10">
              {socials.map(({ id, url, icon, title }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-s3 hover:bg-s4 transition-all"
                  >
                    <img src={icon} alt={title} className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Book Button - UNCHANGED */}
            <div className="lg:hidden flex justify-center mt-8 mb-10">
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase text-p1 border border-p1/30 rounded-full hover:bg-p1/10 transition-all"
              >
                <img src="/images/zap.svg" alt="zap" className="w-5 h-5" />
                Book Us Now
              </a>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex items-center justify-center">
              <ul className="flex flex-col items-center gap-8">
                <NavLink title="services" />
                <NavLink title="plans" />
                <NavLink title="faq" />
                <NavLink title="contact" />
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-[110] size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="toggle menu"
            className="size-1/2"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
