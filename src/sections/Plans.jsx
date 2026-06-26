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
    <Element name="services">
      <section id="services" className="py-16 bg-s1">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-sm md:text-base text-p3 font-medium tracking-wide">
              How it works
            </div>
            <h2 className="mt-2 font-bold text-p4 uppercase text-4xl md:text-5xl">
              Three Ways to Get Found
            </h2>
            <p className="mt-4 text-p5 max-w-2xl mx-auto body-1">
              Every tier includes a monthly care plan that scales with how much ground you want to cover. Pick the level that matches how fast you want to be the obvious local choice.
            </p>
          </div>

          {/* Cards, 3-column grid on large screens, 2-column on medium, 1-column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-6xl mx-auto">
            {plans.map(({ id, title, price, monthly, description, details }) => {
              const isExpanded = expandedIds.includes(id);

              return (
                <div
                  key={id}
                  className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl bg-gradient-to-br from-s2 to-s1"
                >
                  <div className="absolute inset-0 z-0 rounded-[2rem] border border-white/15 pointer-events-none" />
                  <div className="absolute inset-0 z-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

                  <div className="relative z-10 p-6 flex flex-col min-h-[300px] transition-all duration-300 ease-in-out">
                    <h3 className="text-p4 uppercase font-bold text-xl mb-1 tracking-wide">
                      {title}
                    </h3>
                    <p className="text-p3 font-semibold text-sm mb-3">
                      {price} <span className="text-p5/70 font-normal">{monthly}</span>
                    </p>

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

          <p className="text-center text-p4 font-semibold mb-4">
            The guarantee: if your site and Google Business Profile aren&rsquo;t live within 2 weeks of you providing content, you get a free month of monitoring.
          </p>

          {/* Bottom services CTA */}
          <div className="text-center mb-4">
            <Button href="https://cal.com/ella-tech-7ze7wk" containerClassName="inline-block mx-auto">
              See How It Works
            </Button>
          </div>

          <p className="text-center text-p5 mt-4">
            Not sure which tier fits? We will figure it out together on the call.
          </p>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-20 bg-s2">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-bold text-p4 uppercase text-3xl md:text-4xl mb-4">
            Not sure where to start? That is exactly why we are here.
          </h2>
          <p className="text-p5 body-1 mb-10">
            Book a free 30-minute call and we will tell you which tier fits your business. No pitch, no pressure.
          </p>
          <Button href="https://cal.com/ella-tech-7ze7wk" containerClassName="inline-block mx-auto">
            Get Found Locally
          </Button>
        </div>
      </section>
    </Element>
  );
}

export default Plans;
