import React from "react";
import { Element, Link as ScrollLink } from "react-scroll";
import { pricingServices } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

const Pricing = () => {
  return (
    <section className="py-16 bg-s2">
      <Element name="pricing">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-p3">
              Ella Tech Solutions Pricing
            </h1>
            <p className="text-p4 mt-2">
              Simple, transparent rates for small businesses and nonprofits. For
              larger or more complex projects—multi-site rollouts, custom
              integrations, LMS builds, etc.—we’ll create a custom plan
              together.
            </p>
          </div>

          {/* Service Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pricingServices.map(
              ({ id, title, price, description, details }) => (
                <div key={id} className="bg-s1 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-p3 mb-2">
                    {title}
                  </h3>
                  {price && <p className="text-p4 font-medium mb-2">{price}</p>}
                  <p className="text-p4 mb-4">{description}</p>
                  {details && (
                    <ul className="list-disc list-inside text-p4 space-y-1">
                      {details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
            )}
          </div>

          {/* Consultation CTA */}
          <div className="text-center mb-4">
            <ScrollLink to="contact" smooth={true} duration={500}>
              <Button>Schedule consultation now</Button>
            </ScrollLink>
          </div>

          {/* Custom Services Note */}
          <p className="text-center text-p4">
            For custom services or complex projects, let’s chat about your needs
            and create the right plan for you.
          </p>
        </div>
      </Element>
    </section>
  );
};

export default Pricing;
