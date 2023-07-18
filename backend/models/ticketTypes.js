const mongoose = require('mongoose');

const ticketTypeSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    },
    { timestamps: true }
);

const TicketType = mongoose.model('TicketType', ticketTypeSchema);

module.exports = TicketType;
