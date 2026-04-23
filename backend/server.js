const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (removed deprecated options)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes - these must come BEFORE static file serving
app.use('/api/auth', require('./routes/auth'));
app.use('/api/accommodations', require('./routes/accommodations'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/user', require('./routes/user'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/contact', require('./routes/contact'));

// Serve static files from frontend build
const frontendPath = path.join(__dirname, '../frontend/dist');
console.log('Serving static files from:', frontendPath);
app.use(express.static(frontendPath));

// Catch-all route: serve index.html for any route not handled by API
// Using regex pattern for Express 5 compatibility
app.use((req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  res.sendFile(indexPath);
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});