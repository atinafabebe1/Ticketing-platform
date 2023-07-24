const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents
} = require('../controllers/event');
const advancedResult = require("../middlewares/advancedResult");
const EventModel = require('../models/event')

router.get("/", advancedResult(EventModel, ""), getEvents);

router.use(auth); // only authorized user can access below endpoints

router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
