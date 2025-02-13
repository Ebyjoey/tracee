import React, { useState, useEffect } from "react";
import "../styles/Components.css";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]?.name || null);
    };

    // Load voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      alert("Please enter text to convert to speech.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.voice = voices.find((voice) => voice.name === selectedVoice);

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="component-wrapper">
      <h2>Text to Speech (Browser API)</h2>
      
      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
      />

      {/* Voice Selection */}
      <label>Choose a Voice:</label>
      <select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      {/* Speech Rate Control */}
      <label>Speed: {speechRate.toFixed(1)}</label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speechRate}
        onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
      />

      {/* Speech Pitch Control */}
      <label>Pitch: {speechPitch.toFixed(1)}</label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speechPitch}
        onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
      />

      {/* Speak/Stop Button */}
      <button onClick={handleSpeak}>
        {isSpeaking ? "Stop Speaking" : "Convert to Speech"}
      </button>
    </div>
  );
};

export default TextToSpeech;
