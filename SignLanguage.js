import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "../utils/drawUtils"; // Import the draw function

const SignLanguage = ({ onSignDetected }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedText, setDetectedText] = useState("Waiting for sign...");
  const [model, setModel] = useState(null);
  const [isRunning, setIsRunning] = useState(false); // ✅ Control detection loop

  useEffect(() => {
    const loadHandPoseModel = async () => {
      const loadedModel = await handpose.load();
      setModel(loadedModel);
    };
    loadHandPoseModel();
  }, []);

  const detectHands = useCallback(async () => {
    if (!isRunning || !model || !webcamRef.current?.video) return;

    const video = webcamRef.current.video;
    if (video.readyState === 4) {
      const predictions = await model.estimateHands(video);

      if (predictions.length > 0) {
        processHand(predictions);
        drawHand(predictions, canvasRef.current.getContext("2d"));
      } else {
        setDetectedText("No hand detected");
      }
    }

    requestAnimationFrame(detectHands); // ✅ Continue detection when running
  }, [isRunning, model]);

  useEffect(() => {
    if (isRunning) detectHands();
  }, [isRunning, detectHands]);

  const processHand = (predictions) => {
    const landmarks = predictions[0].landmarks;
    const detectedSign = recognizeSign(landmarks);
    setDetectedText(detectedSign);
    onSignDetected(detectedSign);
  };

  const recognizeSign = (landmarks) => {
    const [thumb, index, middle, ring, pinky] = [
      landmarks[4],
      landmarks[8],
      landmarks[12],
      landmarks[16],
      landmarks[20],
    ];

    if (index[1] < middle[1] && pinky[1] < middle[1]) {
      return "Hello 👋";
    } else if (thumb[0] < index[0] && pinky[0] < ring[0]) {
      return "Thumbs down 👍";
    } else if (thumb[0] > index[0] && pinky[0] > ring[0]) {
      return "Thumbs up 👎";
    } else if (index[1] < middle[1] && ring[1] > pinky[1]) {
      return "Peace ✌";
    } else if (
      thumb[1] < index[1] &&
      thumb[1] < middle[1] &&
      thumb[1] < ring[1] &&
      thumb[1] < pinky[1]
    ) {
      return "Thank You 🙏";
    } else if (
      index[1] > middle[1] &&
      ring[1] > pinky[1] &&
      thumb[1] > index[1]
    ) {
      return "Fist ✊";
    } else {
      return "Unknown Sign 🤷‍♂️";
    }
  };

  return (
    <div className="component-wrapper">
      <h2>Sign Language to Speech/Text</h2>
      <Webcam ref={webcamRef} style={{ width: "100%", borderRadius: "10px" }} />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <p className="detected-text">{detectedText}</p>

      {/* Start & Stop Buttons */}
      <div className="button-group">
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Start Detection
        </button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
          Stop Detection
        </button>
      </div>
    </div>
  );
};

export default SignLanguage;
