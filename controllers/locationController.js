const LocationRequest = require("../models/LocationRequest");


// Send a new location request
const sendRequest = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const newRequest = new LocationRequest({ sender, receiver });
    await newRequest.save();
    res.status(201).json({ message: "Request created", requestId: newRequest._id });
  } catch (error) {
    res.status(500).json({ message: "Error sending request" });
  }
};

// Accept a location request
const acceptRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await LocationRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.accepted = true;
    await request.save();
    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting request" });
  }
};

// Update receiver's live location using requestId
const updateLocation = async (req, res) => {
  const { requestId, latitude, longitude } = req.body;
  try {
    const request = await LocationRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.location = { latitude, longitude };
    await request.save();

    res.status(200).json({ message: "Location updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating location" });
  }
};

// Get live location (for tracking)
const getLocation = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await LocationRequest.findById(requestId);
    if (!request || !request.location)
      return res.status(404).json({ message: "Location not found" });

    const { latitude, longitude } = request.location;
    res.status(200).json({ latitude, longitude });
  } catch (error) {
    res.status(500).json({ message: "Error fetching location" });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  updateLocation,
  trackLocation,
  getLocationById,
};

