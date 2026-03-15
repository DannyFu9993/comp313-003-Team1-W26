const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Accommodation = require("./models/Accommodation");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const existingUser = await User.findOne({ email: "employee@example.com" });
  let employeeUser = existingUser;
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    employeeUser = await User.create({
      username: "employee1",
      email: "employee@example.com",
      password: hashedPassword,
      role: "employee"
    });
    console.log("Employee user created!");
  } else {
    console.log("Employee user already exists.");
  }

  const demoListings = [
    {
      title: "Downtown Studio",
      location: "Toronto",
      pricePerNight: 120,
      propertyType: "Apartment",
      guests: 2,
      status: "active",
      createdBy: employeeUser._id,
    },
    {
      title: "Riverside Family House",
      location: "Ottawa",
      pricePerNight: 180,
      propertyType: "House",
      guests: 5,
      status: "active",
      createdBy: employeeUser._id,
    },
    {
      title: "Mountain View Cabin",
      location: "Banff",
      pricePerNight: 210,
      propertyType: "Cabin",
      guests: 4,
      status: "active",
      createdBy: employeeUser._id,
    },
  ];

  for (const listing of demoListings) {
    await Accommodation.findOneAndUpdate(
      { title: listing.title, createdBy: employeeUser._id },
      { $setOnInsert: listing },
      { upsert: true, new: true },
    );
  }
  console.log("Demo listings ensured for search/admin dashboard.");

  process.exit();
}).catch(console.error);
