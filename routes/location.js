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

// 📡 Update location
router.post('/update', updateLocation);

// 📍 Track location
router.post('/track', trackLocation);

module.exports = router;
