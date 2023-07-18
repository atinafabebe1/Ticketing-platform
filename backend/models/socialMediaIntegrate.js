const mongoose = require('mongoose');

const socialMediaIntegrationSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        platformId: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMediaPlatform', required: true },
        shareLink: { type: String }
    },
    { timestamps: true }
);

const SocialMediaIntegration = mongoose.model('SocialMediaIntegration', socialMediaIntegrationSchema);

module.exports = SocialMediaIntegration;
