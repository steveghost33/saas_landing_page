import { socials } from "../constants/index.jsx";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "../data/site.js";

const Footer = () => {
  return (
    <footer>
      {/* Secondary CTA row */}
      <div className="border-t border-s3/40 bg-s2/30">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-p4 font-semibold text-lg mb-1">Ready to talk? Book a free tech audit.</p>
            <p className="text-p5 text-sm opacity-70">30 minutes. No pitch. Just clarity on what your org needs.</p>
          </div>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-p1 text-s1 px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Book your free audit
          </a>
        </div>
      </div>

      {/* Audience nav row */}
      <div className="border-t border-s3/20">
        <div className="container py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="/services/small-business" className="text-p5 text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">Small Business Tech</a>
          <span className="opacity-20 text-p5 hidden sm:block">|</span>
          <a href="/services/nonprofits" className="text-p5 text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">Nonprofit Tech</a>
          <span className="opacity-20 text-p5 hidden sm:block">|</span>
          <a href="/services/entrepreneurs" className="text-p5 text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">Entrepreneur Tech</a>
          <span className="opacity-20 text-p5 hidden sm:block">|</span>
          <a href="/web-projects" className="text-p5 text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">Web Projects</a>
          <span className="opacity-20 text-p5 hidden sm:block">|</span>
          <a href="/tech-solutions" className="text-p5 text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">Tech Solutions</a>
          <span className="opacity-20 text-p5 hidden sm:block">|</span>
          <a href="/blog" className="text-p5 text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">Blog</a>
        </div>
      </div>

      {/* Contact info row */}
      <div className="border-t border-s3/30">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="text-p5 text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            {CONTACT_PHONE}
          </a>
          <span className="opacity-30 text-p5 hidden sm:block">|</span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-p5 text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-s3/20">
        <div className="container py-6 lg:pb-6 pb-24">
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-4">
            {/* Copyright */}
            <div className="small-compact flex flex-col items-center justify-center lg:flex-1 lg:items-start gap-1">
              <p className="opacity-70">Copyright, ELLA TECH SOLUTIONS LLC</p>
              <p className="opacity-40 text-p5 text-xs">Last updated: May 20, 2026</p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="/legal"
                className="whitespace-nowrap text-p5 transition-all duration-500 hover:text-p1 cursor-pointer"
              >
                Privacy Policy
              </a>
              <span className="text-p5 opacity-50">•</span>
              <a
                href="/terms-of-use"
                className="whitespace-nowrap text-p5 transition-all duration-500 hover:text-p1 cursor-pointer"
              >
                Terms of Use
              </a>
            </div>

            {/* Location and Socials */}
            <div className="flex items-center justify-center gap-4 lg:flex-1 lg:justify-end">
              <p className="opacity-70 text-p5 text-sm flex items-center gap-1 whitespace-nowrap">
                📍 Detroit, MI
              </p>
              <span className="opacity-30 text-p5">|</span>
              <ul className="flex gap-3">
                {socials.map(({ id, url, icon, title }) => (
                  <li key={id}>
                    <a href={url} className="social-icon">
                      <img
                        src={icon}
                        alt={title}
                        className="size-1/3 object-contain"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
