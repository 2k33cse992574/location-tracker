const express = require("express");
const router = express.Router();

const {
  sendRequest,
  acceptRequest,
  updateLocation,
  trackLocation,
  getLocationById,
} = require("../controllers/locationController");


router.post("/send", sendRequest);
router.post("/accept", acceptRequest);
router.post("/update", updateLocation);
router.post("/track", trackLocation);
router.get("/:id", getLocationById); // ✅ new route for track.js

module.exports = router;
