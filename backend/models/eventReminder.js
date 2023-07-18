const mongoose = require('mongoose');

const eventReminderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        reminderType: { type: String, required: true }
    },
    { timestamps: true }
);

const EventReminder = mongoose.model('EventReminder', eventReminderSchema);

module.exports = EventReminder;
