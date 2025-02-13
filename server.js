const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Assistive LLM Backend Running...");
});

// Import routes
const speechRoutes = require("./routes/speech");
const textRoutes = require("./routes/text");
const ttsRoutes = require("./routes/tts");

app.use("/api", speechRoutes);
app.use("/api", textRoutes);
app.use("/api", ttsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
