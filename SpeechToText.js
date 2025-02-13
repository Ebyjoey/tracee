import React, { useState, useEffect } from "react";
import "../styles/Components.css";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  let recognition;

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Your browser does not support Speech Recognition.");
    }
  }, []);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }

    setError(null);
    setIsListening(true);
    setTranscript("");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
      setError("Error occurred in speech recognition: " + event.error);
      stopListening();
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    alert("Transcript copied to clipboard!");
  };

  return (
    <div className="component-wrapper">
      <h2>Live Speech to Text</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="button-group">
        <button onClick={startListening} disabled={isListening}>
          {isListening ? "Listening..." : "Start Listening"}
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop Listening
        </button>
      </div>

      {transcript && (
        <div className="result-box">
          <h3>Transcript:</h3>
          <p>{transcript}</p>
          <button onClick={handleCopyTranscript}>Copy Transcript</button>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
