const mongoose = require('mongoose');

const socialMediaPlatformSchema = new mongoose.Schema(
    {
        name: { type: String }
    },
    { timestamps: true }
);

const SocialMediaPlatform = mongoose.model('SocialMediaPlatform', socialMediaPlatformSchema);

module.exports = SocialMediaPlatform;
