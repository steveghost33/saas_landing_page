import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { BOOKING_PATH } from "../data/site.js";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-40 max-lg:pt-14 max-lg:pb-36 max-md:pt-6 max-md:pb-32">
      <Element name="hero">
        <div className="container relative z-2 flex flex-col lg:flex-row items-start lg:items-center">
          {/* Text */}
          <div className="relative z-10 lg:w-1/2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Detroit Rooted. Mission Driven.
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Technology That Actually Gets Used
            </h1>
            <p className="max-w-440 mb-3 body-1 text-p3 font-medium">
              Based in Detroit. Built for organizations that mean business.
            </p>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10 text-p5">
              Most organizations already have the tools. What they are missing is a strategy that makes those tools actually work. Ella Tech brings 15 years of hands-on experience so you get implementation that sticks — not software that collects dust.
            </p>
            <Button icon="/images/zap.svg" href={BOOKING_PATH} target="_blank">
              Book a Consultation
            </Button>
          </div>

          {/* Hero Image */}
          <div className="mt-8 lg:mt-0 lg:absolute lg:top-[20vh] lg:right-0 lg:w-[70%] lg:max-w-[920px] pointer-events-none z-0">
            <div className="relative overflow-hidden rounded-[2rem] max-md:rounded-2xl shadow-2xl max-md:aspect-[4/3]">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-s1 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-s1 to-transparent pointer-events-none z-10 lg:hidden" />
              <img
                src="/images/main-photo.jpg"
                alt="Ella Tech Solutions team working with clients"
                className="w-full h-auto max-md:h-full object-cover max-md:object-top block"
              />
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
