const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        paymentOptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentOption', required: true },
        status: { type: String, required: true },//enum =["paid"]
        amount: { type: Number, required: true }
    },
    { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
