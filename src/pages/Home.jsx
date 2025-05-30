// src/pages/Home.jsx

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import Hero from "../sections/Hero.jsx";
import Services from "../sections/Services.jsx";
import Pricing from "../sections/Pricing.jsx";
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
        <main className="overflow-hidden">
            <Header />
            <Hero />
            <Services />
            <Pricing />
            <Faq />
            <Contact />
            <Testimonials />
            <Chatbot />
            <Footer />
        </main>
    );
}

export default Home;