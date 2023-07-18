const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json());

// Routes
// Add your routes here

module.exports = app;
