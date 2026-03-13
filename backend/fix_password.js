const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);
  await User.updateOne({ email: "employee@example.com" }, { password: hashedPassword });
  console.log("Password updated to proper hash.");
  process.exit();
}).catch(console.error);
