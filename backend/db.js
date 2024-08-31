const mongoose = require('mongoose');
require('dotenv').config()
const MONGODB_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

// Connection instance
const db = mongoose.connection;

// Event listeners for the connection
db.on('connected', () => {
  console.log(`Connected to MongoDB Server`);
});

db.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Export the connection
module.exports = db;
