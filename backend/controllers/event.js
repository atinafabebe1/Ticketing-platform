const asyncHandler = require('express-async-handler')
const Event = require('../models/event');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get a list of all events
// @route   GET api/events
// @access  Public
const getEvents = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Create a new event
// @route   POST /api/event
// @access  Private
const createEvent = asyncHandler(async (req, res, next) => {
    const { title, description, date, venue, time, image, genre, location } = req.body;
    const event = await Event.create({
        organizerId: req.user.id,
        title,
        description,
        date,
        venue,
        time,
        genre,
        image,
        location
    });
    res.status(201).json(event);
});

// @desc    Update an existing event
// @route   PUT api/event/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorResponse(`Event not found with id ${req.params.eventId}`, 404));
    }

    if (event.organizerId.toString() !== req.user.id) {
        return next(new ErrorResponse(`Your are not authorized to update this event`, 404));
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.json(event);
});

// @desc    Delete an event
// @route   DELETE /events/:eventId
// @access  Private
const deleteEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorResponse(`Event not found with id ${req.params.eventId}`, 404));
    }

    if (event.organizerId.toString() !== req.user.id) {
        return next(new ErrorResponse(`Your are not authorized to delete this event`, 404));
    }

    await Event.findByIdAndDelete(req.params.id)

    res.json({ message: 'Event deleted successfully' });
});

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
