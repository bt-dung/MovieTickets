const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Area = sequelize.define('areas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'areas',
    timestamps: false,
});

module.exports = Area;