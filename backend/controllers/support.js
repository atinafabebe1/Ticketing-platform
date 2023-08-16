const asyncHandler = require('../middlewares/asyncHandler');
const SupportTicket = require('../models/SupportTicket');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a new support ticket
// @route   POST /support/tickets
// @access  Private
const createSupportTicket = asyncHandler(async (req, res, next) => {
});

// @desc    Get details of a support ticket
// @route   GET /support/tickets/:ticketId
// @access  Private
const getSupportTicketById = asyncHandler(async (req, res, next) => {
});

// @desc    Update a support ticket
// @route   PUT /support/tickets/:ticketId
// @access  Private
const updateSupportTicket = asyncHandler(async (req, res, next) => {
});

// @desc    Get a list of support tickets
// @route   GET /support/tickets
// @access  Private
const getSupportTickets = asyncHandler(async (req, res, next) => {
});

module.exports = {
    createSupportTicket,
    getSupportTicketById,
    updateSupportTicket,
    getSupportTickets
};
