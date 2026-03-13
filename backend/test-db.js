require("dotenv").config({path: "../backend/.env"});
const mongoose = require("mongoose");
const User = require("../backend/models/User");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const users = await User.find().select("username email role");
  console.log(users);
  process.exit(0);
}).catch(console.error);
