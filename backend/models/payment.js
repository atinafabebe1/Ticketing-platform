const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        paymentOptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentOption', required: true },
        status: { type: String, required: true },
        amount: { type: Number, required: true },
        trx_ref: { type: String }
    },
    { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
