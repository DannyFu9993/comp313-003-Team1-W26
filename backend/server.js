const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/accommodations', require('./routes/accommodations'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/user', require('./routes/user'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/contact', require('./routes/contact'));

// Production: Serve static files from frontend build
// This allows the backend to serve the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // Catch-all: serve index.html for any route not handled by API
  // This enables React Router to work properly
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});