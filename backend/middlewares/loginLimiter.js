const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    messsage: {
        messsage:
            "Too many login attempts from this ip, Please try again after 5 mintues",
    },
    handler: (req, res, next, options) => {
        res.status(401).send(options.messsage);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;
