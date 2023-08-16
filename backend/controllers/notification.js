const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/user');
const Ticket = require('../models/ticket');
const EmailService = require('../services/EmailService');
const PushNotificationService = require('../services/PushNotificationService');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Send event reminder to ticket holders
// @route   POST /events/:eventId/reminders
// @access  Private
const sendEventReminder = asyncHandler(async (req, res, next) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);

        if (!event) {
            return next(new ErrorResponse(`Event not found with id ${eventId}`, 404));
        }

        const tickets = await Ticket.find({ event: eventId });

        for (const ticket of tickets) {
            const user = await User.findById(ticket.userId);

            if (user) {
                await EmailService.sendEventReminder(user.email, event);

                await PushNotificationService.sendEventReminder(user.deviceToken, event);
            }
        }

        res.json({ message: 'Event reminders sent successfully' });
    } catch (error) {
        next(new ErrorResponse('Failed to send event reminders', 500));
    }
});

// @desc    Send event updates and notifications to ticket holders
// @route   POST /events/:eventId/notifications
// @access  Private
const sendEventNotifications = asyncHandler(async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { message } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return next(new ErrorResponse(`Event not found with id ${eventId}`, 404));
        }

        const tickets = await Ticket.find({ event: eventId });

        // Send notifications to each ticket holder
        for (const ticket of tickets) {
            const user = await User.findById(ticket.userId);

            if (user) {
                await EmailService.sendNotification(user.email, event, message);

                await PushNotificationService.sendNotification(user.deviceToken, event, message);
            }
        }

        res.json({ message: 'Event notifications sent successfully' });
    } catch (error) {
        next(new ErrorResponse('Failed to send event notifications', 500));
    }
});

module.exports = {
    sendEventReminder,
    sendEventNotifications
};
