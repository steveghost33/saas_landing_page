// src/sections/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Give the embed enough room to show the full Google UI (times list + footer)
// without clipping. Most cut off issues happen because height is too small.
const MIN_EMBED_HEIGHT_DESKTOP = 1100;
const MIN_EMBED_HEIGHT_MOBILE = 1250;
const MAX_EMBED_HEIGHT = 1800;

const Contact = () => {
  const wrapRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(MIN_EMBED_HEIGHT_DESKTOP);

  useEffect(() => {
    const compute = () => {
      const viewportH = window.innerHeight || 900;
      const wrapW = wrapRef.current?.getBoundingClientRect?.().width || 0;
      const isMobile = wrapW > 0 && wrapW < 560;

      // Google appointment embeds often need more vertical space on mobile
      // because the layout stacks more and the time list area shrinks.
      const minHeight = isMobile ? MIN_EMBED_HEIGHT_MOBILE : MIN_EMBED_HEIGHT_DESKTOP;

      // We want the scheduler to be tall enough to show the time list,
      // and we accept that the page can scroll (that is fine).
      // The key is: do not clip inside the iframe.
      //
      // Target height strategy:
      // - Use a generous viewport-based height (so it scales on large screens)
      // - But never go below a safe minimum that prevents the time list clipping.
      const target = Math.round(viewportH * 1.35);

      setIframeHeight(clamp(Math.max(target, minHeight), minHeight, MAX_EMBED_HEIGHT));
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
            // Key: allow the iframe to fully render with no clipping.
            // Do not hide overflow here or Google UI can look cut off.
            overflow: "visible",
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
            // Important: do not force scrolling="no" here.
            // Some browsers treat that as permission to clip embedded content.
            scrolling="yes"
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


