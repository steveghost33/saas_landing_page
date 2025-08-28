import React, { useState } from "react";
import { Element } from "react-scroll";
import { pricingServices } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

function Pricing() {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) =>
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <Element name="pricing">
      {/* Match site dark navy */}
      <section id="pricing" className="py-16 bg-s1">
        <div className="container mx-auto px-4">
          {/* Header: small green line above big white title */}
          <div className="text-center mb-12">
            <div className="text-sm md:text-base text-p3 font-medium tracking-wide">
              Simple, transparent rates for small businesses and nonprofits.
            </div>
            <h1 className="mt-2 font-bold text-p4 uppercase text-4xl md:text-5xl">
              Ella Tech Solutions Pricing
            </h1>
          </div>

          {/* Cards — 1 col on mobile, 2x2 squares from sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 max-w-5xl mx-auto">
            {pricingServices.map(({ id, title, price, description, details }) => {
              const isExpanded = expandedIds.includes(id);
              return (
                <div
                  key={id}
                  // Lighter card bg + Hero-like border + big radius + strong shadow
                  // Squares only at sm+, stack naturally on mobile
                  className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-gradient-to-br from-s2 to-s1 sm:aspect-square"
                >
                  {/* Border lines to match Hero */}
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-[2rem] border border-white/15" />
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

                  {/* Card content */}
                  <div className="relative z-10 h-full p-6 flex flex-col">
                    <h3 className="text-p4 uppercase font-bold text-xl mb-2 tracking-wide">
                      {title}
                    </h3>

                    {price && (
                      <p className="text-p3 font-medium mb-2">{price}</p>
                    )}

                    {/* Description: don’t repeat; clamp when collapsed */}
                    <div className="mt-1 flex-1 overflow-y-auto pr-1">
                      <p className={`text-p5 ${isExpanded ? "" : "line-clamp-3"}`}>
                        {description}
                      </p>

                      {/* Only show details when expanded */}
                      {isExpanded && details && (
                        <ul className="mt-2 list-disc list-inside text-p5 space-y-1">
                          {details.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Toggle */}
                    {details && (
                      <button
                        onClick={() => toggleExpand(id)}
                        aria-expanded={isExpanded}
                        aria-controls={`card-details-${id}`}
                        className="mt-3 text-p3 font-medium hover:underline transition"
                      >
                        {isExpanded ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mb-4">
            <Button href="/#contact" containerClassName="inline-block mx-auto">
              Schedule Consultation Now
            </Button>
          </div>

          <p className="text-center text-p5">
            For custom or complex projects, let’s chat about your needs.
          </p>
        </div>
      </section>
    </Element>
  );
}

export default Pricing;

