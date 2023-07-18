const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true }
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
