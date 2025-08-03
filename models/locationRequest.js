// models/LocationRequest.js

const mongoose = require('mongoose');

// Define the schema for a location request
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
    enum: ['pending', 'accepted'],
    default: 'pending',
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('LocationRequest', locationRequestSchema);
