import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import WebProjects from "./pages/WebProjects.jsx";
import TechSolutions from "./pages/TechSolutions.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/web-projects" element={<WebProjects />} />
            <Route path="/tech-solutions" element={<TechSolutions />} />
            </Routes>
        );
}
export default App;