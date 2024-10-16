const express = require('express')
const {
    generateOTP,
    verifyOTP,
    login,
    signup
} = require('../Controllers/student_controller');

const router = express.Router();

router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;