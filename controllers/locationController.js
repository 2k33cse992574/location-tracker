const LocationRequest = require("../models/LocationRequest");

// Sender sends a location request
const sendRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const newRequest = new LocationRequest({ sender, receiver });
    await newRequest.save();
    res.status(200).json({ link: newRequest._id });
  } catch (err) {
    console.error("Error in sendRequest:", err);
    res.status(500).json({ message: "Database connection failed or timed out." });
  }
};

// Receiver accepts the location request
const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await LocationRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.accepted = true;
    await request.save();
    res.status(200).json({ message: "Request accepted" });
  } catch (err) {
    console.error("Error in acceptRequest:", err);
    res.status(500).json({ message: "Database connection failed or timed out." });
  }
};

// Receiver updates current location
const updateLocation = async (req, res) => {
  try {
    const { requestId, latitude, longitude } = req.body;
    const request = await LocationRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.location = { latitude, longitude };
    await request.save();
    res.status(200).json({ message: "Location updated" });
  } catch (err) {
    console.error("Error in updateLocation:", err);
    res.status(500).json({ message: "Database connection failed or timed out." });
  }
};

// Sender checks if tracking is allowed and gets location
const trackLocation = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await LocationRequest.findById(requestId);
    if (!request || !request.accepted) {
      return res.status(200).json({ trackingAllowed: false });
    }
    res.status(200).json({ trackingAllowed: true, location: request.location });
  } catch (err) {
    console.error("Error in trackLocation:", err);
    res.status(500).json({ message: "Database connection failed or timed out." });
  }
};

// Fetch location by requestId (GET)
const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await LocationRequest.findById(id);
    if (!request || !request.accepted) {
      return res.status(404).json({ message: "Location not available yet." });
    }
    const { latitude, longitude } = request.location || {};
    if (!latitude || !longitude) {
      return res.status(200).json({ message: "Location not shared yet." });
    }
    res.status(200).json({ latitude, longitude });
  } catch (err) {
    console.error("Error in getLocationById:", err);
    res.status(500).json({ message: "Server error: " + (err.message || err) });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  updateLocation,
  trackLocation,
  getLocationById,
};
