const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketTypes');
const Event = require('../models/event');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get a list of available tickets for an event
// @route   GET api/events/:eventId/tickets
// @access  Public
const getEventTickets = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get details of a specific ticket
// @route   GET api/events/:eventId/tickets/:ticketId
// @access  Public
const getTicketById = asyncHandler(async (req, res, next) => {
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId,
        eventId: req.params.eventId
    });

    if (!ticket) {
        return next(new ErrorResponse(`Ticket not found with id ${req.params.ticketId}`, 404));
    }

    res.json(ticket);
});

// @desc    Create a new ticket for an event
// @route   POST api/events/:eventId/tickets
// @access  Private   - organizer
const createTicket = asyncHandler(async (req, res, next) => {
    const { title, price, quantity } = req.body;

    const event = await Event.findById(req.params.eventId);

    if (!event) {
        return next(new ErrorResponse(`Event not found with id ${req.params.eventId}`, 404));
    }

    const ticket = await Ticket.create({
        title,
        price,
        quantity,
        eventId: req.params.eventId
    });

    res.status(201).json(ticket);
});

// @desc    Update an existing ticket
// @route   PUT api/events/:eventId/tickets/:ticketId
// @access  Private -organizers
const updateTicket = asyncHandler(async (req, res, next) => {
    let ticket = await Ticket.findOne({
        _id: req.params.ticketId,
        eventId: req.params.eventId
    }).populate('eventId', 'organizerId'); // Populate the 'event' field with only the 'organizerId'

    if (!ticket) {
        return next(new ErrorResponse(`Ticket not found with id ${req.params.ticketId}`, 404));
    }

    // Check if the user's id matches the event's organizerId
    if (ticket.eventId.organizerId.toString() !== req.user.id) {
        return next(new ErrorResponse(`You are not authorized to update this ticket`, 403));
    }

    ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {
        new: true,
        runValidators: true
    });
    res.json(ticket);
});

// @desc    Delete a ticket
// @route   DELETE api/events/:eventId/tickets/:ticketId
// @access  Private -organizers
const deleteTicket = asyncHandler(async (req, res, next) => {
    let ticket = await Ticket.findOne({
        _id: req.params.ticketId,
        eventId: req.params.eventId
    }).populate('eventId', 'organizerId'); // Populate the 'event' field with only the 'organizerId'
    if (!ticket) {
        return next(new ErrorResponse(`Ticket not found with id ${req.params.ticketId}`, 404));
    }

    // Check if the user's id matches the event's organizerId
    if (ticket.eventId.organizerId.toString() !== req.user.id) {
        return next(new ErrorResponse(`You are not authorized to delete this ticket`, 403));
    }
    await Ticket.findByIdAndDelete(req.params.ticketId);

    res.json({ message: 'Ticket deleted successfully' });
});

module.exports = {
    getEventTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};
