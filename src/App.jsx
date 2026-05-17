// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import LeadCapturePopup from "./features/leadCapture/LeadCapturePopup.jsx";

import Home from "./pages/Home.jsx";
import WebProjects from "./pages/WebProjects.jsx";
import TechSolutions from "./pages/TechSolutions.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Legal from "./pages/Legal.jsx";
import CRMChecklistLanding from "./components/LandingPages/CRMChecklistLanding.jsx";
import TechHealthCheckLanding from "./components/LandingPages/TechHealthCheckLanding.jsx";
import SmallBusiness from "./pages/services/SmallBusiness.jsx";
import Nonprofits from "./pages/services/Nonprofits.jsx";
import Entrepreneurs from "./pages/services/Entrepreneurs.jsx";
import Blog from "./pages/Blog.jsx";

function App() {
  return (
    <ThemeProvider>
      <ScrollToHash offset={140} />
      <LeadCapturePopup />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-projects" element={<WebProjects />} />
        <Route path="/tech-solutions" element={<TechSolutions />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/crm-checklist" element={<CRMChecklistLanding />} />
        <Route path="/tech-health-check" element={<TechHealthCheckLanding />} />
        <Route path="/services/small-business" element={<SmallBusiness />} />
        <Route path="/services/nonprofits" element={<Nonprofits />} />
        <Route path="/services/entrepreneurs" element={<Entrepreneurs />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
