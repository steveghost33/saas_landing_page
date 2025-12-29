import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import WebProjects from "./pages/WebProjects.jsx";
import TechSolutions from "./pages/TechSolutions.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Legal from "./pages/Legal.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* If Render or a link lands on /index.html, send it home */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />

      <Route path="/web-projects" element={<WebProjects />} />
      <Route path="/tech-solutions" element={<TechSolutions />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/legal" element={<Legal />} />
    </Routes>
  );
}

export default App;
