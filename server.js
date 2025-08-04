const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const locationRoutes = require("./routes/location");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/location", locationRoutes);

// ✅ DB + Server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port 5000");
  });
}).catch((err) => {
  console.error("❌ DB connection error:", err);
});
