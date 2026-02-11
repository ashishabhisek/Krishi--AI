const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const { validateQuery, handleValidationErrors } = require('../middleware/validation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// User routes
router.post('/', authMiddleware, validateQuery.submit, handleValidationErrors, queryController.submitQuery);
router.get('/my-queries', authMiddleware, queryController.getMyQueries);
router.get('/:queryId', authMiddleware, queryController.getQueryById);
router.put('/:queryId/rate', authMiddleware, validateQuery.rate, handleValidationErrors, queryController.rateQuery);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, queryController.getAllQueries);
router.put('/:queryId/respond', authMiddleware, adminMiddleware, queryController.respondToQuery);

module.exports = router;
