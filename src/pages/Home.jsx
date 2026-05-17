import Hero from "../sections/Hero.jsx";
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
        title="Ella Tech Solutions | Nonprofit and Small Business Tech Consulting — Detroit"
        description="Ella Tech Solutions helps Detroit nonprofits and small businesses build websites, set up CRMs, train staff, and automate workflows. Technology that actually gets used."
        canonical="https://www.ellatechsolutions.com/"
        schema={faqSchema}
      />
      <PageShell
        mainClassName="overflow-hidden pt-[100px] md:pt-[140px]"
        showMobileBookingBar
      >
        <Hero />
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
