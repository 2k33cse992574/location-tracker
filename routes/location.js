const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  updateLocation,
  trackLocation,
} = require('../controllers/locationController');

// 📤 Send location request
router.post('/send', sendRequest);

// ✅ Accept location request
router.post('/accept', acceptRequest);

// 📡 Update location (called from receiver)
router.post('/update', updateLocation);

// 📍 Track location (called from sender)
router.post('/track', trackLocation);

module.exports = router;
