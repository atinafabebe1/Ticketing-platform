const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');
const ticketTypeRouter = require('./routes/ticketType');
const orderRouter = require('./routes/order');

// mount
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter, ticketTypeRouter);
app.use('/api', orderRouter);

module.exports = app;
