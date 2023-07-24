const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
    updatePassword,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/user');

router.use(auth);

router.get('/profile', getUserProfile);
router.put('/profile/:id', updateUserProfile);
router.put('/updatepassword', updatePassword);

module.exports = router;
