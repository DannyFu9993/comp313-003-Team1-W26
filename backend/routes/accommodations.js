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

// NEW ROUTE
// @route   GET /api/accommodations/:id
// @desc    Get one accommodation by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json(accommodation);
  } catch (err) {
    console.error(err.message);

    // if invalid ObjectId
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
