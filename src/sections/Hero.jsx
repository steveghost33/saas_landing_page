// src/sections/Hero.jsx

import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container relative z-2 flex flex-col lg:flex-row items-start lg:items-center">

          {/* Text (z-index above image) */}
          <div className="relative z-10 lg:w-1/2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Empower Your Mission
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Innovation Made Effortless
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10 text-p5">
              Ella Tech Solutions enables companies to streamline their work
              with custom websites, intelligent automations, and intuitive
              digital tools—so small businesses, nonprofits, and schools can
              focus on their mission, not the tech.
            </p>
            <LinkScroll to="contact" offset={-100} spy smooth>
              <Button icon="/images/zap.svg">Book Us Now</Button>
            </LinkScroll>
          </div>

          {/* Hero Image (larger, behind text) */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:top-[20vh] lg:right-0 lg:w-[70%] lg:max-w-[920px] pointer-events-none z-0">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              {/* Left fade overlay */}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-s1 to-transparent pointer-events-none z-10" />
              <img
                src="/images/main-photo.jpg"
                alt="main"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
          
        </div>
      </Element>
    </section>
  );
};

export default Hero;