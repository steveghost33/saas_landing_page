import { socials } from "../constants/index.jsx";

const Footer = () => {
  return (
    <footer>
      <div className="container py-10 lg:pb-10 pb-24">
        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-4">
          {/* Copyright */}
          <div className="small-compact flex items-center justify-center lg:flex-1 lg:justify-start">
            <p className="opacity-70">Copyright, ELLA TECH SOLUTIONS LLC</p>
          </div>

          {/* Legal Links - use whitespace-nowrap to prevent breaking */}
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

          {/* Location & Socials */}
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
    </footer>
  );
};

export default Footer;