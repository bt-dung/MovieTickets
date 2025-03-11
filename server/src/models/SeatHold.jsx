const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const SeatHold = sequelize.define("SeatHold", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    showtime_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    selected_seats: {
        type: DataTypes.JSON,
        allowNull: false
    },
    end_time: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: "seat_hold",
    timestamps: true,
});

module.exports = SeatHold;