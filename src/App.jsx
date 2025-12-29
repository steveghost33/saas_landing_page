import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import WebProjects from "./pages/WebProjects.jsx";
import TechSolutions from "./pages/TechSolutions.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Legal from "./pages/Legal.jsx";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Fix Render serving or landing on /index.html */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />

      {/* Pages */}
      <Route path="/web-projects" element={<WebProjects />} />
      <Route path="/tech-solutions" element={<TechSolutions />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/legal" element={<Legal />} />

      {/* Fallback: never blank on unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
