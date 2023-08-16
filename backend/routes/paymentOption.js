const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlewares/auth');
const {
    createPaymentOption,
    updatePaymentOption,
    deletePaymentOption,
    getPaymentOptions
} = require('../controllers/paymentOption.js');
const advancedResult = require("../middlewares/advancedResult");
const PaymentOptionModel = require('../models/paymentOption')

router.get("/", advancedResult(PaymentOptionModel, ""), getPaymentOptions);

// router.use(auth); // only authorized organizers can access below endpoints

router.post('/', createPaymentOption);
router.put('/:id', updatePaymentOption);
router.delete('/:id', deletePaymentOption);

module.exports = router;
