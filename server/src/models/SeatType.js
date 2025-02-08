const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const SeatType = sequelize.define("seat_type", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: "seat_type",
    timestamps: false,
});

module.exports = SeatType;
