const express = require("express");
const router = express.Router();
const Accommodation = require("../models/Accommodation");

// @route   GET /api/accommodations
// @desc    Get all active accommodations (public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.json(accommodations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
