import React from "react";
import "./ContactBanner.css";

function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="contact-scroll">
        <p>
          Schedule Your Consultation Today! Call:{" "}
          <a href="tel:+13134741772" className="contact-link">
            (313) 474-1772
          </a>{" "}
          or E-Mail:{" "}
          <a href="mailto:info@ellatechsolutions.org" className="contact-link">
            info@ellatechsolutions.org
          </a>{" "}
          for more information.
          <span className="spacer">    </span>
          Schedule Your Consultation Today! Call:{" "}
          <a href="tel:+13134741772" className="contact-link">
            (313) 474-1772
          </a>{" "}
          or E-Mail:{" "}
          <a href="mailto:info@ellatechsolutions.org" className="contact-link">
            info@ellatechsolutions.org
          </a>{" "}
          for more information.
          <span className="spacer">    </span>
          Schedule Your Consultation Today! Call:{" "}
          <a href="tel:+13134741772" className="contact-link">
            (313) 474-1772
          </a>{" "}
          or E-Mail:{" "}
          <a href="mailto:info@ellatechsolutions.com" className="contact-link">
            info@ellatechsolutions.org
          </a>{" "}
          for more information.
          <span className="spacer">    </span>
        </p>
      </div>
    </section>
  );
}

export default ContactBanner;
