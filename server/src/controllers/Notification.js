const Notification = require('../models/Notification');
const User = require('../models/User');

const NotificationController = {
    async createNotification(req, res) {
        try {
            const { user_id, admin_id, content, type } = req.body;

            if (!user_id || !admin_id || !content || !type) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const notification = await Notification.createNotification({
                user_id,
                admin_id,
                content,
                type
            });

            return res.json({
                status: 'success',
                message: 'Notification created successfully',
                data: notification
            });
        } catch (error) {
            console.error("Error creating notification:", error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getNotificationsByUserId(req, res) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const notifications = await Notification.getNotificationsByUserId(userId);

            return res.json({
                status: 'success',
                data: notifications
            });
        } catch (error) {
            console.error("Error fetching notifications:", error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getNotificationDetails(req, res) {
        try {
            const { notificationId } = req.params;

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            const notification = await Notification.getDetails(notificationId);

            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            return res.json({
                status: 'success',
                data: notification
            });
        } catch (error) {
            console.error("Error fetching notification details:", error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    async markNotificationAsRead(req, res) {
        try {
            const { notificationId } = req.params;

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            const notification = await Notification.markAsRead(notificationId);

            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            return res.json({
                status: 'success',
                message: 'Notification marked as read',
                data: notification
            });
        } catch (error) {
            console.error("Error marking notification as read:", error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = NotificationController;