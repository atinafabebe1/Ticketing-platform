const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());


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
