const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// @route   GET /api/user/favourites
// @desc    Get the current user's favourite accommodations (populated)
// @access  Private
router.get("/favourites", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favourites");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.favourites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/user/favourites/:id
// @desc    Add an accommodation to favourites
// @access  Private
router.post("/favourites/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const accommodationId = req.params.id;
    if (!user.favourites.map(String).includes(accommodationId)) {
      user.favourites.push(accommodationId);
      await user.save();
    }

    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/user/favourites/:id
// @desc    Remove an accommodation from favourites
// @access  Private
router.delete("/favourites/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.favourites = user.favourites.filter(
      (fav) => fav.toString() !== req.params.id,
    );
    await user.save();

    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
