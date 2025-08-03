const LocationRequest = require('../models/LocationRequest');

// @desc Send location request
const sendRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({ error: 'Sender and receiver are required.' });
    }

    const existing = await LocationRequest.findOne({ sender, receiver });
    if (existing) {
      return res.status(400).json({ error: 'Request already sent.' });
    }

    const request = new LocationRequest({ sender, receiver, status: 'pending' });
    await request.save();

    res.status(201).json({ message: '📤 Request sent successfully.' });
  } catch (err) {
    console.error('Error sending request:', err.message);
    res.status(500).json({ error: '❌ Failed to send request.' });
  }
};

// @desc Accept location request
const acceptRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({ error: 'Sender and receiver are required.' });
    }

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
    console.error('Error accepting request:', err.message);
    res.status(500).json({ error: '❌ Failed to accept request.' });
  }
};

// @desc Track location
const trackLocation = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({ error: 'Sender and receiver are required.' });
    }

    const request = await LocationRequest.findOne({ sender, receiver });
    if (!request) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    if (request.status !== 'accepted') {
      return res.status(403).json({ error: 'Request not accepted yet.' });
    }

    // For now, simulate tracking
    res.json({ message: `📍 Tracking enabled between ${sender} and ${receiver}` });
  } catch (err) {
    console.error('Error tracking location:', err.message);
    res.status(500).json({ error: '❌ Failed to track location.' });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  trackLocation
};
