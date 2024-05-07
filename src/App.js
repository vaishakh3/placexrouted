import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Quiz from "./Quiz/quiz";
import Faq from "./Faq/Faq";
import Mentor from "./mentor/mentor";


function App() {
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/Mentor" element={<Mentor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
