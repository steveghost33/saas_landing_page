// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash.jsx";

import Home from "./pages/Home.jsx";
import WebProjects from "./pages/WebProjects.jsx";
import TechSolutions from "./pages/TechSolutions.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Legal from "./pages/Legal.jsx";

function App() {
  return (
    <>
      <ScrollToHash offset={140} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-projects" element={<WebProjects />} />
        <Route path="/tech-solutions" element={<TechSolutions />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </>
  );
}

export default App;
