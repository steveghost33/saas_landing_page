import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Hero from "../sections/Hero.jsx";
import Services from "../sections/Services.jsx";
import Plans from "../sections/Plans.jsx";
import Faq from "../sections/Faq.jsx";
import Contact from "../sections/Contact.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";
import PageSEO from "../components/PageSEO.jsx";
import { faq } from "../constants/index.jsx";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      <PageSEO
        title="Ella Tech Solutions | Nonprofit Technology Consulting Detroit"
        description="Ella Tech Solutions helps Detroit nonprofits and small businesses implement websites, CRMs, AI workflows, LMS platforms, and HRIS systems. Practical technology consulting from Detroit."
        canonical="https://www.ellatechsolutions.com/"
        schema={faqSchema}
      />
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      <main
        className="overflow-hidden"
        style={{ paddingTop: "140px" }} // adjust if header + banner height changes
      >
        <Hero />
        <Services />
        <Plans />
        <Faq />
        <Contact />
        <Chatbot />
        <Footer />
      </main>
    </>
  );
}

export default Home;