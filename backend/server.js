const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const accommodationRoutes = require("./routes/accommodations");
const userRoutes = require("./routes/user");
const recommendationRoutes = require("./routes/recommendations");
const contactRoutes = require("./routes/contact");


app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recommendations", recommendationRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
