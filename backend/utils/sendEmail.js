const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASSWORD
        },
        debug: true
    });

    const message = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    try {
        await transporter.sendMail(message);
    } catch (error) {
        throw console.error();
    }
};

module.exports = sendEmail;
