import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignLanguage from "./components/SignLanguage";
import TextToSpeech from "./components/TextToSpeech";
import "./styles/App.css";
import "./styles/Components.css";

function App() {
  const [recognizedSign, setRecognizedSign] = useState(""); // Store detected sign

  // Auto-trigger Text-to-Speech when a sign is detected
  useEffect(() => {
    if (recognizedSign) {
      const speech = new SpeechSynthesisUtterance(recognizedSign);
      speech.lang = "en-US";
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  }, [recognizedSign]); // Run whenever recognizedSign changes

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/sign-language"
          element={
            <div className="page-container">
              <h1>Sign Language to Speech/Text</h1>
              <SignLanguage onSignDetected={setRecognizedSign} />

              {/* Display Recognized Sign */}
              {recognizedSign && (
                <div className="result-box">
                  <h3>Recognized Sign:</h3>
                  <p>{recognizedSign}</p>
                </div>
              )}

              {/* Automatically Pass Recognized Sign to Text-to-Speech */}
              <TextToSpeech initialText={recognizedSign} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
