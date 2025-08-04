const mongoose = require("mongoose");

const locationRequestSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  accepted: { type: Boolean, default: false },
  location: {
    latitude: Number,
    longitude: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model("LocationRequest", locationRequestSchema);
