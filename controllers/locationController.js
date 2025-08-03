const LocationRequest = require('../models/LocationRequest');

// 📤 Send location request
const sendRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const existing = await LocationRequest.findOne({ sender, receiver });
    if (existing) {
      return res.status(400).json({ error: 'Request already sent.' });
    }

    const request = new LocationRequest({ sender, receiver, status: 'pending' });
    await request.save();

    res.status(201).json({ message: '📤 Request sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to send request.' });
  }
};

// ✅ Accept location request
const acceptRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const request = await LocationRequest.findOne({ sender, receiver });
    if (!request) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    if (request.status === 'accepted') {
      return res.status(400).json({ error: 'Request already accepted.' });
    }

    request.status = 'accepted';
    await request.save();

    res.json({ message: '✅ Request accepted.' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to accept request.' });
  }
};

// 📍 Update location from receiver
const updateLocation = async (req, res) => {
  try {
    const { sender, receiver, latitude, longitude } = req.body;

    const request = await LocationRequest.findOne({ sender, receiver });
    if (!request || request.status !== 'accepted') {
      return res.status(403).json({ error: 'Tracking not allowed.' });
    }

    request.latitude = latitude;
    request.longitude = longitude;
    await request.save();

    res.json({ message: '📡 Location updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to update location.' });
  }
};

// 📍 Track location (used by sender)
const trackLocation = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const request = await LocationRequest.findOne({ sender, receiver });
    if (!request) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    if (request.status !== 'accepted') {
      return res.json({ trackingAllowed: false });
    }

    res.json({
      trackingAllowed: true,
      location: {
        latitude: request.latitude,
        longitude: request.longitude,
      },
    });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to track location.' });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  updateLocation,
  trackLocation,
};
