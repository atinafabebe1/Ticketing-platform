const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
);

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;
