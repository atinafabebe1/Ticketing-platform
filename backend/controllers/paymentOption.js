const PaymentOptionModel = require('../models/paymentOption');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler')

// @desc      Get all payment options
// @route     GET /api/payment-options
// @access    Public
const getPaymentOptions = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Create a new payment option
// @route     POST /api/payment-options
// @access    Private (only authorized organizers)
const createPaymentOption = asyncHandler(async (req, res, next) => {
    const paymentOption = await PaymentOptionModel.create(req.body);
    res.status(201).json({
        success: true,
        data: paymentOption
    });
});

// @desc      Update a payment option
// @route     PUT /api/payment-options/:id
// @access    Private (only authorized organizers)
const updatePaymentOption = asyncHandler(async (req, res, next) => {
    let paymentOption = await PaymentOptionModel.findById(req.params.id);

    if (!paymentOption) {
        return next(new ErrorResponse('Payment option not found', 404));
    }

    paymentOption = await PaymentOptionModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        data: paymentOption
    });
});

// @desc      Delete a payment option
// @route     DELETE /api/payment-options/:id
// @access    Private (only authorized organizers)
const deletePaymentOption = asyncHandler(async (req, res, next) => {
    const paymentOption = await PaymentOptionModel.findById(req.params.id);

    if (!paymentOption) {
        return next(new ErrorResponse('Payment option not found', 404));
    }

    await paymentOption.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});


module.exports = {
    createPaymentOption,
    getPaymentOptions,
    updatePaymentOption,
    deletePaymentOption
}
