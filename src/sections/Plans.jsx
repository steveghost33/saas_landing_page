import { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { plans } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

function Plans() {
  const [expandedIds, setExpandedIds] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
    <Element name="plans">
      <section id="plans" className="py-16 bg-s1">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-sm md:text-base text-p3 font-medium tracking-wide">
              Every engagement is scoped to your organization and your needs.
            </div>
            <h2 className="mt-2 font-bold text-p4 uppercase text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="mt-4 text-p5 max-w-2xl mx-auto body-1">
              Every engagement is scoped to your needs. Mission-driven pricing available.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 max-w-6xl mx-auto">
            {plans.map(({ id, title, description, details }) => {
              const isExpanded = expandedIds.includes(id);
              const desktopHeightClass = isExpanded
                ? "md:min-h-[580px]"
                : "md:min-h-[460px]";

              return (
                <div
                  key={id}
                  className="relative w-full md:flex-1 overflow-hidden rounded-[2rem] shadow-2xl bg-gradient-to-br from-s2 to-s1"
                >
                  <div className="absolute inset-0 z-0 rounded-[2rem] border border-white/15 pointer-events-none" />
                  <div className="absolute inset-0 z-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

                  <div
                    className={`
                      relative z-10 p-6 flex flex-col transition-all duration-300 ease-in-out
                      ${desktopHeightClass}
                    `}
                  >
                    <h3 className="text-p4 uppercase font-bold text-xl mb-3 tracking-wide">
                      {title}
                    </h3>

                    <div className="mt-1 flex-1 pr-1">
                      <p className="text-p5">{description}</p>

                      {(isMobile || isExpanded) && details && (
                        <ul id={`plan-details-${id}`} className="mt-4 list-disc list-inside text-p5 space-y-1">
                          {details.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {!isMobile && details && (
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <button
                          onClick={() => toggleExpand(id)}
                          className="text-p3 font-medium hover:underline transition"
                          aria-expanded={isExpanded}
                          aria-controls={`plan-details-${id}`}
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
              Schedule a Consultation
            </Button>
          </div>

          <p className="text-center text-p5 mt-4">
            Not sure which service fits your needs? We will figure it out together.
          </p>
        </div>
      </section>
    </Element>
  );
}

export default Plans;
