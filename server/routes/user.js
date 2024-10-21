const express = require('express')
const {
    generateOTP,
    verifyOTP,
    login,
} = require('../Controllers/student_controller');

const router = express.Router();

router.post('/signup', generateOTP);
router.post('/verifyotp', verifyOTP);
router.post('/login', login);

module.exports = router;