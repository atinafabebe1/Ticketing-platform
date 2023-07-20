require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Load environment variables from .env file

// Middleware
app.use(express.json());

// Routes
const userRouter = require('./routes/user');
const CookieParser = require('cookieparser');
// mount
app.use('/api/user', userRouter);

module.exports = app;
