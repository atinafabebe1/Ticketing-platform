const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        ticketTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType', required: true },
        salesCount: { type: Number },
        revenue: { type: Number }
    },
    { timestamps: true }
);

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
