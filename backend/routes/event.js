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
const upload = require('../utils/multer')

router.get("/", advancedResult(EventModel, ""), getEvents);

router.use(auth); // only authorized organizers can access below endpoints

router.post('/', upload.single("image"), createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
