const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "employee"],
      default: "customer",
    },
    preferredDestination: {
  type: String,
  default: "",
},
budgetRange: {
  type: String,
  default: "",
},
favoriteStayType: {
  type: String,
  default: "",
},
travelStyle: {
  type: String,
  default: "",
},
bio: {
  type: String,
  default: "",
},
profileImage: {
  type: String,
  default: "",
},
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accommodation",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
