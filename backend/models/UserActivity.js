const mongoose = require("mongoose");

const recentViewSchema = new mongoose.Schema(
  {
    accommodation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const searchEventSchema = new mongoose.Schema(
  {
    city: { type: String, default: "" },
    guests: { type: Number },
    minBudget: { type: Number },
    maxBudget: { type: Number },
    searchedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const userActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    recentViews: {
      type: [recentViewSchema],
      default: [],
    },
    searchHistory: {
      type: [searchEventSchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserActivity", userActivitySchema);
