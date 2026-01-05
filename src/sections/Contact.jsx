// src/sections/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";

const SCHEDULER_MIN_HEIGHT = 900; // desktop baseline
const SCHEDULER_MAX_HEIGHT = 1400; // prevent ridiculous tall embeds

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const Contact = () => {
  const wrapRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(SCHEDULER_MIN_HEIGHT);

  useEffect(() => {
    const compute = () => {
      // Goal: keep the scheduler fully visible without needing to scroll inside it.
      // We give it most of the viewport height, minus a little buffer.
      // Then clamp to reasonable limits so it still looks clean.

      const viewportH = window.innerHeight || 900;

      // Reserve some space so it does not slam into surrounding content
      // and still looks good on smaller screens.
      const buffer = viewportH < 820 ? 140 : 200;

      const target = viewportH - buffer;

      // If container is narrow (mobile), give a bit more height because Google embed stacks more.
      const wrapW = wrapRef.current?.getBoundingClientRect?.().width || 0;
      const mobileBoost = wrapW && wrapW < 520 ? 140 : 0;

      const next = clamp(target + mobileBoost, 760, SCHEDULER_MAX_HEIGHT);

      setIframeHeight(next);
    };

    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", compute);
      vv.addEventListener("scroll", compute);
    }

    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
      if (vv) {
        vv.removeEventListener("resize", compute);
        vv.removeEventListener("scroll", compute);
      }
    };
  }, []);

  return (
    <Element name="contact">
      <section id="contact" className="relative pt-44 pb-32 bg-s1/50">
        {/* Heading */}
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-p4 uppercase mb-4">
            Schedule Your Free 30 Minute Consultation
          </h2>
          <p className="text-lg text-p5">Pick a time that works for you and let us get started.</p>
          <p className="text-lg text-p5">
            No sales pressure. Just a clear conversation about your goals and next steps.
          </p>
        </div>

        {/* Scheduler Embed */}
        <div
          ref={wrapRef}
          className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl mb-12"
          style={{
            // Ensure the embed area does not create an inner scroll area
            // caused by parent layout quirks.
            overflow: "hidden",
          }}
        >
          <iframe
            title="Ella Tech Scheduler"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1_gltX3YcW47uNEIzcEc8XWOCjYmZy7QtvFg1kUvqkrRc16EK-bWmFpMPOkGlADXyu_NdAXpau?gv=true"
            style={{
              border: 0,
              width: "100%",
              height: `${iframeHeight}px`,
              display: "block",
            }}
            frameBorder="0"
            scrolling="no"
          />
        </div>

        {/* Contact Information Card */}
        <div className="container">
          <div className="mx-auto max-w-3xl bg-s1 border border-s2 rounded-3xl px-10 py-12 shadow-2xl text-center text-p5 mb-12">
            <h3 className="text-3xl font-bold uppercase text-p4 mb-3">Contact Us</h3>
            <p className="text-lg text-p5 mb-8 opacity-90">We reply within one business day</p>

            <div className="space-y-6">
              {/* Phone Block */}
              <a
                href="tel:13134741772"
                className="flex items-center justify-center gap-4 bg-s2/20 hover:bg-s2/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img src="/images/phone.svg" alt="Phone" className="h-6 w-6" />
                (313) 474 1772
              </a>

              {/* Email Block */}
              <a
                href="mailto:info@ellatechsolutions.com"
                className="flex items-center justify-center gap-4 bg-s2/20 hover:bg-s2/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img src="/images/email.svg" alt="Email" className="h-6 w-6" />
                info@ellatechsolutions.com
              </a>
            </div>
          </div>
        </div>

        {/* Soft divider for subtle separation before next section */}
        <div className="w-full h-4 bg-s1/30 rounded-t-3xl"></div>
      </section>
    </Element>
  );
};

export default Contact;

