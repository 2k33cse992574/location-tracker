const mongoose = require('mongoose');

const locationRequestSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  locationData: {
    lat: Number,
    lng: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('LocationRequest', locationRequestSchema);
