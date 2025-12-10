import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Button from "../components/Button.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";

function TechSolutions() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#hero") {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      {/* Fixed header + contact banner */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      {/* Push main content just below header + banner */}
      <main className="overflow-hidden pt-[130px] md:pt-[145px]">
        {/* Hero Banner */}
        <section
          id="hero"
          className="relative pt-32 pb-32 max-lg:pt-28 max-lg:pb-28 max-md:pt-24 max-md:pb-24 bg-s1 font-poppins text-p5"
        >
          <div
            className="relative h-[350px] w-full overflow-hidden rounded-3xl mb-20"
            style={{
              backgroundImage: "url('/images/tech-training-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
              <h1 className="h1 text-white drop-shadow-xl mb-4">
                Tech Solutions &amp; Training
              </h1>
              <p className="body-1 text-white drop-shadow-lg max-w-2xl">
                From mastering everyday software to AI-powered admin support, we
                give your team the tools and guidance to work more efficiently.
              </p>
            </div>
          </div>

          {/* Technology Consulting */}
          <div className="container grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="h3 text-p4 mb-4">Technology Consulting</h2>
              <p className="body-1 mb-6">
                We review how your team works and find steps that run
                automatically, reducing repetitive tasks so you can focus on what
                matters.
              </p>
              <ul className="list-disc pl-5 space-y-2 body-3 text-p5">
                <li>Map out your current workflow</li>
                <li>Recommend the right software tools</li>
                <li>Set up simple automated tasks</li>
                <li>Check in regularly to keep everything running smoothly</li>
              </ul>
            </div>
            <div>
              <img
                src="/images/consulting-session.jpg"
                alt="Team in consulting session"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Training & Development */}
          <div className="container grid md:grid-cols-2 gap-12 mb-20">
            <div className="order-2 md:order-1">
              <img
                src="/images/office365-workshop.jpg"
                alt="Office 365 workshop"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="h3 text-p4 mb-4">Training &amp; Development</h2>
              <p className="body-1 mb-6">
                Hands-on sessions and quick online lessons to help your team gain
                confidence using email, online meetings, file sharing, and basic
                computer skills.
              </p>
              <ul className="list-disc pl-5 space-y-2 body-3 text-p5">
                <li>Email, chat, and calendar basics</li>
                <li>Online meeting setup and etiquette</li>
                <li>Organizing and sharing files securely</li>
                <li>Short video lessons you can watch anytime</li>
              </ul>
            </div>
          </div>

          {/* AI-Powered Admin Support */}
          <div className="container mb-20">
            <h2 className="h3 text-p4 mb-8 text-center">
              AI-Powered Admin Support
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Automated Email Management",
                  img: "/images/email-auto.jpg",
                  desc:
                    "Use AI to sort, prioritize, and draft responses to routine emails freeing up hours every week.",
                },
                {
                  title: "Smart Scheduling & Reminders",
                  img: "/images/calendar-auto.jpg",
                  desc:
                    "Let AI coordinate calendars, send meeting invites, and issue timely reminders so you never miss an appointment.",
                },
                {
                  title: "Data Entry & Reporting",
                  img: "/images/data-auto.jpg",
                  desc:
                    "Automate repetitive data-entry tasks and generate clear, customizable reports for your business or nonprofit.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-s2 rounded-2xl shadow-lg overflow-hidden"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="h5 mb-2 text-p4">{item.title}</h3>
                    <p className="body-3 text-p5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="container text-center mb-32">
            <h2 className="h4 mb-6">Ready to Boost Your Team’s Efficiency</h2>
            <p className="body-1 mb-8 max-w-2xl mx-auto">
              Contact us for a free consultation and see how AI-powered solutions
              can save you time and money.
            </p>
            <Button href="/#contact" containerClassName="inline-block mx-auto">
              Book a Free Consultation
            </Button>
          </div>
        </section>

        <Chatbot />
        <Footer />
      </main>
    </>
  );
}

export default TechSolutions;