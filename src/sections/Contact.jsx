// src/sections/Contact.jsx
import React from "react";
import { Element } from "react-scroll";

const Contact = () => {
  return (
    <Element name="contact">
      <section
        id="contact"
        className="relative pt-60 pb-40 bg-s1/50"
      >
        <div className="container mx-auto text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-p4 uppercase mb-4">
            Schedule Your Free 30 Minute Consultation
          </h2>
          <p className="text-lg text-p5">
            Pick a time that works for you and let us get started.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg mb-16">
          <iframe
            title="Ella Tech Scheduler"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1_gltX3YcW47uNEIzcEc8XWOCjYmZy7QtvFg1kUvqkrRc16EK-bWmFpMPOkGlADXyu_NdAXpau?gv=true"
            style={{ border: 0, width: "100%", height: "900px" }}
            frameBorder="0"
          />
        </div>

        {/* Contact Info on blue background */}
        <div className="text-center text-p5 mb-20">
          <h3 className="text-3xl font-bold uppercase mb-6 text-p4">
            Contact Us
          </h3>
          <p className="text-lg">Ella Tech Solutions</p>

          <a
            href="tel:13134741772"
            className="block text-lg font-medium hover:underline mt-2"
          >
            Phone: (313) 474 1772
          </a>

          <a
            href="mailto:info@ellatechsolutions.org"
            className="block text-lg font-medium hover:underline mt-1"
          >
            Email: info@ellatechsolutions.org
          </a>
        </div>

        {/* Soft divider for visual spacing before next section */}
        <div className="w-full h-8 bg-s1/30 rounded-t-3xl"></div>
      </section>
    </Element>
  );
};

export default Contact;