const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    // Additional gallery images
    imageGallery: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Amenities list
    amenities: [
      {
        type: String,
      },
    ],

    // Property details
    guests: {
      type: Number,
      default: 1,
    },

    bedrooms: {
      type: Number,
      default: 1,
    },

    beds: {
      type: Number,
      default: 1,
    },

    bathrooms: {
      type: Number,
      default: 1,
    },

    // Pricing breakdown
    cleaningFee: {
      type: Number,
      default: 0,
    },

    serviceFee: {
      type: Number,
      default: 0,
    },

    taxes: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    // Booking info
    checkIn: {
      type: String,
      default: "3:00 PM",
    },

    checkOut: {
      type: String,
      default: "11:00 AM",
    },

    cancellationPolicy: {
      type: String,
      default: "Free cancellation within 24 hours",
    },

    // Optional external booking link
    externalUrl: {
      type: String,
      default: "",
    },

    // Status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Accommodation", accommodationSchema);
