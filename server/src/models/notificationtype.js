'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NotificationType.hasMany(models.Notification, {
        foreignKey: 'type_id',
        as: 'notifications'
      });
    }
    static async getAllType() {
      try {
        const types = await NotificationType.findAll();
        return types;
      } catch (error) {
        console.error('Error fetching notification types:', error);
        throw error;
      }
    }
    static async getTypeById(typeId) {
      try {
        const type = await NotificationType.findByPk(typeId);
        if (!type) {
          throw new Error('Notification type not found');
        }
        return type;
      } catch (error) {
        console.error('Error fetching notification type:', error);
        throw error;
      }
    }
  }
  NotificationType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NotificationType',
  });
  return NotificationType;
};