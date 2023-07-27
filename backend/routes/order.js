const express = require('express');
const router = express.Router();
const { orderTicket, getUserorders, cancelorder } = require('../controllers/order')
const orderLimiter = require('../middlewares/orderLimiter');

router.post('/events/:eventId/tickets/:ticketId/order', orderLimiter, orderTicket);
router.get('/users/:userId/order', getUserorders);
router.delete('/users/:userId/orders/:orderId', cancelorder);

module.exports = router;
