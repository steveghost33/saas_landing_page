import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Button from "../components/Button.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";
import PageSEO from "../components/PageSEO.jsx";

const techSolutionsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tech Solutions & Staff Training",
  serviceType: "Technology Consulting and Staff Training",
  description:
    "CRM, HRIS, AI workflow integration, LMS development, and staff technology training for nonprofits and mission-driven organizations in Detroit.",
  provider: {
    "@type": "LocalBusiness",
    name: "Ella Tech Solutions",
    url: "https://www.ellatechsolutions.com",
  },
  areaServed: ["Detroit, MI", "Metro Detroit", "Michigan"],
  url: "https://www.ellatechsolutions.com/tech-solutions",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM Strategy & Implementation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HRIS Implementation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Integration & Literacy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LMS & Micro-Learning Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Staff Technology Training & Professional Development" } },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ellatechsolutions.com/" },
      { "@type": "ListItem", position: 2, name: "Tech Solutions", item: "https://www.ellatechsolutions.com/tech-solutions" },
    ],
  },
};

const services = [
  {
    id: "crm",
    title: "CRM (Customer Relationship Management) Strategy & Implementation",
    description:
      "Most nonprofits buy a CRM — a customer relationship management system — and stop using it within six months. We configure your CRM around how your organization actually operates, migrate your existing data, and train your staff so adoption sticks.",
    details: [
      "CRM selection and vendor evaluation",
      "System configuration for your workflows and reporting needs",
      "Data migration from spreadsheets or legacy systems",
      "Staff training and administrator documentation",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/consulting-session.jpg",
    alt: "CRM strategy session",
  },
  {
    id: "hris",
    title: "HRIS (Human Resources Information System) Implementation",
    description:
      "If your HR team is still managing staff records, onboarding, time off, and performance in spreadsheets, an HRIS — a human resources information system — brings all of that into one place. We handle selection, setup, and training end to end.",
    details: [
      "HRIS platform selection and scoping",
      "System configuration and data migration",
      "Onboarding workflows and staff record setup",
      "Administrator training and documentation",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/office365-workshop.jpg",
    alt: "HRIS implementation training",
  },
  {
    id: "ai",
    title: "AI Workflow Integration & Literacy",
    description:
      "AI is a tool, not a strategy. We identify the specific places in your operations where AI saves real time, implement the workflows, and run training so your team understands how to use the tools confidently.",
    details: [
      "Workflow audit to identify automation opportunities",
      "AI tool selection and implementation",
      "Automated email management, scheduling, and reporting",
      "Staff AI literacy training and practical playbooks",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/email-auto.jpg",
    alt: "AI workflow integration",
  },
  {
    id: "lms",
    title: "LMS (Learning Management System) & Micro-Learning Development",
    description:
      "A learning management system is the platform your staff uses to complete training and track progress. We select and implement your LMS, build course content using Articulate or SCORM-compliant tools, and train your administrators so the system runs without outside help.",
    details: [
      "LMS platform selection, setup, and content migration",
      "Micro-learning module development in Articulate 360 or Rise",
      "SCORM-compliant course packaging and deployment",
      "Administrator training and learner onboarding",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/data-auto.jpg",
    alt: "LMS and e-learning development",
  },
  {
    id: "training",
    title: "Staff Technology Training & Professional Development",
    description:
      "Your team adopted the tools but never got real training. We run live workshops and build self-paced content so staff can work confidently in the systems they already have.",
    details: [
      "Half-day and full-day live workshops",
      "Self-paced video content for async teams",
      "Microsoft 365, Google Workspace, and platform-specific training",
      "Participant workbooks and post-training support",
      "Mission-driven pricing available for nonprofits and community organizations",
    ],
    img: "/images/calendar-auto.jpg",
    alt: "Staff technology training workshop",
  },
];

function TechSolutions() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#hero") {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-s1">
      <PageSEO
        title="Tech Solutions & Training | Ella Tech Solutions — CRM, AI, LMS, HRIS Detroit"
        description="CRM, HRIS, AI workflow integration, LMS development, and staff technology training for nonprofits in Detroit. Practical tech consulting that gets adopted, not just installed."
        canonical="https://www.ellatechsolutions.com/tech-solutions"
        schema={techSolutionsSchema}
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
            className="relative w-full overflow-hidden rounded-3xl mb-20 min-h-[440px] sm:min-h-[380px] md:h-[350px] md:min-h-0"
            style={{
              backgroundImage: "url('/images/tech-training-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container flex flex-col justify-center items-center text-center px-4 py-12 md:h-full md:py-0">
              <h1 className="h1 text-white drop-shadow-xl mb-4">
                Tech Solutions & Training
              </h1>
              <p className="body-1 text-white drop-shadow-lg max-w-2xl">
                Practical technology implementation for nonprofits and mission-driven organizations. We build systems your staff will actually use.
              </p>
            </div>
          </div>

          {/* Intro */}
          <div className="container mb-20 max-w-3xl mx-auto text-center">
            <h2 className="h3 text-p4 mb-4">The problem is not the tool. It is the implementation.</h2>
            <p className="body-1 text-p5">
              Most organizations do not need better software. They need better systems. Steven Bowman and the Ella Tech team have spent 15 years building technology infrastructure inside nonprofits, school districts, and community organizations. We know what it takes to get tools adopted, not just installed.
            </p>
          </div>

          {/* Services — alternating layout */}
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="container grid md:grid-cols-2 gap-12 mb-24 items-center"
            >
              {/* Image: alternates left/right */}
              <div className={idx % 2 !== 0 ? "order-2 md:order-1" : ""}>
                <img
                  src={service.img}
                  alt={service.alt}
                  className="rounded-xl shadow-lg w-full object-cover"
                />
              </div>

              {/* Text */}
              <div className={idx % 2 !== 0 ? "order-1 md:order-2" : ""}>
                <h2 className="h3 text-p4 mb-4">{service.title}</h2>
                <p className="body-1 mb-6 text-p5">{service.description}</p>
                <ul className="list-disc pl-5 space-y-2 body-3 text-p5">
                  {service.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Digital Strategy Consulting — full width callout */}
          <div className="container mb-24">
            <div className="bg-s2 rounded-3xl p-10 md:p-14 border border-white/10">
              <div className="max-w-2xl">
                <h2 className="h3 text-p4 mb-4">Digital Strategy Consulting</h2>
                <p className="body-1 text-p5 mb-6">
                  Not sure where to start? Book a free 30-minute consultation and we will give you a clear picture of your technology gaps and the best next steps. No commitment required.
                </p>
                <ul className="list-disc pl-5 space-y-2 body-3 text-p5 mb-8">
                  <li>Technology audit and gap analysis</li>
                  <li>Vendor selection and implementation planning</li>
                  <li>Flexible options for nonprofits and standard clients</li>
                  <li>No long-term commitment required to start</li>
                </ul>
                <Button href="/#contact" containerClassName="inline-block">
                  Book a Free Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Nonprofit note */}
          <div className="container mb-20 max-w-3xl mx-auto">
            <div className="border border-white/10 rounded-2xl p-8 text-center">
              <h3 className="h4 text-p4 mb-3">Mission-Driven Pricing Available</h3>
              <p className="body-1 text-p5">
                Ella Tech Solutions offers mission-driven pricing for verified 501(c)(3) nonprofits and community-based organizations. Quality technology consulting should not be out of reach for organizations doing important work. Book a consultation to discuss your project and what it would cost.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="container text-center mb-32">
            <h2 className="h4 mb-6">Ready to build systems your team will actually use?</h2>
            <p className="body-1 mb-8 max-w-2xl mx-auto text-p5">
              Book a consultation and we will identify where technology can save your team time, reduce overhead, and strengthen your mission.
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

export default TechSolutions;
