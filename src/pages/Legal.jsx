import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";

function Legal() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-s1">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      <main className="overflow-hidden pt-[160px] md:pt-[180px]">
        <section className="relative py-16 max-md:py-12 font-poppins text-p5">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="h1 text-p4 mb-4">Privacy Policy</h1>
              <p className="body-2 text-p5 opacity-70">Effective December 2025</p>
            </div>

            <div className="mb-12">
              <h2 className="h4 text-p4 mb-4">Introduction</h2>
              <p className="body-1 text-p5 leading-relaxed">
                Ella Tech Solutions LLC respects your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have.
              </p>
            </div>

            <div className="mb-12 p-8 bg-s2 rounded-2xl">
              <h2 className="h4 text-p4 mb-4">Who We Are</h2>
              <p className="font-semibold text-p3">Ella Tech Solutions LLC</p>
              <p className="text-p5">Technology consulting, web development, digital training and automation services</p>
              <p className="text-p5">Based in Detroit, Michigan</p>
              <p className="text-p5">
                Contact: <a href="mailto:info@ellatechsolutions.com" className="text-p1 hover:text-p3">info@ellatechsolutions.com</a>
              </p>
            </div>

            <div className="mb-12">
              <h2 className="h4 text-p4 mb-4">Information We Collect</h2>
              <p className="body-1 text-p5 leading-relaxed mb-4">We collect information in three ways:</p>
              <ul className="space-y-2 ml-6">
                <li className="text-p5 flex items-start gap-3">
                  <span className="text-p1">•</span>
                  Information you provide (contact forms, booking details)
                </li>
                <li className="text-p5 flex items-start gap-3">
                  <span className="text-p1">•</span>
                  Information collected automatically (device info, cookies)
                </li>
                <li className="text-p5 flex items-start gap-3">
                  <span className="text-p1">•</span>
                  Information from third party services (analytics, social media)
                </li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="h4 text-p4 mb-4">Sharing Your Information</h2>
              <p className="body-1 text-p5 leading-relaxed font-semibold text-p3 mb-2">
                We do not sell your personal information.
              </p>
              <p className="body-1 text-p5 leading-relaxed">
                We may share limited information only with service providers that support our business operations.
              </p>
            </div>

            <div className="mb-12 p-8 bg-s2 rounded-2xl">
              <h2 className="h4 text-p4 mb-4">Contact Us</h2>
              <p className="body-1 text-p5 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, contact us at:
              </p>
              <a href="mailto:info@ellatechsolutions.com" className="text-p1 hover:text-p3 text-lg font-semibold">
                info@ellatechsolutions.com
              </a>
            </div>
          </div>
        </section>

        <Chatbot />
        <Footer />
      </main>
    </div>
  );
}

export default Legal;