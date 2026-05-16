import Hero from "../sections/Hero.jsx";
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
        title="Ella Tech Solutions | Technology Consulting Detroit — Nonprofits, Businesses &amp; Entrepreneurs"
        description="Ella Tech Solutions helps Detroit nonprofits and small businesses build websites, automate tasks, manage contacts, and train staff — practical technology consulting."
        canonical="https://www.ellatechsolutions.com/"
        schema={faqSchema}
      />
      <PageShell
        mainClassName="overflow-hidden pt-[100px] md:pt-[140px]"
        showMobileBookingBar
      >
        <Hero />
        <Services />
        <Plans />
        <Faq />
        <Contact />
      </PageShell>
    </>
  );
}

export default Home;
