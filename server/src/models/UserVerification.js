const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const UserVerification = sequelize.define('UserVerification', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    uniqueString: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'user_verification',
    timestamps: false,
});

module.exports = UserVerification;