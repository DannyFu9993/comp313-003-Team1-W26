const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const optionalAuth = require("../middleware/optionalAuth");
const auth = require("../middleware/auth");
const User = require("../models/User");
const {
  getGuestRecommendations,
  getPersonalizedRecommendations,
  getSimilarListings,
  recordView,
  recordSearch,
  parseLimit,
} = require("../services/recommendationService");

router.get("/similar/:id", optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseLimit(req.query.limit, 6);

    const result = await getSimilarListings(id, { limit });
    if (result.error === "invalid_id") {
      return res.status(400).json({ success: false, message: "Invalid accommodation id" });
    }
    if (result.error === "not_found") {
      return res.status(404).json({ success: false, message: "Accommodation not found" });
    }

    res.json({
      success: true,
      data: result.items,
      meta: {
        engine: "weighted-similarity",
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", optionalAuth, async (req, res) => {
  try {
    const limit = parseLimit(req.query.limit, 8);
    const city = req.query.city;
    const guests = req.query.guests;
    const minBudget = req.query.minBudget;
    const maxBudget = req.query.maxBudget;

    const personalized = Boolean(req.user && req.user.id);

    const data = personalized
      ? await getPersonalizedRecommendations(req.user.id, { limit })
      : await getGuestRecommendations({
          city,
          guests,
          minBudget,
          maxBudget,
          limit,
        });

    res.json({
      success: true,
      data,
      meta: {
        personalized,
        engine: "weighted-personalization",
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/track-view", optionalAuth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.json({ success: true, saved: false });
    }

    const accommodationId = req.body?.accommodationId || req.body?.id;
    if (!accommodationId || !mongoose.Types.ObjectId.isValid(String(accommodationId))) {
      return res.status(400).json({ success: false, message: "Invalid accommodation id" });
    }

    await recordView(req.user.id, String(accommodationId));
    res.json({ success: true, saved: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/track-search", optionalAuth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.json({ success: true, saved: false });
    }

    await recordSearch(req.user.id, req.body || {});
    res.json({ success: true, saved: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/favorite/:id", auth, async (req, res) => {
  try {
    const accommodationId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(String(accommodationId))) {
      return res.status(400).json({ success: false, message: "Invalid accommodation id" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const idStr = String(accommodationId);
    if (!user.favourites.map(String).includes(idStr)) {
      user.favourites.push(accommodationId);
      await user.save();
    }

    res.json({ success: true, favourites: user.favourites });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
