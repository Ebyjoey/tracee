import React, { useState } from "react";
import axios from "axios";
import "../styles/Components.css";

const TextSimplification = () => {
  const [inputText, setInputText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxCharacters = 500; // Set character limit

  const handleSimplify = async () => {
    if (!inputText.trim()) {
      alert("Please enter text to simplify.");
      return;
    }

    if (inputText.length > maxCharacters) {
      setError(`Text is too long. Limit: ${maxCharacters} characters.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/simplify-text",
        { text: inputText },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSimplifiedText(response.data.simplifiedText || "No simplified text received.");
    } catch (error) {
      console.error("Error simplifying text:", error);
      setError("Failed to simplify the text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(simplifiedText);
    alert("Simplified text copied to clipboard!");
  };

  return (
    <div className="component-wrapper">
      <h2>AI Text Simplification</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to simplify"
        maxLength={maxCharacters}
      />
      <p className="text-length-indicator">
        {inputText.length} / {maxCharacters} characters
      </p>

      <button onClick={handleSimplify} disabled={loading}>
        {loading ? "Processing..." : "Simplify Text"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {simplifiedText && (
        <div className="result-box">
          <h3>Result:</h3>
          <p>{simplifiedText}</p>
          <button onClick={handleCopyText}>Copy Text</button>
        </div>
      )}
    </div>
  );
};

export default TextSimplification;
