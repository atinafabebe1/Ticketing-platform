const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlewares/auth');
const {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents
} = require('../controllers/event');
const advancedResult = require("../middlewares/advancedResult");
const EventModel = require('../models/event')

router.get("/", advancedResult(EventModel, ""), getEvents);

router.use(auth); // only authorized organizers can access below endpoints

router.post('/', authorize('organizer'), createEvent);
router.put('/:id', authorize('organizer'), updateEvent);
router.delete('/:id', authorize('organizer'), deleteEvent);

module.exports = router;
