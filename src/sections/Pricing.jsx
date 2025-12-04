import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { pricingServices } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

function Pricing() {
  const [expandedIds, setExpandedIds] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpand = (id) =>
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <Element name="pricing">
      <section id="pricing" className="py-16 bg-s1">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-sm md:text-base text-p3 font-medium tracking-wide">
              Simple, transparent rates for small businesses and nonprofits.
            </div>
            <h1 className="mt-2 font-bold text-p4 uppercase text-4xl md:text-5xl">
              Ella Tech Solutions Pricing
            </h1>
          </div>

          {/* Cards container */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 max-w-6xl mx-auto">
            {pricingServices.map(({ id, title, price, description, details }) => {
              const isExpanded = expandedIds.includes(id);
              const desktopHeightClass = isExpanded
                ? "md:min-h-[550px]"
                : "md:min-h-[430px]";

              return (
                <div
                  key={id}
                  className="relative w-full md:flex-1 overflow-hidden rounded-[2rem] shadow-2xl bg-gradient-to-br from-s2 to-s1"
                >
                  <div className="absolute inset-0 z-0 rounded-[2rem] border border-white/15 pointer-events-none" />
                  <div className="absolute inset-0 z-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

                  {/* Card body */}
                  <div
                    className={`
                      relative z-10 p-6 flex flex-col transition-all duration-300 ease-in-out
                      ${desktopHeightClass}
                    `}
                  >
                    <h3 className="text-p4 uppercase font-bold text-xl mb-2 tracking-wide">
                      {title}
                    </h3>

                    {price && (
                      <p className="text-p3 font-medium mb-2">{price}</p>
                    )}

                    {/* Description always visible, details depend on device */}
                    <div className="mt-1 flex-1 pr-1">
                      <p className="text-p5">{description}</p>

                      {(isMobile || isExpanded) && details && (
                        <ul className="mt-2 list-disc list-inside text-p5 space-y-1">
                          {details.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Button only on desktop */}
                    {details && !isMobile && (
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <button
                          onClick={() => toggleExpand(id)}
                          className="text-p3 font-medium hover:underline transition"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      </div>
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
