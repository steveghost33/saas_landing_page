// src/sections/Contact.jsx
import React from "react";
import { Element } from "react-scroll";

const Contact = () => {
  return (
    <Element name="contact">
      <section
        id="contact"
        className="relative pt-44 pb-32 bg-s1/50"
      >
        {/* Heading */}
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-p4 uppercase mb-4">
            Schedule Your Free 30 Minute Consultation
          </h2>
          <p className="text-lg text-p5">
            Pick a time that works for you and let us get started.
          </p>
          <p className="text-lg text-p5">
            No sales pressure. Just a clear conversation about your goals and next steps.
          </p>
        </div>

        {/* Scheduler Embed */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl mb-12">
          <iframe
            title="Ella Tech Scheduler"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1_gltX3YcW47uNEIzcEc8XWOCjYmZy7QtvFg1kUvqkrRc16EK-bWmFpMPOkGlADXyu_NdAXpau?gv=true"
            style={{ border: 0, width: "100%", height: "850px" }}
            frameBorder="0"
          />
        </div>

        {/* Contact Information Card */}
        <div className="container">
          <div className="mx-auto max-w-3xl bg-s1 border border-s2 rounded-3xl px-10 py-12 shadow-2xl text-center text-p5 mb-12">
            <h3 className="text-3xl font-bold uppercase text-p4 mb-3">
              Contact Us
            </h3>
            <p className="text-lg text-p5 mb-8 opacity-90">
              We reply within one business day
            </p>

            <div className="space-y-6">
              {/* Phone Block */}
              <a
                href="tel:13134741772"
                className="flex items-center justify-center gap-4 bg-s2/20 hover:bg-s2/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img
                  src="/images/phone.svg"
                  alt="Phone"
                  className="h-6 w-6"
                />
                (313) 474 1772
              </a>

              {/* Email Block */}
              <a
                href="mailto:info@ellatechsolutions.org"
                className="flex items-center justify-center gap-4 bg-s2/20 hover:bg-s2/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img
                  src="/images/email.svg"
                  alt="Email"
                  className="h-6 w-6"
                />
                info@ellatechsolutions.org
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
