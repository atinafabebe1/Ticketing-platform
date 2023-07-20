const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
    refresh,
    updatePassword,
    forgotPassword,
    resetPassword,
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    verifyUser
} = require('../controllers/user');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.get('/verify/:token', verifyUser);

// Protected Routes
router.use(auth); // authentication for the route below

router.get('/profile', getUserProfile);
router.put('/profile/:id', updateUserProfile);
router.put('/updatepassword', updatePassword);
router.get('/refresh', refresh);
router.get('/logout', logoutUser);

module.exports = router;
