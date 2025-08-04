const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
const locationRoutes = require("./routes/location");
app.use("/api/location", locationRoutes);

// ✅ Serve Static Frontend Files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Handle frontend routes (index.html, accept.html, track.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/accept.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "accept.html"));
});

app.get("/track.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "track.html"));
});

// ✅ 404 fallback for other requests
app.use((req, res) => {
  res.status(404).send("❌ Page not found");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
