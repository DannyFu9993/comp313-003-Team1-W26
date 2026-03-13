const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Accommodation = require("../models/Accommodation");
const auth = require("../middleware/auth");

// @route   GET api/employee/users
// @desc    Get all users
// @access  Private (employee only)
router.get("/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ msg: "Access denied" });
    }
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/employee/accommodations
// @desc    Get accommodations for the logged-in employee
// @access  Private (employee only)
router.get("/accommodations", auth, async (req, res) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ msg: "Access denied" });
    }
    const accommodations = await Accommodation.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(accommodations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/employee/accommodations
// @desc    Create an accommodation
// @access  Private (employee only)
router.post("/accommodations", auth, async (req, res) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { title, location, pricePerNight, propertyType } = req.body;

    const newAcc = new Accommodation({
      title,
      location,
      pricePerNight,
      propertyType,
      createdBy: req.user.id,
    });

    const savedAcc = await newAcc.save();
    res.json(savedAcc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
