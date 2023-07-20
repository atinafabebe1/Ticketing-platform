const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASSWORD
        },
        debug: true // Enable verbose logging
    });

    const obmessage = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    try {
        await transporter.sendMail(obmessage);
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEmail;
