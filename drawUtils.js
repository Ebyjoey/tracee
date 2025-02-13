export function drawHand(predictions, ctx) {
    if (!predictions.length) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;
  
      landmarks.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });
  
      const fingerJoints = [
        [0, 1, 2, 3, 4], // Thumb
        [5, 6, 7, 8], // Index Finger
        [9, 10, 11, 12], // Middle Finger
        [13, 14, 15, 16], // Ring Finger
        [17, 18, 19, 20], // Pinky Finger
      ];
  
      fingerJoints.forEach((joint) => {
        for (let i = 0; i < joint.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(landmarks[joint[i]][0], landmarks[joint[i]][1]);
          ctx.lineTo(landmarks[joint[i + 1]][0], landmarks[joint[i + 1]][1]);
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    });
  }
  