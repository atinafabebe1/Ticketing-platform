const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        code: { type: String },
        isUsed: { type: Boolean, default: false }// status enum=["available","reserved","sold"]
    },
    { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
