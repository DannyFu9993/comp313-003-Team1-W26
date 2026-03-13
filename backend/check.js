const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const u = await User.findOne({ email: "employee@example.com" });
  console.log("USER EXISTS:", !!u);
  if (u) {
    console.log("ROLE:", u.role);
    const match = await bcrypt.compare("password123", u.password);
    console.log("PASSWORD MATCH:", match);
  }
  process.exit();
}).catch(console.error);
