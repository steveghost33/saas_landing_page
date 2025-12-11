import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Button from "../components/Button.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";

function WebProjects() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#hero") {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  const projects = [
    {
      title: "Ella Tech Solutions SaaS Website",
      img: "/images/projects/ellatech.png",
      desc: "A modern SaaS style website showcasing services, animations, client centered solutions, and responsive design.",
      link: "/", // Routes to Home page
    },
    {
      title: "Peak Form Fitness Ecommerce Website",
      img: "/images/projects/peak-form.png",
      desc: "A fitness business website featuring service packages, appointment booking, and a branded ecommerce experience.",
      link: "https://peak-form-fitness.vercel.app",
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      <main className="overflow-hidden pt-[130px] md:pt-[145px]">
        <section
          id="hero"
          className="relative pt-32 pb-32 max-lg:pt-28 max-lg:pb-28 max-md:pt-24 max-md:pb-24 bg-s1 font-poppins text-p5"
        >
          {/* Hero Banner */}
          <div
            className="relative h-[350px] w-full overflow-hidden rounded-3xl mb-20"
            style={{
              backgroundImage: "url('/images/web-projects-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
              <h1 className="h1 text-white drop-shadow-xl mb-4">
                Our Web Projects
              </h1>
              <p className="body-1 text-white drop-shadow-lg max-w-2xl">
                A look at custom websites and web applications built for businesses and organizations.
              </p>
            </div>
          </div>

          {/* Project Grid */}
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-s2 rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                {/* Thumbnail - Fixed height, full image visible */}
                <div className="w-full h-48 md:h-56 lg:h-52 bg-s1 rounded-xl m-3 mr-3 ml-3 flex items-center justify-center">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="max-w-[calc(100%-1.5rem)] max-h-[calc(100%-1.5rem)] object-contain"
                  />
                </div>

                <div className="p-6 pt-3 flex-1 flex flex-col">
                  <h3 className="h5 text-p4 mb-2">{proj.title}</h3>
                  <p className="body-3 text-p5 flex-1">{proj.desc}</p>

                  <Button
                    href={proj.link}
                    containerClassName="mt-4 self-start"
                    markerFill="#FFF"
                  >
                    View Project
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="container text-center mb-32">
            <h2 className="h4 mb-4">Ready to Start Your Own Project</h2>
            <p className="body-1 mb-6 max-w-2xl mx-auto">
              Let us talk about how we can bring your idea to life. No pressure, just a friendly conversation.
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

export default WebProjects;