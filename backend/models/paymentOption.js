const mongoose = require('mongoose');

const paymentOptionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        gateway: { type: String }
    },
    { timestamps: true }
);

const PaymentOption = mongoose.model('PaymentOption', paymentOptionSchema);

module.exports = PaymentOption;
