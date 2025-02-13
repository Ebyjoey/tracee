import React from "react";
import SpeechToText from "../components/SpeechToText";
import TextSimplification from "../components/TextSimplification";
import TextToSpeech from "../components/TextToSpeech";

const Home = () => (
  <div>
    <h1>Assistive Technology Application</h1>
    <SpeechToText />
    <TextSimplification />
    <TextToSpeech />
  </div>
);

export default Home;
