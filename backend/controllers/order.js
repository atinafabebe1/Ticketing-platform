const asyncHandler = require('express-async-handler')
const Order = require('../models/order');
const User = require('../models/user');
const Ticket = require('../models/ticket');
const TicketType = require('../models/ticketTypes');
const ErrorResponse = require('../utils/errorResponse');

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// @desc    Order a ticket for a user
// @route   POST api/events/:eventId/tickets/:ticketId/order
// @access  Private
const orderTicket = asyncHandler(async (req, res, next) => {
    const { ticketId } = req.params
    const { quantity } = req.body;
    if (!quantity) {
        return next(new ErrorResponse('Quantity is required', 401));
    }
    // Check if the ticket is available
    const ticket = await TicketType.findById(ticketId);

    if (!ticket) {
        return next(new ErrorResponse('Ticket not found', 404));
    }

    if (!ticket.isAvailable(quantity)) {
        return next(new ErrorResponse('Not enough tickets available', 404));
    }
    console.log(ticket.price)
    const totalAmount = quantity * ticket.price;

    // Make sure ticket is not already reserved
    const existingOrders = await Order.find({
        ticketTypeId: ticketId,
        status: { $in: ["pending", "paid"] },
        expiredAt: { $gt: new Date() },
    });

    const reservedQuantity = existingOrders.reduce((total, order) => total + order.quantity, 0);
    const availableQuantity = ticket.quantity - reservedQuantity;

    if (quantity > availableQuantity) {
        return next(new ErrorResponse('Not enough tickets available', 400));
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = await Order.create({
        userId: req.user._id,
        ticketTypeId: ticketId,
        quantity: quantity,
        totalAmount: totalAmount,
        expiredAt: expiration,
    });

    res.status(201).json({ order });

});

// @desc    Get a list of orderings for a user
// @route   GET api/users/:userId/order
// @access  Private
const getUserorders = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    const orderings = await Order.find({ user: req.params.userId });
    res.json(orderings);

});

// @desc    Cancel a ordering
// @route   DELETE /users/:userId/orderings/:orderId
// @access  Private
const cancelorder = asyncHandler(async (req, res, next) => {
    const ordering = await Order.findOneAndDelete({
        _id: req.params.orderingId,
        user: req.params.userId,
    });

    if (!ordering) {
        return next(new ErrorResponse('Ordering not found', 404));
    }

    //other logics

    res.json({ message: 'Ordering canceled successfully' });

});

module.exports = {
    orderTicket,
    getUserorders,
    cancelorder
};
