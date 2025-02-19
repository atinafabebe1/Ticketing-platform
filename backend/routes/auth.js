const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { registerUser, verifyUser, loginUser, logoutUser, forgotPassword, resetPassword, refresh } = require('../controllers/auth');
const loginLimiter = require('../middlewares/loginLimiter');

router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginLimiter, loginUser);
router.get('/logout', auth, logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);
router.get('/refresh', refresh);

module.exports = router;
