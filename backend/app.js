const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

const allowedOrigins = ['http://localhost:5173', "https://checkout.chapa.co", "https://jazzy-selkie-121fe9.netlify.app"];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
const paymentOptionRouter = require('./routes/paymentOption');
const paymentRouter = require('./routes/payment');

// mount
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);
app.use('/api/event', ticketTypeRouter);
app.use('/api/orders', orderRouter);
app.use('/api/paymentOption', paymentOptionRouter);
app.use('/api/payment', paymentRouter);

module.exports = app;
