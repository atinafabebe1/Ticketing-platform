const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail.js');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const crypto = require('crypto');

// POST api/users/register
const registerUser = asyncHandler(async (req, res, next) => {
    const { userName, password, email, role } = req.body;

    if (
        !validator.isStrongPassword(password, {
            minSymbols: 0,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 0
        })
    ) {
        return next(new ErrorResponse('Weak Password', 400));
    }
    if (!validator.isEmail(email)) {
        return next(new ErrorResponse('Invalid Email', 400));
    }

    const duplicateUsername = await User.findOne({ userName: userName });
    const duplicateEmail = await User.findOne({ email: email });

    if (duplicateUsername) {
        const usernameError = new ErrorResponse('The chosen username is already in use. Please select a different username.', 409);
        return next(usernameError);
    }

    if (duplicateEmail) {
        const emailError = new ErrorResponse('The provided email address is associated with an existing account. Please use a different email.', 409);
        return next(emailError);
    }

    let user;
    console.log(req.body)
    // Add additional validation specific to organizers
    if (role === 'organizer') {
        const { website, address, organizationName } = req.body;

        // Perform validation for the organizer-specific fields
        if (!organizationName || !address) {
            return next(new ErrorResponse('Missing required organizer fields', 400));
        }

        user = await User.create({
            ...req.body,
            'organizerInfo.organizationName': organizationName,
            'organizerInfo.website': website,
            'organizerInfo.address': address,
        });
    } else {
        user = await User.create(req.body);
    }

    // Generate a verification token for the user
    const verificationToken = user.getEmailVerificationToken();

    // Send the verification email
    try {
        await sendVerificationEmail(user.email, verificationToken);
    } catch (error) {
        await User.findByIdAndDelete(user._id);
        return next(new ErrorResponse('Error while sending verification email, please try again', 500));
    }

    res.status(201).json({
        message: 'You have successfully registered! A verification email has been sent to your email address. Please check your inbox and spam folder.'
    });
});

// GET api/auth/verify
const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.params.token;

    // Verify the token using the email verification secret
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    const userId = decoded.userId;

    // Find the user with the provided userId
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    try {
        // Mark the user as verified and save changes to the database
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
        await User.findByIdAndDelete(user._id);
        return next(new ErrorResponse('Invalid or expired verification token', 400));
    }
});

// POST api/auth/login
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
            secure: true,
            sameSite: 'lax',
            maxAge: 10 * 60 * 60 * 1000 // set maxAge to 10 hours
        });

        // Send authorization roles and access token to user
        res.json({ message: 'Successfully Logged In', accessToken });
    } else {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
});

// PUT api/auth/resetpassword/:resetToken
const resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.body.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken
        // resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid or expired reset token', 400));
    }

    if (!validator.isStrongPassword(req.body.newPassword, { minSymbols: 0 })) {
        return next(new ErrorResponse('Weak Password', 400));
    }
    user.password = req.body.newPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Send response or perform any additional actions
    res.status(200).json({ message: 'Password reset successfully' });
});

// GET api/auth/logout
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

// POST api/auth/forgotpassword
const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse(`There is no user with ${req.body.email}`, 404));
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset url

    const message = `<p>You are receiving this email because you have requested a password reset.</p>
      <p>Please click the following link or copy and paste it into your browser to reset your password:</p>
      <p>${resetToken}</p>
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

//GET api/auth/refresh
const refresh = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(401);
    const refreshToken = cookies.token;
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
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
            foundUser.refreshToken = [...newRefreshTokenArray];
            await foundUser.save();
            return res.sendStatus(403);
        }


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

module.exports = {
    refresh,
    verifyUser,
    forgotPassword,
    resetPassword,
    registerUser,
    loginUser,
    logoutUser
};
