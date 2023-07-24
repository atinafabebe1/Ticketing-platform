const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema(
    {
        organizationName: { type: String, required: true },
        website: { type: String },
        description: { type: String },
        phoneNumber: { type: String },
        address: {
            city: { type: String },
            state: { type: String },
            country: { type: String },
        },
        socialMedia: {
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String },
        },
        verified: {
            type: Boolean,
            enum: [true, false]
        }
    },
    { _id: false }
);

module.exports = mongoose.model('Organizer', organizerSchema);
