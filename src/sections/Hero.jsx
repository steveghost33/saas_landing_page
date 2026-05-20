import { Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-40 max-lg:pt-14 max-lg:pb-36 max-md:pt-6 max-md:pb-32 overflow-x-hidden">
      <div className="container relative z-2 flex flex-col lg:flex-row items-start lg:items-center">
        {/* Text */}
        <div className="relative z-10 lg:w-1/2 max-w-512 max-lg:max-w-388 w-full">
          <div className="mb-3 text-[13px] font-semibold tracking-[0.15em] uppercase text-p3/70">
            Detroit-Based. Serving Clients Nationwide.
          </div>
          <h1 className="mb-6 h1 text-p4 max-lg:mb-7 max-lg:text-5xl max-lg:leading-tight max-md:mb-4 max-md:text-4xl max-md:leading-tight max-sm:text-3xl">
            Ella Tech Solutions: Technology Consulting for Nonprofits and Small Businesses
          </h1>
          <p className="max-w-440 mb-6 body-1 max-md:mb-6 max-md:text-base max-md:leading-relaxed text-p5">
            Ella Tech Solutions is a Detroit-based technology consulting firm that helps nonprofits and small businesses with website creation, CRM setup, AI workflow integration, staff technology training, LMS development, and Microsoft 365 implementation. Founded by Steven Bowman, the firm serves organizations nationwide.
          </p>
          <p className="max-w-440 mb-14 body-2 max-md:mb-10 max-md:text-sm max-md:leading-relaxed text-p5/80">
            We serve as a fractional CTO and strategic technology partner. You get senior-level technology leadership without the cost of a full-time hire.
          </p>
          <LinkScroll to="contact" offset={-100} spy smooth>
            <Button icon="/images/zap.svg">Book a free 30-minute tech audit</Button>
          </LinkScroll>
        </div>

        {/* Hero Image */}
        <div className="mt-8 lg:mt-0 lg:absolute lg:top-[20vh] lg:right-0 lg:w-[70%] lg:max-w-[920px] pointer-events-none z-0 w-full">
          <div className="relative overflow-hidden rounded-[2rem] max-md:rounded-2xl shadow-2xl max-lg:aspect-video max-md:aspect-[4/3]">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-s1 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-s1 to-transparent pointer-events-none z-10 lg:hidden" />
            <img
              src="/images/main-photo.jpg"
              alt="Ella Tech Solutions — technology consulting for nonprofits and small businesses in Detroit"
              width="920"
              height="614"
              fetchpriority="high"
              className="w-full h-full object-cover object-top block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
