const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db"); // Includes mongoose

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const locationRoutes = require("./routes/location");
app.use("/api/location", locationRoutes);

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// Handle direct HTML routes like /accept.html or /track.html
app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "public", req.url);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
