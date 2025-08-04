const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

const locationRoutes = require("./routes/locationRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/location", locationRoutes);

// Default route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
})
.catch((err) => console.error("❌ MongoDB connection error:", err));
