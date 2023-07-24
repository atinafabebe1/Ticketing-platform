const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Organizer = require('./organizer');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        phoneNumber: { type: String },
        location: { type: String },
        role: { type: String, enum: ['user', 'organizer'], default: 'user' },
        isVerified: { type: Boolean },
        refreshToken: [String],
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        organizerInfo: {
            type: Organizer.schema,
            required: function () {
                return this.role === 'organizer';
            },
        },
    },
    { timestamps: true }
);


// Encrypt the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 11);
});

//Sign JWT and return
userSchema.methods.getSignedJwtAccessToken = function () {
    return jwt.sign({ id: this._id, userName: this.userName, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Generate Email Verfiication token and return
userSchema.methods.getEmailVerificationToken = function () {
    return jwt.sign({ userId: this._id }, process.env.EMAIL_VERIFICATION_SECRET, {
        expiresIn: process.env.EMAIL_TOKEN_EXPIRE
    });
};

//Sign JWT and return
userSchema.methods.getSignedJwtRefreshToken = function () {
    return jwt.sign({ userName: this.userName, id: this._id }, process.env.REFERESH_JWT_SECRET, {
        expiresIn: process.env.REFRESH_JWT_EXPIRE
    });
};

//Match use entered password to hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    //Set expire
    this.resetPassowrdExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
