const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail.js')
const sendVerificationEmail = require('../utils/sendVerificationEmail')

// POST api/users/register
const registerUser = asyncHandler(async (req, res, next) => {
    if (!validator.isStrongPassword(req.body.password)) {
        return next(new ErrorResponse('Weak Password', 400));
    }

    const duplicate = await User.findOne({ userName: req.body.userName });

    if (duplicate) {
        return next(new ErrorResponse('Duplicate User', 409));
    }

    const user = await User.create(req.body);

    // Generate a verification token for the user
    const verificationToken = jwt.sign({ userId: user._id }, process.env.EMAIL_VERIFICATION_SECRET, {
        expiresIn: '1d' // Set the token to expire in 1 day
    });

    // Send the verification email
    try {
        await sendVerificationEmail(user.email, verificationToken);
    } catch (error) {
        // Handle any error that occurs while sending the verification email
        // For example, you can delete the user and respond with an error message
        await User.findByIdAndDelete(user._id);
        return next(new ErrorResponse('Error sending verification email', 500));
    }

    // Create JWTs
    const accessToken = user.getSignedJwtAccessToken();
    const refreshToken = user.getSignedJwtRefreshToken();

    // Save refreshToken with the current user
    user.refreshToken = refreshToken;
    await user.save();

    // Create a secure cookie with the refreshToken
    res.cookie('token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1 * 60 * 60 * 1000 // set maxAge to 1 hour
    });
    res.status(201).json({ message: 'Successfully Registered. Verification email sent.', accessToken });
});


const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.params.token;
    try {
        // Verify the token using the email verification secret
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        const userId = decoded.userId;

        // Find the user with the provided userId
        const user = await User.findById(userId);

        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        // Mark the user as verified and save changes to the database
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
        return next(new ErrorResponse('Invalid or expired verification token', 400));
    }
});

// POST /users/login
const loginUser = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    if (user.isVerified !== true) {
        return next(new ErrorResponse('Please Verify Your Account', 401));
    }

    //check if password matches
    const match = await user.matchPassword(password);

    if (match) {
        // create JWTs
        const accessToken = user.getSignedJwtAccessToken();
        const newRefreshToken = user.getSignedJwtRefreshToken();

        let newRefreshTokenArray = !cookies?.token ? user.refreshToken : user.refreshToken.filter((rt) => rt !== cookies.token);

        if (cookies?.token) {
            const refreshToken = cookies.token;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('token', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false
            });
        }

        // Saving refreshToken with current user
        user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie('token', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 5 * 60 * 60 * 1000 // set maxAge to 5 hours
        });

        // Send authorization roles and access token to user
        res.json({ message: 'Successfully Logged In', accessToken });
    } else {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
});

// GET /users/profile
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

// PUT /users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
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

const resetPassword = asyncHandler(async (req, res, next) => {
    const resetToken = req.params.resetToken;
    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid or expired reset token', 400));
    }

    if (!validator.isStrongPassword(req.body.newPassword)) {
        return res.status(400).json({ error: 'Weak password' });
    }

    const hashedPassword = await bcrpyt.hash(req.body.newPassword, 11);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Send response or perform any additional actions
    res.status(200).json({ message: 'Password reset successfully' });
});

// POST /users/logout
const logoutUser = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(204);
    //No content
    const refreshToken = cookies.token;

    // Is refreshToken in db?
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
    await user.save();

    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
    res.sendStatus(204);
});

const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse(`There is no user with ${req.body.email}`, 404));
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset url

    const resetUrl = `${req.protocol}://${req.get('host')}/api/user/resetpassword/${resetToken}`;

    const message = `<p>You are receiving this email because you have requested a password reset.</p>
      <p>Please click the following link or copy and paste it into your browser to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you did not request this reset, you can safely ignore this email.</p>`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });
        res.status(200).json({ data: 'Email Sent' });
    } catch (error) {
        user.resetPassowrdExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse(`Email could not be send`, 500));
    }
});

const updatePassword = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user.id).select('+password');
    console.log(req.body);
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

const refresh = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(401);
    const refreshToken = cookies.token;
    console.log(refreshToken);
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
    console.log('after cookie cleared ' + req.cookies?.token);
    const foundUser = await User.findOne({ refreshToken });

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(refreshToken, process.env.REFERESH_JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Forbidden' });
            console.log('attempted refresh token reuse!');
            const hackedUser = await User.findOne({
                userName: decoded.userName
            }).exec();
            hackedUser.refreshToken = [];
            await hackedUser.save();
            console.log(hackedUser);
        });
        return res.sendStatus(403);
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);

    // Verify jwt
    jwt.verify(refreshToken, process.env.REFERESH_JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log('expired refresh token');
            foundUser.refreshToken = [...newRefreshTokenArray];
            await foundUser.save();
            return res.sendStatus(403);
        }
        console.log(foundUser);
        console.log(decoded);

        if (foundUser.userName !== decoded.userName) {
            return res.sendStatus(403);
        }

        // Refresh token is still valid
        const accessToken = foundUser.getSignedJwtAccessToken();

        const newRefreshToken = foundUser.getSignedJwtRefreshToken();
        // Saving refreshToken with the current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Create a secure cookie with the new refresh token
        res.cookie('token', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    });
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
    refresh,
    verifyUser,
    updatePassword,
    forgotPassword,
    resetPassword,
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser
};
