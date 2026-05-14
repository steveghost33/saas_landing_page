import Header from "../sections/Header.jsx";
import ContactBanner from "../sections/ContactBanner.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";

function PageShell({ children, mainClassName = "overflow-hidden" }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <ContactBanner />
      </div>

      <main id="main-content" className={mainClassName}>
        {children}
        <Chatbot />
        <Footer />
      </main>
    </>
  );
}

export default PageShell;
