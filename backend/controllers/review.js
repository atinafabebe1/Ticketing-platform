const asyncHandler = require('../middlewares/asyncHandler');
const Review = require('../models/review');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a review for an event
// @route   POST /events/:eventId/reviews
// @access  Private
const createEventReview = asyncHandler(async (req, res, next) => {
});

// @desc    Get reviews for an event
// @route   GET /events/:eventId/reviews
// @access  Public
const getEventReviews = asyncHandler(async (req, res, next) => {
});

// @desc    Delete a review
// @route   DELETE /events/:eventId/reviews/:reviewId
// @access  Private
const deleteEventReview = asyncHandler(async (req, res, next) => {
});

module.exports = {
    createEventReview,
    getEventReviews,
    deleteEventReview
};
