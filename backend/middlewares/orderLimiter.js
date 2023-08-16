const rateLimit = require("express-rate-limit");

const orderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    messsage: {
        messsage:
            "Too many attempts in one hour",
    },
    handler: (req, res, next, options) => {
        res.status(401).send(options.messsage);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = orderLimiter;
