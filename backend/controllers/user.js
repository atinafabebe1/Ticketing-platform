const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const validator = require('validator')

// GET api/user/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // Fetch user profile from the database
    const user = await User.findById(userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// PUT api/user/profile:id
const updateUserProfile = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse(`User not found with ${req.params.id}`, 404));
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(user);
});

// PUT api/user/updatepassword
const updatePassword = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user.id).select('+password');
    //Check current password
    const match = await user.matchPassword(req.body.currentPassword);

    if (!match) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }
    if (!validator.isStrongPassword(req.body.newPassword)) {
        return res.status(400).json({ error: 'weak Password' });
    }

    user = await User.findByIdAndUpdate(req.user.id, {
        password: req.body.newPassword
    }, { new: true });

    sendTokenResponse(user, 200, res);
});

//Get token from model,create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
    //Create token
    const accesstoken = user.getSignedJwtAccessToken();
    const refereshtoken = user.getSignedJwtRefreshToken();
    user.refreshToken = refereshtoken;
    await user.save();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 1 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    };

    res.status(statusCode).cookie('token', refereshtoken, options).json({ data: accesstoken });
};

module.exports = {
    updatePassword,
    getUserProfile,
    updateUserProfile,
};
