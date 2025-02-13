import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Upload audio for Speech-to-Text
export const uploadAudio = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/speech-to-text`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading audio:", error);
    return { error: "Failed to process speech-to-text" };
  }
};

// Simplify text using GPT-4
export const simplifyText = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/simplify-text`, { text }, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error simplifying text:", error);
    return { error: "Failed to simplify text" };
  }
};

// Convert text to speech using Google TTS
export const convertToSpeech = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/text-to-speech`, { text }, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error converting text to speech:", error);
    return { error: "Failed to convert text to speech" };
  }
};
