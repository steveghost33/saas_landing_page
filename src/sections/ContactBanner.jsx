import React from "react";
import "./ContactBanner.css";

function ContactBanner() {
  return (
    <section className="contact-banner" aria-label="Consultation banner">
      <div className="contact-scroll">
        <p>
          <a href="/#contact" className="banner-cta">
            Schedule your free 30 minute consultation
          </a>
          <span className="banner-sub">
            Prefer to call or email?{" "}
            <a href="tel:+13134741772" className="contact-link">
              (313) 474-1772
            </a>{" "}
            or{" "}
            <a href="mailto:info@ellatechsolutions.com" className="contact-link">
              info@ellatechsolutions.com
            </a>
            .
          </span>

          <span className="spacer">    </span>

          <a href="/#contact" className="banner-cta">
            Schedule your free 30 minute consultation
          </a>
          <span className="banner-sub">
            Prefer to call or email?{" "}
            <a href="tel:+13134741772" className="contact-link">
              (313) 474-1772
            </a>{" "}
            or{" "}
            <a href="mailto:info@ellatechsolutions.com" className="contact-link">
              info@ellatechsolutions.com
            </a>
            .
          </span>

          <span className="spacer">    </span>

          <a href="/#contact" className="banner-cta">
            Schedule your free 30 minute consultation
          </a>
          <span className="banner-sub">
            Prefer to call or email?{" "}
            <a href="tel:+13134741772" className="contact-link">
              (313) 474-1772
            </a>{" "}
            or{" "}
            <a href="mailto:info@ellatechsolutions.com" className="contact-link">
              info@ellatechsolutions.com
            </a>
            .
          </span>

          <span className="spacer">    </span>
        </p>
      </div>
    </section>
  );
}

export default ContactBanner;
