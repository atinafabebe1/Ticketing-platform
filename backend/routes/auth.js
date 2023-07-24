const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { registerUser, verifyUser, loginUser, logoutUser, forgotPassword, resetPassword, refresh } = require('../controllers/auth');

router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.get('/logout', auth, logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);
router.get('/refresh', auth, refresh);

module.exports = router;
