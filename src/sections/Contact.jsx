import { Element } from "react-scroll";
import CalInlineEmbed from "../components/CalInlineEmbed.jsx";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "../data/site.js";

const Contact = () => {
  return (
    <Element name="contact">
      <section
        id="contact"
        className="relative scroll-mt-[140px] pt-12 pb-12"
      >
        <div className="container mx-auto text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-p4 uppercase mb-4">
            Schedule Your Free 30 Minute Consultation
          </h2>
          <p className="text-lg text-p5">Pick a time that works for you and let us get started.</p>
          <p className="text-lg text-p5">
            No sales pressure. Just a clear conversation about your goals and next steps.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-6 overflow-hidden">
          <CalInlineEmbed className="min-h-[720px] w-full" />
        </div>

        <div className="container">
          <div className="mx-auto max-w-3xl bg-s2/60 border border-s3/50 rounded-3xl px-8 py-8 shadow-2xl text-center text-p5">
            <h3 className="text-3xl font-bold uppercase text-p4 mb-3">Contact Us</h3>
            <p className="text-lg text-p5 mb-6 opacity-90">We reply within one business day</p>

            <div className="space-y-4">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center justify-center gap-4 bg-s3/20 hover:bg-s3/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img src="/images/phone.svg" alt="" aria-hidden="true" className="h-6 w-6" />
                {CONTACT_PHONE}
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center justify-center gap-4 bg-s3/20 hover:bg-s3/40 transition rounded-xl p-4 text-lg font-medium"
              >
                <img src="/images/email.svg" alt="" aria-hidden="true" className="h-6 w-6" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
