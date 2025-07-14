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
            Schedule Your Free 30-Minute Consultation
          </h2>
          <p className="text-lg text-p5">
            Pick a time that works for you and let’s get started.
          </p>
        </div>

        {/* only this div is white */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Ella Tech Scheduler"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1_gltX3YcW47uNEIzcEc8XWOCjYmZy7QtvFg1kUvqkrRc16EK-bWmFpMPOkGlADXyu_NdAXpau?gv=true"
            style={{ border: 0, width: "100%", height: "900px" }}
            frameBorder="0"
          />
        </div>
      </section>
    </Element>
  );
};

export default Contact;
