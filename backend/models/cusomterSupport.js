const mongoose = require('mongoose');

const customerSupportTicketSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        subject: { type: String },
        description: { type: String },
        status: { type: String }
    },
    { timestamps: true }
);

const CustomerSupportTicket = mongoose.model('CustomerSupportTicket', customerSupportTicketSchema);

module.exports = CustomerSupportTicket;
