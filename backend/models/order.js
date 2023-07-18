const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        ticketTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType', required: true },
        quantity: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
