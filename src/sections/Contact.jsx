// src/sections/Contact.jsx
import { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "../data/site.js";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

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

      const target = Math.round(viewportH * 0.92);

      if (isMobile) setIframeHeight(clamp(target, MIN_MOBILE, MAX_MOBILE));
      else setIframeHeight(clamp(target, MIN_DESKTOP, MAX_DESKTOP));
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
      <section
        id="contact"
        className="relative bg-s1/50 scroll-mt-[140px] pt-20 pb-20"
      >
        <div className="container mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-p4 uppercase mb-4">
            Schedule Your Free 30 Minute Consultation
          </h2>
          <p className="text-lg text-p5">Pick a time that works for you and let us get started.</p>
          <p className="text-lg text-p5">
            No sales pressure. Just a clear conversation about your goals and next steps.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl mb-10"
          style={{ overflow: "hidden" }}
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

        <div className="container">
          <div className="mx-auto max-w-3xl bg-s1 border border-s2 rounded-3xl px-10 py-10 shadow-2xl text-center text-p5">
            <h3 className="text-3xl font-bold uppercase text-p4 mb-3">Contact Us</h3>
            <p className="text-lg text-p5 mb-8 opacity-90">We reply within one business day</p>

            <div className="space-y-6">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center justify-center gap-4 bg-s2/20 hover:bg-s2/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img src="/images/phone.svg" alt="" aria-hidden="true" className="h-6 w-6" />
                {CONTACT_PHONE}
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center justify-center gap-4 bg-s2/20 hover:bg-s2/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img src="/images/email.svg" alt="" aria-hidden="true" className="h-6 w-6" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-4 bg-s1/30 rounded-t-3xl mt-14" />
      </section>
    </Element>
  );
};

export default Contact;
