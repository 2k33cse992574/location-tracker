const LocationRequest = require("../models/LocationRequest");

// 1. Sender sends a request to receiver
const sendRequest = async (req, res) => {
  const { sender, receiver } = req.body;

  // Always create a new request (to support multiple receivers)
  const newRequest = new LocationRequest({ sender, receiver });
  await newRequest.save();

  res.status(200).json({ link: newRequest._id });
};

// 2. Receiver accepts request and location will be shared
const acceptRequest = async (req, res) => {
  const { requestId } = req.body;

  const request = await LocationRequest.findById(requestId);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.accepted = true;
  await request.save();

  res.status(200).json({ message: "Request accepted" });
};

// 3. Receiver updates their real-time location
const updateLocation = async (req, res) => {
  const { requestId, latitude, longitude } = req.body;

  const request = await LocationRequest.findById(requestId);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.location = { latitude, longitude };
  await request.save();

  res.status(200).json({ message: "Location updated" });
};

// 4. Sender checks if tracking is allowed (accepted)
const trackLocation = async (req, res) => {
  const { requestId } = req.body;

  const request = await LocationRequest.findById(requestId);
  if (!request) return res.status(404).json({ trackingAllowed: false });

  if (!request.accepted) {
    return res.status(200).json({ trackingAllowed: false });
  }

  res.status(200).json({ trackingAllowed: true, location: request.location });
};

// 5. track.js fetches receiver location using requestId (used in GET request)
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
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  updateLocation,
  trackLocation,
  getLocationById,
};
