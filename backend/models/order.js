const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        ticketTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType', required: true },
        quantity: { type: Number, required: true },
        status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
        totalAmount: { type: Number },
        expiredAt: { type: Date },
        trx_ref: { type: String },
        paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
