const NotificationController = require('../controllers/Notification');
const express = require('express');
const router = express.Router();

router.post('/notifications', NotificationController.createNotification)
    .get('/notifications/user/:userId', NotificationController.getNotificationsByUserId)
    .get('/notifications/:notificationId', NotificationController.getNotificationDetails)
    .put('/notifications/:notificationId/mark-as-read', NotificationController.markNotificationAsRead);

module.exports = router;
