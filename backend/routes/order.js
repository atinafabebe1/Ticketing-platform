const express = require('express');
const router = express.Router();
const { orderTicket, getUserorders, cancelorder } = require('../controllers/order')
const orderLimiter = require('../middlewares/orderLimiter');
const { auth } = require('../middlewares/auth')

router.post('/events/:eventId/tickets/:ticketId', auth, orderLimiter, orderTicket);
router.get('/users/:userId/order', getUserorders);
router.delete('/users/:userId/orders/:orderId', cancelorder);

module.exports = router;
