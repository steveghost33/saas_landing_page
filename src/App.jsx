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
import FaqPage from "./pages/FaqPage.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import ResearchForm from "./pages/Admin/ResearchForm.jsx";

// Service-specific pages
import WebsiteDesign from "./pages/services/WebsiteDesign.jsx";
import CrmSetup from "./pages/services/CrmSetup.jsx";
import AiWorkflow from "./pages/services/AiWorkflow.jsx";
import StaffTraining from "./pages/services/StaffTraining.jsx";
import LmsDevelopment from "./pages/services/LmsDevelopment.jsx";
import Microsoft365 from "./pages/services/Microsoft365.jsx";
import DigitalStrategy from "./pages/services/DigitalStrategy.jsx";

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
        <Route path="/faq" element={<FaqPage />} />

        {/* Audience-specific service pages */}
        <Route path="/services/small-business" element={<SmallBusiness />} />
        <Route path="/services/nonprofits" element={<Nonprofits />} />
        <Route path="/services/entrepreneurs" element={<Entrepreneurs />} />

        {/* Service-specific pages */}
        <Route path="/services/website-design" element={<WebsiteDesign />} />
        <Route path="/services/crm-setup" element={<CrmSetup />} />
        <Route path="/services/ai-workflow" element={<AiWorkflow />} />
        <Route path="/services/staff-training" element={<StaffTraining />} />
        <Route path="/services/lms-development" element={<LmsDevelopment />} />
        <Route path="/services/microsoft-365" element={<Microsoft365 />} />
        <Route path="/services/digital-strategy" element={<DigitalStrategy />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Admin routes */}
        <Route path="/admin/research-form" element={<ResearchForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
