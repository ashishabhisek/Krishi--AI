const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authMiddleware, adminMiddleware, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, alertController.getAlerts);
router.get('/:alertId', optionalAuth, alertController.getAlertById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, alertController.createAlert);
router.put('/:alertId', authMiddleware, adminMiddleware, alertController.updateAlert);
router.delete('/:alertId', authMiddleware, adminMiddleware, alertController.deleteAlert);

module.exports = router;
