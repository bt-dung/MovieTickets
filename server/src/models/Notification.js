'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type_id: {
    type: DataTypes.INTEGER,
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'notifications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Notification.associate = (models) => {
  Notification.belongsTo(models.User, {
    as: 'sender',
    foreignKey: 'user_id',
  });

  Notification.belongsTo(models.User, {
    as: 'receiver',
    foreignKey: 'admin_id',
  });
  Notification.belongsTo(models.NotificationType, {
    foreignKey: 'type_id',
    as: 'type',
  });

};
Notification.createNotification = async (data) => {
  try {
    return await Notification.create(data);
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};
Notification.getNotificationsByUserId = async (userId) => {
  try {
    return await Notification.findAll({
      where: { user_id: userId },
      include: [
        {
          model: sequelize.models.User,
          as: 'sender',
        },
      ]
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};
Notification.getDetails = async (notificationId) => {
  try {
    return await Notification.findByPk(notificationId, {
      include: [
        { model: sequelize.models.User, as: 'sender' },],
    });
  } catch (error) {
    console.error('Error fetching notification details:', error);
    throw error;
  }
};
Notification.markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findByPk(notificationId);
    if (notification) {
      notification.is_read = true;
      await notification.save();
      return notification;
    }
    throw new Error('Notification not found');
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

module.exports = Notification;