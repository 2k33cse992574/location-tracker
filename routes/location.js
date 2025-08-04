const express = require("express");
const router = express.Router();

const {
  sendRequest,
  acceptRequest,
  updateLocation,
  getLocationById,
} = require("../controllers/locationController");

router.post("/send", sendRequest);
router.post("/accept", acceptRequest);
router.post("/update", updateLocation);
router.get("/:id", getLocationById);

module.exports = router;
