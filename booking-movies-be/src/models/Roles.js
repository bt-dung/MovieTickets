const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Roles = sequelize.define('roles', {
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
    tableName: 'roles',
    timestamps: false,
});

module.exports = Roles;
