import { Element as ScrollElement, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <ScrollElement name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Empower Your Mission
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Innovation Made Effortless
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Ella Tech Solutions helps streamline your work with custom
              websites, intelligent automations, and intuitive digital tools—so
              small businesses, nonprofits, and schools can focus on their
              mission, not the tech.
            </p>
            <LinkScroll to="features" offset={-100} spy smooth>
              <Button icon="/images/zap.svg"> Try it now </Button>
            </LinkScroll>
          </div>
        </div>
      </ScrollElement>
    </section>
  );
};

export default Hero;
