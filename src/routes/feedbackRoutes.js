const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { validateFeedback, handleValidationErrors } = require('../middleware/validation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// User routes
router.post('/', authMiddleware, validateFeedback.submit, handleValidationErrors, feedbackController.submitFeedback);
router.get('/my-feedback', authMiddleware, feedbackController.getMyFeedback);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, feedbackController.getAllFeedback);
router.put('/:feedbackId/respond', authMiddleware, adminMiddleware, feedbackController.respondToFeedback);

module.exports = router;
