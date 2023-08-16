const express = require('express');
const paymentController = require('../controllers/payment');

const router = express.Router();

router.post('/process-payment', paymentController.processPayment);
router.get('/process-payment', paymentController.getpaymnetprocess);

module.exports = router;
