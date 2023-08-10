const asyncHandler = require('express-async-handler')
const Event = require('../models/event');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

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
    const result = await cloudinary.uploader.upload(req.file.path);


    const event = await Event.create({
        organizerId: req.user.id,
        title,
        description,
        date,
        venue,
        time,
        genre,
        location,
        image: result.secure_url,
        cloudinary_id: result.public_id,
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
        return next(new ErrorResponse(`Your are not authorized to update this event`, 403));
    }
    let result;
    if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
        title: req.body.title || event.title,
        description: req.body.description || event.description,
        date: req.body.date || event.date,
        time: req.body.time || event.time,
        location: req.body.location || event.location,
        genre: req.body.genre || event.genre,
        image: req.body.image || event.image,
        venue: req.body.venue || event.venue,
        image: result?.secure_url || event.image,
        cloudinary_id: result?.public_id || event.cloudinary_id,
    };
    event = await Event.findByIdAndUpdate(req.params.id, data, {
        new: true,
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
        return next(new ErrorResponse(`Your are not authorized to delete this event`, 403));
    }

    await Event.findByIdAndDelete(req.params.id)
    await cloudinary.uploader.destroy(user.cloudinary_id);

    res.json({ message: 'Event deleted successfully' });
});

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
