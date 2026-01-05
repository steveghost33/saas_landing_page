// src/sections/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Balanced heights that prevent cut off while avoiding huge blank space
const MIN_DESKTOP = 960;
const MAX_DESKTOP = 1120;

const MIN_MOBILE = 1120;
const MAX_MOBILE = 1380;

const Contact = () => {
  const wrapRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(MIN_DESKTOP);

  useEffect(() => {
    const compute = () => {
      const viewportH = window.innerHeight || 900;
      const wrapW = wrapRef.current?.getBoundingClientRect?.().width || 0;
      const isMobile = wrapW > 0 && wrapW < 560;

      // Use most of the viewport height, but do not overshoot.
      // This avoids the massive blank space at the bottom.
      const target = Math.round(viewportH * 0.92);

      if (isMobile) {
        setIframeHeight(clamp(target, MIN_MOBILE, MAX_MOBILE));
      } else {
        setIframeHeight(clamp(target, MIN_DESKTOP, MAX_DESKTOP));
      }
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
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl mb-12"
          style={{
            overflow: "hidden", // keeps the rounded corners clean
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
              background: "transparent",
            }}
            frameBorder="0"
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

        {/* Soft divider */}
        <div className="w-full h-4 bg-s1/30 rounded-t-3xl"></div>
      </section>
    </Element>
  );
};

export default Contact;


