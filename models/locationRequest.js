const mongoose = require("mongoose");

const locationRequestSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

module.exports = mongoose.model("LocationRequest", locationRequestSchema);
