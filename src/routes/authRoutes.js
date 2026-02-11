const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateAuth, handleValidationErrors } = require('../middleware/validation');

router.post('/send-otp', validateAuth.sendOTP, handleValidationErrors, authController.sendOTPHandler);
router.post('/verify-otp', validateAuth.verifyOTP, handleValidationErrors, authController.verifyOTPHandler);
router.post('/register', validateAuth.register, handleValidationErrors, authController.registerHandler);
router.post('/login', validateAuth.login, handleValidationErrors, authController.loginHandler);
router.post('/logout', authController.logoutHandler);

module.exports = router;
