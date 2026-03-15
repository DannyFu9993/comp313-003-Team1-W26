const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Accommodation = require("../models/Accommodation");
const auth = require("../middleware/auth");

const hasDashboardAccess = (role = "") => {
  const normalizedRole = String(role).toLowerCase();
  return normalizedRole === "employee" || normalizedRole === "admin";
};

// @route   GET api/employee/users
// @desc    Get all users
// @access  Private (employee only)
router.get("/users", auth, async (req, res) => {
  try {
    if (!hasDashboardAccess(req.user.role)) {
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
    if (!hasDashboardAccess(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    const query =
      String(req.user.role).toLowerCase() === "admin"
        ? {}
        : { createdBy: req.user.id };

    const accommodations = await Accommodation.find(query).sort({ createdAt: -1 });
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
    if (!hasDashboardAccess(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { title, location, pricePerNight, propertyType, guests } = req.body;

    const newAcc = new Accommodation({
      title,
      location,
      pricePerNight,
      propertyType,
      guests,
      createdBy: req.user.id,
    });

    const savedAcc = await newAcc.save();
    res.json(savedAcc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/employee/accommodations/:id
// @desc    Update an accommodation
// @access  Private (employee/admin)
router.put("/accommodations/:id", auth, async (req, res) => {
  try {
    if (!hasDashboardAccess(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { title, location, pricePerNight, propertyType, guests } = req.body;
    const query =
      String(req.user.role).toLowerCase() === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, createdBy: req.user.id };

    const accommodation = await Accommodation.findOne(query);
    if (!accommodation) {
      return res.status(404).json({ msg: "Accommodation not found" });
    }

    if (title !== undefined) accommodation.title = title;
    if (location !== undefined) accommodation.location = location;
    if (pricePerNight !== undefined) accommodation.pricePerNight = pricePerNight;
    if (propertyType !== undefined) accommodation.propertyType = propertyType;
    if (guests !== undefined) accommodation.guests = guests;

    const updated = await accommodation.save();
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PATCH api/employee/accommodations/:id/deactivate
// @desc    Deactivate an accommodation
// @access  Private (employee/admin)
router.patch("/accommodations/:id/deactivate", auth, async (req, res) => {
  try {
    if (!hasDashboardAccess(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const query =
      String(req.user.role).toLowerCase() === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, createdBy: req.user.id };

    const updated = await Accommodation.findOneAndUpdate(
      query,
      { status: "inactive" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Accommodation not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
