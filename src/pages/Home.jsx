import Hero from "../sections/Hero.jsx";
import WhoWeServe from "../sections/WhoWeServe.jsx";
import SocialProof from "../sections/SocialProof.jsx";
import Services from "../sections/Services.jsx";
import Plans from "../sections/Plans.jsx";
import AboutFounder from "../sections/AboutFounder.jsx";
import Testimonials from "../sections/Testimonials.jsx";
import Faq from "../sections/Faq.jsx";
import Contact from "../sections/Contact.jsx";
import PageSEO from "../components/PageSEO.jsx";
import PageShell from "../components/PageShell.jsx";
import { faq } from "../constants/index.jsx";
import { useScrollToHash } from "../hooks/useScrollToHash.js";

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
  useScrollToHash({ defaultToTop: true });

  return (
    <>
      <PageSEO
        title="Ella Tech Solutions | Technology Consulting Detroit, MI"
        description="Ella Tech Solutions is a Detroit-based operational technology partner helping nonprofits eliminate operational chaos through CRM setup, workflow automation, reporting systems, and practical technology that staff actually use. Founded by Steven Bowman."
        canonical="https://www.ellatechsolutions.com/"
        schema={faqSchema}
      />
      <PageShell
        mainClassName="overflow-hidden pt-[100px] md:pt-[140px]"
        showMobileBookingBar
      >
        <Hero />
        <WhoWeServe />
        <SocialProof />
        <Services />
        <Plans />
        <AboutFounder />
        <Testimonials />
        <Faq />
        <Contact />
      </PageShell>
    </>
  );
}

export default Home;
