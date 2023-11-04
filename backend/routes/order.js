const express = require('express');
const router = express.Router();
const { getAllorders, orderTicket, getUserorders, cancelorder } = require('../controllers/order')
const orderLimiter = require('../middlewares/orderLimiter');
const { auth } = require('../middlewares/auth')
const advancedResults = require('../middlewares/advancedResult')
const Order = require('../models/order')

router.post('/events/:eventId/tickets/:ticketId', auth, orderLimiter, orderTicket);
router.get('/', advancedResults(Order, 'ticketTypeId'), getAllorders);
router.get('/user', auth, advancedResults(Order, "ticketTypeId"), getUserorders);
router.delete('/users/:userId/orders/:orderId', cancelorder);

module.exports = router;
