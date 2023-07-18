const mongoose = require('mongoose');

const eventManagementIntegrationSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        toolId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventManagementTool', required: true },
        apiKey: { type: String }
    },
    { timestamps: true }
);

const EventManagementIntegration = mongoose.model('EventManagementIntegration', eventManagementIntegrationSchema);

module.exports = EventManagementIntegration;
