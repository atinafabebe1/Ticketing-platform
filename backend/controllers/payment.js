const axios = require('axios');
const Payment = require('../models/payment');
const Order = require('../models/order');
const User = require('../models/user');
const Ticket = require('../models/ticket');
const PaymentOption = require('../models/paymentOption');
const QRCode = require('qrcode');
const cloudinary = require('../utils/cloudinary');
const sendEmail = require('../utils/sendEmail');
const { v4: uuidv4 } = require('uuid');

const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

const processPayment = async (req, res) => {
    const { raw } = req.body;
    const parsedData = JSON.parse(raw);

    const trx_ref = parsedData.tx_ref;

    try {
        const orderInfo = await Order.findById(req.body.orderId);
        const selectedPaymentOption = await PaymentOption.findById(req.body.paymentOptionId);

        const headers = {
            "Authorization": `Bearer CHASECK_TEST-BJWC87iirkhl6OeGNaAuY8C5K3wsxbsb`,
            "Content-Type": "application/json"
        };

        const requestOptions = {
            method: 'POST',
            url: CHAPA_API_URL,
            headers: headers,
            data: raw,
            responseType: 'json'
        };

        const response = await axios(requestOptions);
        const checkoutUrl = response.data.data.checkout_url;

        // Save payment information to the Payment model
        const paymentInfo = new Payment({
            orderId: orderInfo._id,
            paymentOptionId: selectedPaymentOption._id,
            status: 'pending',
            amount: orderInfo.totalAmount,
            trx_ref: trx_ref
        });
        await paymentInfo.save();

        res.json({ checkoutUrl });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'An error occurred while processing payment.' });
    }
};

const getpaymnetprocess = async (req, res) => {
    const { trx_ref, status } = req.query;
    console.log(req.query)
    try {
        if (status === 'success') {
            // Fetch order details based on the transaction reference (trx_ref)
            const paymentInfo = await Payment.findOne({ trx_ref: trx_ref });

            console.log(paymentInfo.orderId)

            const orderInfo = await Order.findOne({ _id: paymentInfo.orderId })

            if (!orderInfo) {
                console.log('order not found')
            }
            if (orderInfo) {
                orderInfo.status = 'paid';
                paymentInfo.status = 'paid';

                await orderInfo.save();

                const ticket = new Ticket({
                    orderId: orderInfo._id,
                    code: uuidv4()
                });
                await ticket.save();

                // Generate QR code
                const qrCodeText = `Ticket Code: ${ticket.code}`;
                const qrCodeDataUrl = await QRCode.toDataURL(qrCodeText);

                // Upload QR code image data to Cloudinary
                const cloudinaryResponse = await cloudinary.uploader.upload(qrCodeDataUrl, {
                    folder: 'qr_codes'
                });

                const emailMessage = `
                    <p>Here is your QR code for the ticket:</p>
                    <img src="${cloudinaryResponse.secure_url}" alt="QR Code">
                `;

                const user = await User.findOne({ _id: orderInfo.userId })
                console.log("user.email")
                console.log(user.email)
                // Send QR code as an image attachment to user's email
                const emailOptions = {
                    email: `${user.email}`,
                    subject: 'Your Ticket QR Code',
                    message: emailMessage
                };

                await sendEmail(emailOptions);

                // Respond to the payment gateway with a success message
                return res.send('Payment successfully processed.');
            }
        }

        // Respond with an appropriate message for unsuccessful payments
        return res.send('Payment processing failed.');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'An error occurred while processing payment.' });
    }
};


module.exports = {
    getpaymnetprocess,
    processPayment
}
