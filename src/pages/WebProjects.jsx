import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Button from "../components/Button.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";
import PageSEO from "../components/PageSEO.jsx";

const webProjectsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Creation & CRM Strategy",
  serviceType: "Website Design and CRM Implementation",
  description:
    "Custom websites and CRM systems built for nonprofits, small businesses, and mission-driven organizations in Detroit and beyond.",
  provider: {
    "@type": "LocalBusiness",
    name: "Ella Tech Solutions",
    url: "https://www.ellatechsolutions.com",
  },
  areaServed: ["Detroit, MI", "Metro Detroit", "Michigan"],
  url: "https://www.ellatechsolutions.com/web-projects",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ellatechsolutions.com/" },
      { "@type": "ListItem", position: 2, name: "Web Projects", item: "https://www.ellatechsolutions.com/web-projects" },
    ],
  },
};

function WebProjects() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#hero") {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash]);

  const projects = [
    {
      title: "Ella Tech Solutions Website",
      img: "/images/projects/ellatech.png",
      desc:
        "A modern SaaS-style website built for a Detroit-based technology consulting firm. Showcases services, pricing, and client intake — optimized for nonprofit and small business audiences.",
      tags: ["React", "Tailwind CSS", "Vite"],
      link: "/",
      internal: true,
    },
    {
      title: "Peak Form Fitness",
      img: "/images/projects/peak-form.png",
      desc:
        "A fitness business website featuring service packages, appointment booking, and a branded e-commerce experience. Built for speed and mobile usability.",
      tags: ["Web Design", "E-Commerce", "Booking Integration"],
      link: "https://peak-form-fitness.vercel.app",
      internal: false,
    },
  ];

  const capabilities = [
    {
      title: "Nonprofit Websites",
      desc: "Designed for lean teams and limited budgets. We build sites your staff can update and your donors can trust. Mission-driven pricing available.",
    },
    {
      title: "Small Business Sites",
      desc: "Clean, fast, mobile-first websites that generate leads and reflect your brand. Book a consultation to discuss scope and pricing.",
    },
    {
      title: "CRM Integration",
      desc: "We connect your website to your CRM (Customer Relationship Management) system so contact forms, intake flows, and donor tracking actually work together.",
    },
    {
      title: "Ongoing Support",
      desc: "Retainer options available so your site stays updated, secure, and working after launch. Book a consultation to discuss support plans.",
    },
  ];

  return (
    <div className="min-h-screen bg-s1">
      <PageSEO
        title="Web Projects | Ella Tech Solutions — Detroit Nonprofit Websites"
        description="Custom websites built for nonprofits, small businesses, and mission-driven organizations in Detroit. Responsive, fast, and built around your audience and mission."
        canonical="https://www.ellatechsolutions.com/web-projects"
        schema={webProjectsSchema}
      />
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      <main className="overflow-hidden pt-[160px] md:pt-[180px]">
        <section
          id="hero"
          className="relative pt-16 pb-24 max-lg:pt-12 max-lg:pb-20 max-md:pt-10 max-md:pb-16 bg-s1 font-poppins text-p5"
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
                Web Projects
              </h1>
              <p className="body-1 text-white drop-shadow-lg max-w-2xl">
                Custom websites built for nonprofits, small businesses, and mission-driven organizations in Detroit and beyond.
              </p>
            </div>
          </div>

          {/* What we build */}
          <div className="container mb-20">
            <h2 className="h3 text-p4 mb-4 text-center">What We Build</h2>
            <p className="body-1 text-p5 text-center max-w-2xl mx-auto mb-12">
              Every site we build is responsive, fast, and designed so your team can manage it without calling a developer for every update. We do not use generic templates. We build around your audience, your mission, and your workflow.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="bg-s2 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="h5 text-p4 mb-2">{cap.title}</h3>
                  <p className="body-3 text-p5">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Cards */}
          <div className="container mb-20">
            <h2 className="h3 text-p4 mb-10 text-center">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-s2 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                >
                  <div className="w-full h-48 md:h-56 bg-s1 rounded-xl m-3 flex items-center justify-center">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="max-w-[calc(100%-1.5rem)] max-h-[calc(100%-1.5rem)] object-contain"
                    />
                  </div>

                  <div className="p-6 pt-3 flex-1 flex flex-col">
                    <h3 className="h5 text-p4 mb-2">{proj.title}</h3>
                    <p className="body-3 text-p5 flex-1 mb-4">{proj.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full border border-white/20 text-p3 uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {proj.internal ? (
                      <Button
                        to={proj.link}
                        containerClassName="mt-auto self-start"
                        markerFill="#FFF"
                      >
                        View Project
                      </Button>
                    ) : (
                      <Button
                        href={proj.link}
                        containerClassName="mt-auto self-start"
                        markerFill="#FFF"
                      >
                        View Project
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container mb-20">
            <div className="bg-s2 rounded-3xl p-10 md:p-14 border border-white/10 max-w-3xl mx-auto text-center">
              <h2 className="h3 text-p4 mb-4">Mission-Driven Pricing Available</h2>
              <p className="body-1 text-p5 mb-2">
                We offer mission-driven pricing for verified 501(c)(3) nonprofits and community-based organizations. Every project is scoped and quoted based on your specific needs and organization type.
              </p>
              <p className="body-3 text-p5">
                Book a consultation to discuss your project and get a straightforward quote.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="container text-center mb-32">
            <h2 className="h4 mb-4">Ready to start your project?</h2>
            <p className="body-1 mb-6 max-w-2xl mx-auto text-p5">
              Book a consultation and we will map out what your website needs to do, who it needs to serve, and how to build it within your budget.
            </p>
            <Button href="/#contact" containerClassName="inline-block mx-auto">
              Book a Consultation
            </Button>
          </div>
        </section>

        <Chatbot />
        <Footer />
      </main>
    </div>
  );
}

export default WebProjects;
