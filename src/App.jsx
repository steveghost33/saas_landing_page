import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";
import Pricing from "./sections/Pricing.jsx";
import Faq from "./sections/Faq.jsx";
import Contact from "./sections/Contact.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Chatbot from "./sections/Chatbot.jsx";
import Footer from "./sections/Footer.jsx";

const App = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <Faq />
      <Contact />
      <Testimonials />
      <Chatbot /> {/* ← floating chatbot section */}
      <Footer />
    </main>
  );
};

export default App;
