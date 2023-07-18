const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date },
        time: { type: String },
        venue: { type: String }
    },
    { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;