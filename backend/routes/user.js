const express = require('express');
const { getProfile, updateSubscription } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/subscription', protect, updateSubscription);

module.exports = router;
