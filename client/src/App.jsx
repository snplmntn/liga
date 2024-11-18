import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/landing";
import PBA from "./Pages/PBA";
import UAAP from "./Pages/UAAP";

function AppContent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pba" element={<PBA />} />
        <Route path="/uaap" element={<UAAP />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
