const express = require("express");
const router = express.Router();
const Accommodation = require("../models/Accommodation");

// @route   GET /api/accommodations
// @desc    Get all active accommodations (public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { city, guests, checkIn, checkOut } = req.query;
    const filters = { status: "active" };

    if (city && String(city).trim()) {
      filters.location = { $regex: String(city).trim(), $options: "i" };
    }

    if (guests && !Number.isNaN(Number(guests))) {
      filters.guests = { $gte: Number(guests) };
    }

    // Lightweight date validation only; full availability model is not in current schema.
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      return res.json([]);
    }

    const accommodations = await Accommodation.find(filters).sort({
      createdAt: -1,
    });
    res.json(accommodations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/accommodations/featured/list
// @desc    Get featured accommodations
// @access  Public
router.get("/featured/list", async (req, res) => {
  try {
    const accommodations = await Accommodation.find({
      status: "active",
      isFeatured: true,
    })
      .sort({ createdAt: -1 })
      .limit(3); // optional but recommended


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
