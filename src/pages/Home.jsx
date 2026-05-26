import Hero from "../sections/Hero.jsx";
import WhoWeServe from "../sections/WhoWeServe.jsx";
import SocialProof from "../sections/SocialProof.jsx";
import Services from "../sections/Services.jsx";
import Plans from "../sections/Plans.jsx";
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
        description="Ella Tech Solutions is a technology consulting firm helping nonprofits, small businesses, and entrepreneurs with CRM setup, website design, AI workflow integration, staff training, LMS development, and Microsoft 365 implementation. Detroit-based. Serving clients nationwide."
        canonical="https://www.ellatechsolutions.com/"
        schema={faqSchema}
      />
      <PageShell
        mainClassName="overflow-hidden pt-[148px] sm:pt-[172px]"
        showMobileBookingBar
      >
        <Hero />
        <WhoWeServe />
        <SocialProof />
        <Services />
        <Plans />
        <Faq />
        <Contact />
      </PageShell>
    </>
  );
}

export default Home;
