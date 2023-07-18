const mongoose = require('mongoose');

const seatMapSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        mapData: { type: Object }
    },
    { timestamps: true }
);

const SeatMap = mongoose.model('SeatMap', seatMapSchema);

module.exports = SeatMap;
