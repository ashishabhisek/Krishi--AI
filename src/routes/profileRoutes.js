const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authMiddleware } = require('../middleware/auth');

router.get('/profile', authMiddleware, profileController.getUserProfile);
router.put('/profile', authMiddleware, profileController.updateUserProfile);

router.get('/preferences', authMiddleware, profileController.getNotificationPreferences);
router.put('/preferences', authMiddleware, profileController.updateNotificationPreferences);

router.get('/notifications', authMiddleware, profileController.getMyNotifications);
router.put('/notifications/:notificationId/read', authMiddleware, profileController.markNotificationAsRead);

router.post('/saved-tips', authMiddleware, profileController.saveTip);
router.get('/saved-tips', authMiddleware, profileController.getSavedTips);
router.delete('/saved-tips/:articleId', authMiddleware, profileController.removeSavedTip);

module.exports = router;
