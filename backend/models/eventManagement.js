const mongoose = require('mongoose');

const eventManagementToolSchema = new mongoose.Schema(
    {
        name: { type: String },
        description: { type: String }
    },
    { timestamps: true }
);

const EventManagementTool = mongoose.model('EventManagementTool', eventManagementToolSchema);

module.exports = EventManagementTool;
