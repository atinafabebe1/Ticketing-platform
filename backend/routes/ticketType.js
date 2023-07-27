const express = require('express');
const router = express.Router();

const { auth, authorize } = require('../middlewares/auth');
const { getEventTickets, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketType');
const advancedResult = require("../middlewares/advancedResult");
const TicketTypeModel = require('../models/ticketTypes')

router.get("/:eventId/tickets", advancedResult(TicketTypeModel, ""), getEventTickets);

router.use(auth);

router.post('/:eventId/tickets', authorize('organizer'), createTicket);
router.put('/:eventId/tickets/:ticketId', authorize('organizer'), updateTicket);
router.delete('/:eventId/tickets/:ticketId', authorize('organizer'), deleteTicket);

module.exports = router;
