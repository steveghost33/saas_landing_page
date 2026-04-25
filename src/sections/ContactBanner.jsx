import "./ContactBanner.css";
import { BOOKING_PATH, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "../data/site.js";

const bannerItems = Array.from({ length: 3 }, (_, index) => index);

function ContactBanner() {
  return (
    <section className="contact-banner" aria-label="Consultation banner">
      <div className="contact-scroll">
        <p>
          {bannerItems.map((item) => (
            <span key={item}>
              <a href={BOOKING_PATH} className="banner-cta">
                Schedule your free 30 minute consultation
              </a>
              <span className="banner-sub">
                Prefer to call or email?{" "}
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="contact-link">
                  {CONTACT_PHONE}
                </a>{" "}
                or{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">
                  {CONTACT_EMAIL}
                </a>
              </span>

              <span className="spacer" aria-hidden="true" />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default ContactBanner;
