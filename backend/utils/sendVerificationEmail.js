const sendEmail = require('./sendEmail');

const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    const message = `<p>Thank you for registering!</p>
    <p>Please click the following link or copy and paste it into your browser to verify your account:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
    <p>If you did not register, you can safely ignore this email.</p>`;

    try {
        await sendEmail({
            email: email,
            subject: 'Account Verification',
            message
        });
    } catch (error) {
        throw new Error('Error sending verification email');
    }
};

module.exports = sendVerificationEmail;
