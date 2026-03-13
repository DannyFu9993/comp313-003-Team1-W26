const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const existingUser = await User.findOne({ email: "employee@example.com" });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    await User.create({
      username: "employee1",
      email: "employee@example.com",
      password: hashedPassword,
      role: "employee"
    });
    console.log("Employee user created!");
  } else {
    console.log("Employee user already exists.");
  }
  process.exit();
}).catch(console.error);
