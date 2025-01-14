const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');

const Seat = sequelize.define('seats', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    seat_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    screen_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'screens',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    seat_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'seat_type',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'seats',
    timestamps: false,
});

Seat.insertSeat = async (seatData) => {
    try {
        const existingSeat = await Seat.findOne({ where: { seat_name: seatData.seat_name, screen_id: seatData.screen_id } });

        if (!existingSeat) {
            const newSeat = await Seat.create(seatData);
            return newSeat;
        } else {
            console.log(`Seat already exists: ${seatData.seat_name}`);
            throw new Error(`Seat already exists with name: ${seatData.seat_name}`);
        }
    } catch (error) {
        console.error("Error inserting seat:", error.message);
        throw error;
    }
};

Seat.getSeatbyScreenID = async (screen_id) => {
    try {
        const seats = await Seat.findAll({
            where: { screen_id: screen_id }
        });
        return seats;
    } catch (error) {
        console.error("Error fetching seats by ScreenID:", error);
        throw error;
    }
};

module.exports = Seat;
