// src/sections/Pricing.jsx

import React from "react";
import { Element } from "react-scroll";
import { pricingServices } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

function Pricing() {
  return (
      <Element name="pricing">
        <section id="pricing" className="py-16 bg-s2">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-p3">
                Ella Tech Solutions Pricing
              </h1>
              <p className="text-p4 mt-2">
                Simple, transparent rates for small businesses and nonprofits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pricingServices.map(({ id, title, price, description, details }) => (
                  <div key={id} className="bg-s1 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-p3 mb-2">
                      {title}
                    </h3>
                    {price && (
                        <p className="text-p4 font-medium mb-2">{price}</p>
                    )}
                    <p className="text-p4 mb-4">{description}</p>
                    {details && (
                        <ul className="list-disc list-inside text-p4 space-y-1">
                          {details.map((item, i) => (
                              <li key={i}>{item}</li>
                          ))}
                        </ul>
                    )}
                  </div>
              ))}
            </div>

            <div className="text-center mb-4">
              <Button
                  href="/#contact"
                  containerClassName="inline-block mx-auto"
              >
                Schedule Consultation Now
              </Button>
            </div>

            <p className="text-center text-p4">
              For custom or complex projects, let’s chat about your needs.
            </p>
          </div>
        </section>
      </Element>
  );
}

export default Pricing;