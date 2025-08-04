const LocationRequest = require("../models/LocationRequest");

const sendRequest = async (req, res) => {
  const { sender, receiver } = req.body;

  const existingRequest = await LocationRequest.findOne({ sender, receiver });

  if (existingRequest) {
    return res.status(200).json({ link: existingRequest._id });
  }

  const newRequest = new LocationRequest({ sender, receiver });
  await newRequest.save();

  res.status(200).json({ link: newRequest._id });
};

const acceptRequest = async (req, res) => {
  const { requestId } = req.body;

  const request = await LocationRequest.findById(requestId);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.accepted = true;
  await request.save();

  res.status(200).json({ message: "Request accepted" });
};

const updateLocation = async (req, res) => {
  const { requestId, latitude, longitude } = req.body;

  const request = await LocationRequest.findById(requestId);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.location = { latitude, longitude };
  await request.save();

  res.status(200).json({ message: "Location updated" });
};

const trackLocation = async (req, res) => {
  const { sender, receiver } = req.body;

  const request = await LocationRequest.findOne({ sender, receiver });
  if (!request) return res.status(404).json({ trackingAllowed: false });

  if (!request.accepted) {
    return res.status(200).json({ trackingAllowed: false });
  }

  res.status(200).json({ trackingAllowed: true, location: request.location });
};

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
