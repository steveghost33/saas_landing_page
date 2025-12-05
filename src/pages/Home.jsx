// src/pages/Home.jsx

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Hero from "../sections/Hero.jsx";
import Services from "../sections/Services.jsx";
import Plans from "../sections/Plans.jsx";
import Faq from "../sections/Faq.jsx";
import Contact from "../sections/Contact.jsx";
import Testimonials from "../sections/Testimonials.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";

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
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      <main
        className="overflow-hidden"
        style={{ paddingTop: "140px" }} // adjust if header + banner are taller or shorter
      >
        <Hero />
        <Services />
        <Plans />
        <Faq />
        <Contact />
        <Testimonials />
        <Chatbot />
        <Footer />
      </main>
    </>
  );
}

export default Home;
